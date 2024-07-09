import { Navbar } from "react-bootstrap";
import React from "react";

const Navigation = ({ web3Handler, account, showCard }) => {
  return (
    <Navbar className="navbar-div">
      <p className="MaxRexLabel myCustomText my-1 nav-title ">Mad Rex Club</p>

      <button className="myCustomText wallet-connect-btn" onClick={web3Handler}>
        {account
          ? ` ${account.slice(0, 10) + "....." + account.slice(35, 42)}`
          : " Connect Wallet"}
      </button>
    </Navbar>
  );
};

export default Navigation;
