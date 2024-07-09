import React, { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { ThreeCircles } from "react-loader-spinner";

function Timer({ expiryTimestamp, samNft, account, getWhitelistCount }) {
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      return console.warn("onExpire called");
    },
  });

  const mintNFT = async () => {
    try {
      setLoading(true);

      const whitelisted = await samNft.check_address_exist_in_white_list(
        account
      );
      if (!whitelisted) {
        // whitelist miniting
        const mint = await samNft.mint({
          value: ethers.utils.parseEther("0.045"),
        }); /*  derive from contract */ // after testting change to 0.22
      } else {
        const mint = await samNft.mint({
          value: ethers.utils.parseEther("0.0001"),
        }); /*  derive from contract */
        // normal minting
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);

      toast.error(error?.data.message, {
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

  const mintNFT2 = async () => {
    try {
      setLoading2(true);

      const whitelisted = await samNft.check_address_exist_in_white_list(
        account
      );
      if (!whitelisted) {
        const mint = await samNft.mint2({
          value: ethers.utils.parseEther("0.045"),
        }); // needs to be changed // derive from contract
        // whitelist miniting
      } else {
        const mint = await samNft.mint2({
          value: ethers.utils.parseEther("0.0001"),
        }); // needs to be  changed // derive from contracts
        // normal minting
      }
      setLoading2(false);
    } catch (error) {
      console.error(error);
      setLoading2(false);

      toast.error(error?.data.message, {
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
  const whiteListUserNFT = async () => {
    try {
      setLoading(true);
      const whitelisted = await samNft.whitelistUser(account);
      const receipt = await whitelisted.wait();
      getWhitelistCount();
      console.log(whitelisted);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      toast.error(error?.data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      console.error(error);
    }
  };

  return (
    <>
      {seconds === 0 && minutes === 0 ? (
        <div className="mint-div">
          <div className="mint-div1">
            <div className="mint-1">
              <button
                style={{ width: "173px" }}
                className="timer-button"
                // disabled={seconds === 0 && minutes === 0 ? true : false}
                onClick={mintNFT}
              >
                {loading ? (
                  <ThreeCircles
                    visible={true}
                    height="10%"
                    width="10%"
                    color="#ff9603"
                    ariaLabel="three-circles-loading"
                    wrapperStyle={{}}
                    wrapperClass="justify-content-center align-items-center text-center"
                  />
                ) : (
                  "Mint 1st Collection"
                )}
              </button>
            </div>
            <div className="mint-2">
              <button
                style={{ width: "183px" }}
                className="timer-button"
                disabled={true}
                // disabled={seconds === 0 && minutes === 0 ? true : false}
                onClick={mintNFT2}
              >
                {loading2 ? (
                  <ThreeCircles
                    visible={true}
                    height="10%"
                    width="10%"
                    color="#ff9603"
                    ariaLabel="three-circles-loading"
                    wrapperStyle={{}}
                    wrapperClass="justify-content-center align-items-center text-center"
                  />
                ) : (
                  "Mint 2nd Collection"
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="timer-div">
          <div className="timer-div2">
            <div className="timer-text">
              <p>
                {hours + "h:"}
                {minutes < 10 ? "0" : ""}
                {minutes + "m"}:{seconds < 10 ? "0" : ""}
                {seconds + "s"}
              </p>
            </div>
            <div className="timer-div3">
              <button
                className="timer-button"
                style={{ width: "200px" }}
                disabled={seconds === 0 && minutes === 0 ? true : false}
                onClick={whiteListUserNFT}
              >
                {loading ? (
                  <ThreeCircles
                    visible={true}
                    height="10%"
                    width="10%"
                    color="#ff9603"
                    ariaLabel="three-circles-loading"
                    wrapperStyle={{}}
                    wrapperClass="justify-content-center align-items-center text-center"
                  />
                ) : (
                  "WhiteList Now"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Timer;
