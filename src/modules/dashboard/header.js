import React, { useEffect, useState } from "react";
import "../../assets/styles/custom.css";
// import jazzicon from 'jazzicon';
import { Column, Row } from "simple-flexbox";
import { history } from "../../managers/history";
import { makeStyles } from "@material-ui/core/styles/";
import Web3 from "web3";
import Utils from "../../utility";
import { getListOfWhitelistedAddress } from "../../services/getListOfAddress";
import { injected } from "../../services/web3Connector";
import { useWeb3React } from "@web3-react/core";
import blockies from "ethereum-blockies";

import Jazzicon from "react-jazzicon";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  buttondiv: {
    display: "flex",
    justifyContent: "center",
    marginTop: "6px",
    marginRight: "12px",
  },
  btnCss: {
    background: "#ffffff 0% 0% no-repeat padding-box",
    color: "#2149b9",
    marginTop: "10px",
  },
  circle: {
    borderRadius: "50%",
    width: "10px",
    height: "10px",
    background: "##ffffff 0% 0% no-repeat padding-box",
    marginRight: "43px",
    marginLeft: "10px",
  },
  jazzicon: {
    marginTop: "5px !important",
  },
}));

function Header() {
  const classes = useStyles();
  const [wallet, setwallet] = useState("");
  const [iconT, setIcon] = useState("");
  useEffect(() => {
    // var body = document.querySelector('body')
    // for(var i = 0; i < 60; i++) {
    //   var el = jazzicon(100, Math.round(Math.random() * 10000000))
    //   console.log("dsjfkksdgfkjhjldsf ",el)
    //   body.appendChild(el)
    // }

    if (window.ethereum) {
      //the error line
      window.web3 = new Web3(window.ethereum);

      try {
        window.ethereum.enable();

        let web3;
        web3 = new Web3(window.web3.currentProvider);
        console.log("+++", web3);
        window.ethereum.enable();
        const accounts = web3.eth.getAccounts().then((accounts) => {
          if (!accounts || !accounts.length) {
            console.log("please login");
            // Utils.apiFailureToast("Wallet is not connected");
            return;
          }
          console.log(accounts[0]);
          setwallet(accounts[0]);
          fetchData(accounts[0]);
        });
      } catch (err) {
        alert("Something went wrong.");
      }
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      let web3;
      web3 = new Web3(window.web3.currentProvider);
      console.log("+++", web3);
      window.ethereum.enable();

      const accounts = web3.eth.getAccounts().then((accounts) => {
        if (!accounts || !accounts.length) {
          console.log("please login");
          // Utils.apiFailureToast("Wallet is not connected");
          return;
        }
        console.log(accounts[0]);
        setwallet(accounts[0]);
        fetchData(accounts[0]);
      });
    } else {
      Utils.apiFailureToast("Please install XDCPay extension");
    }
  }, []);

  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  async function connectToWallet() {
    if (window.ethereum) {
      //the error line
      window.web3 = new Web3(window.ethereum);

      try {
        window.ethereum.enable();

        let web3;
        web3 = new Web3(window.web3.currentProvider);
        const conn = await window.web3.currentProvider._events.disconnect[0]();
        console.log("+++++", conn);
        // window.ethereum.enable();

        let accounts = web3.eth.getAccounts().then((accounts) => {
          if (!accounts || !accounts.length) {
            Utils.apiFailureToast("Wallet is not connected");
            return;
          }
          console.log("accounts[0] ", accounts[0]);
        });
      } catch (err) {
        alert("Something went wrong.");
      }
    } else {
      Utils.apiFailureToast("Please install XDCPay extension");
    }
  }

  const [address, setAddress] = useState({ data: "" });
  const fetchData = async (param) => {
    const addresses = await getListOfWhitelistedAddress();
    let isAllowedToCreateProposal = false;
    addresses.dataList.map((address) => {
      if (address.address.toLowerCase() === param.toLowerCase()) {
        if (address.permission.allowProposalCreation === true)
          isAllowedToCreateProposal = true;
      }
    });
    if (isAllowedToCreateProposal && document.getElementById("div_create_prop"))
      document.getElementById("div_create_prop").className = "create-wallet";
  };

  const reDirect = () => {
    history.push("/");
  };
  return (
    <div>
      <button className="connect-wallet" onClick={connectToWallet}>
        {wallet ? (
          <>
            {wallet ? (
              <>
                <div className="address-image">{wallet.substr(0, 6)}</div>{" "}
              </>
            ) : (
              " "
            )}
            <div className="dot">...</div>
            {wallet ? (
              <div className="address-image">
                {wallet.substr(wallet.length - 4, 5)}
              </div>
            ) : (
              ""
            )}{" "}
            &nbsp;&nbsp;
            <div style={{ marginTop: "3px" }}>
              <Jazzicon
                diameter={20}
                seed={Math.round(Math.random() * 10000000)}
              />
            </div>
          </>
        ) : (
          <>
            <p className="connect">Connect Wallet</p>
          </>
        )}
      </button>
    </div>
  );
}

export default Header;
