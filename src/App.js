import "./App.css";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import SAMNFTabi from "./frontend/contractsData/SAMNFT.json";
import SAMNFTAddress from "./frontend/contractsData/SAMNFT-address.json";
import NFTabi from "./frontend/contractsData/NFT.json";
import NFTAddress from "./frontend/contractsData/NFT-address.json";
import Navigation from "./frontend/components/Navbar.js";
import { BrowserRouter } from "react-router-dom";
import Reserve from "./frontend/components/Reserve";
import backgroundimg from "./frontend/assets/img/bg.jpg";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

function App() {
  const [loading, setLoading] = useState(true); // loading is true when this function starts
  const [account, setAccount] = useState(null);
  const [nft, setNft] = useState(null);
  const [samNft, setSamNft] = useState(null);
  const [showCard, setShowCard] = useState(false);
  const [scroll, setscroll] = useState("");

  const web3Handler = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork();

      if (network.chainId !== 11155111) {
        // Add Sepolia Network
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0xaa36a7", // Hexadecimal value of 11155111
              chainName: "Sepolia Test Network",
              nativeCurrency: {
                name: "SepoliaETH",
                symbol: "ETH",
                decimals: 18,
              },
              rpcUrls: ["https://rpc.sepolia.org"],
              blockExplorerUrls: ["https://sepolia.etherscan.io"],
            },
          ],
        });
      }
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setAccount(accounts[0]);
      const signer = provider.getSigner(); // get signer of the connected account

      // loadContracts(signer);
      setShowCard(true);

      const nft = new ethers.Contract(NFTAddress.address, NFTabi.abi, signer);
      const samNft = new ethers.Contract(
        SAMNFTAddress.address,
        SAMNFTabi.abi,
        signer
      );
      console.log(samNft.tokenCount());
      setNft(nft);
      setSamNft(samNft);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error("Unable to connect Metmask", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };

  const stylet = {
    backgroundImage: `url(${backgroundimg})`,
  };
  useEffect(() => {
    web3Handler();
  }, [account]);
  return (
    <BrowserRouter>
      <div className="App ">
        <Navigation
          web3Handler={web3Handler}
          account={account}
          showCard={showCard}
        />
        <Reserve
          web3Handler={web3Handler}
          account={account}
          showCard={showCard}
          nft={nft}
          samNft={samNft}
        />
      </div>
      <ToastContainer />
    </BrowserRouter>
  );
}
export default App;
