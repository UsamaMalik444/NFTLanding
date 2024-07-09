import React, { useEffect, useState } from "react";
import SimpleImageSlider from "react-simple-image-slider";
import Timer from "./Timer";
import img1 from "../assets/img/41.png";
import img2 from "../assets/img/42.png";
import img3 from "../assets/img/43.png";
import img4 from "../assets/img/54.png";
import X from "../assets/img/X.png";
import Instagram from "../assets/img/instagram.jpg";
import Discord from "../assets/img/Discord.jpg";
import BlackInsta from "../assets/img/blackinsta.jpg";
import BlackDiscord from "../assets/img/blackdiscord.jpg";

const Reserve = ({ web3Handler, account, showCard, nft, samNft }) => {
  const [count, setCount] = useState(null);
  const [time, setTime] = useState(null);

  const getWhitelistingTime = async () => {
    try {
      samNft?.checkWhitelistTimerStatus().then((res) => {
        let seconds = Number(res);
        const time = new Date();
        time.setSeconds(time.getSeconds() + seconds);
        setTime(time);
      });
    } catch (error) {
      console.error(error);
    }
  };
  const getWhitelistCount = async () => {
    if (samNft) {
      let count = await samNft.getWhitelistCount();
      setCount(Number(count).toString());
    }
  };

  useEffect(() => {
    getWhitelistingTime();
    getWhitelistCount();
  }, [samNft]);

  const images = [
    {
      url: img1,
    },
    {
      url: img2,
    },
    {
      url: img3,
    },
    {
      url: img4,
    },
  ];
  return (
    <div className="main-holder position-relative">
      <div className="image-holder-banner">
        <div className="main-body-div1">
          <div className="row  justify-content-center">
            <div className=" col-lg-10 col-xl-8">
              <section id="ReserveSection" className="reserve-section">
                <div className="">
                  <div className="container main-body-div">
                    <div className="reserve-paratext myCustomText main-body-div2">
                      <div style={{ borderRadius: "20px" }}>
                        <SimpleImageSlider
                          width={330}
                          height={360}
                          images={images}
                          showBullets={false}
                          showNavs={false}
                          autoPlay={true}
                          autoPlayDelay={3}
                        />
                      </div>
                      <div className="main-body-div3">
                        <div style={{ marginTop: "-5px" }}>
                          <p className="title-ptag">NFT Whitelist</p>
                        </div>
                        <div className="card-body-div">
                          <a
                            href="https://x.com/MadRexClubNFT"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src={X}
                              style={{ borderRadius: "30px" }}
                              width={30}
                              height={29}
                            />
                          </a>
                          <a
                            href="https://www.instagram.com/madrexclub/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src={BlackInsta}
                              style={{ borderRadius: "30px" }}
                              width={30}
                              height={29}
                            />
                          </a>
                          <a
                            href="https://discord.gg/rWmMj9SZ"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src={BlackDiscord}
                              style={{ borderRadius: "30px" }}
                              width={30}
                              height={29}
                            />
                          </a>
                        </div>
                        {account ? (
                          <a
                            href={`https://goerli.etherscan.io/`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="button nav-button btn-sm "
                          >
                            <button className="connect-wallet-btn myCustomText">
                              {account.slice(0, 5) +
                                "..." +
                                account.slice(38, 42)}
                            </button>
                          </a>
                        ) : (
                          <button
                            style={{ marginLeft: "40px" }}
                            onClick={web3Handler}
                            className="button nav-button btn-sm  connect-wallet-btn myCustomText"
                          >
                            Connect Wallet
                          </button>
                        )}
                        <div
                          className="d-flex flex-column justify-content-between px-4  "
                          style={{ paddingTop: "10px" }}
                        >
                          <p
                            className="text-white text-start"
                            style={{ fontSize: "13px" }}
                          >
                            Welcome to the Mad Rex Club, featuring 6,500 unique
                            NFTs on the Ethereum blockchain. Owning a Mad Rex
                            NFT unlocks rare collectibles, airdrops, VIP events,
                            and a vibrant community. Be part of a pioneering
                            digital movement. Secure your Mad Rex NFT today and
                            dive into cutting-edge digital art..
                          </p>
                          <p className="mb-0 myCustomText card-body-info">
                            <strong>Whitelisted Price : </strong> 0.029 ETH
                          </p>
                          <p className="mb-0 myCustomText card-body-info">
                            <strong>Live Sale Price : </strong> 0.045 ETH
                          </p>
                        </div>
                        <div className="">
                          {time ? (
                            <Timer
                              expiryTimestamp={time}
                              samNft={samNft}
                              account={account}
                              getWhitelistCount={getWhitelistCount}
                            />
                          ) : (
                            <p>Loading...</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center align-items-center gap-3 pt-4 myCustomText bottom-boxes">
                      <div className="text-white card-whitelisting-div">
                        <p className="mb-0" style={{ fontSize: "20px" }}>
                          {count ? count + " /" + " 888" : "0/" + " 888"}
                        </p>
                        <p
                          className="mb-0 pt-2 "
                          style={{
                            fontSize: "14px",
                            color: "white",
                          }}
                        >
                          <strong>WhiteListed</strong>
                        </p>
                      </div>
                      <div className="card-whitelisting-div">
                        <p
                          className="mb-0 text-white "
                          style={{ fontSize: "20px" }}
                        >
                          0.035 Eth
                        </p>
                        <p
                          className="mb-0 pt-2 "
                          style={{
                            fontSize: "15px",
                            color: "white",
                            textAlign: "left",
                          }}
                        >
                          <strong>Default Price</strong>
                        </p>
                      </div>
                      <div className="card-whitelisting-div">
                        <p
                          className="mb-0 text-white "
                          style={{ fontSize: "20px" }}
                        >
                          ERC - 721
                        </p>
                        <p
                          className="mb-0 pt-2 "
                          style={{
                            fontSize: "15px",
                            color: "white",
                            textAlign: "left",
                          }}
                        >
                          <strong>Token Type</strong>
                        </p>
                      </div>
                      <div className="card-whitelisting-div">
                        <p
                          className="mb-0 text-white "
                          style={{ fontSize: "20px" }}
                        >
                          Ethereum
                        </p>
                        <p
                          className="mb-0 pt-2 "
                          style={{
                            fontSize: "15px",
                            color: "white",
                            textAlign: "left",
                          }}
                        >
                          <strong>Blockchain</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reserve;
