import React, {useEffect, useState} from "react";
import "../../assets/styles/custom.css";
// import jazzicon from 'jazzicon';
import {Column, Row} from "simple-flexbox";
import {history} from "../../managers/history";
import {makeStyles} from "@material-ui/core/styles/";
import Web3 from "web3";
import Utils from "../../utility";
import {getListOfWhitelistedAddress} from "../../services/getListOfAddress";
import CustomizedSnackbars from "./DemoForm";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import Jazzicon from "react-jazzicon";
import {envConstant} from "../../constants";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    Alert: {
        backgroundColor: "#ffffff !important",
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

function Header(props) {
    // const {state,wallet,setwallet}=props;
    console.log(props, "props value")
    const classes = useStyles();
    const [wallet, setwallet] = useState("");
    const [iconT, setIcon] = useState("");
    const [open4, setOpen4] = React.useState(false);
    const [open5, setOpen5] = React.useState(false);
    const [open6, setOpen6] = React.useState(false);
    const [walletLogin, setWalletLogin] = React.useState(false);

    const closeAlert = () => {
        setOpen4(false)
        setOpen5(false)
        setOpen6(false)
    }

    useEffect(() => {
        // var body = document.querySelector('body')
        // for(var i = 0; i < 60; i++) {
        //   var el = jazzicon(100, Math.round(Math.random() * 10000000))
        //   console.log("dsjfkksdgfkjhjldsf ",el)
        //   body.appendChild(el)
        // }
        // window.web3 = new Web3(window.xdc ? window.xdc : window.ethereum);
        window.web3 = new Web3(window.xdc ? window.xdc : window.ethereum);

        if (window.xdc) {
            //the error line
            window.web3 = new Web3(window.xdc);

            try {
                // window.xdc;

                let web3;
                web3 = new Web3(window.web3.currentProvider);
                console.log("+++", web3);
                // window.xdc;

                const accounts = window.web3.eth.getAccounts().then((accounts) => {
                    let superadmin = process.env.REACT_APP_ADMIN_ADDRESS;//"xdc2ecc3f6943e5ba3b077f5121bddaccf2a761fdba";
                    // console.log(  superadmin.replace("xdc","0x").toLocaleLowerCase(),  accounts[0].toLowerCase(), "matched done")
                    // if(superadmin.replace("xdc","0x").toLocaleLowerCase()==  accounts[0].toLowerCase()){
                    //   console.log("matched")
                    // }
                    if (!accounts || !accounts.length) {
                        console.log("please login");
                        // Utils.apiFailureToast("error");
                        return;
                    }


                    if (superadmin.replace("xdc", "0x").toLocaleLowerCase() == accounts[0].toLowerCase()) {
                        setwallet(accounts[0]);


                        fetchData(accounts[0]);
                    } else {
                        // setOpen4(true)
                        // Utils.apiFailureToast("Unauthorized");
                    }
                    console.log(accounts[0], "accccccccccccccccccccccccccccccccccccccccccccc");


                });
            } catch (err) {
                alert("Something went wrong.");
            }
        } else if (window.xdc) {
            window.web3 = new Web3(window.web3.currentProvider);
            let web3;
            web3 = new Web3(window.web3.currentProvider);
            console.log("+++", web3);
            // window.xdc

            const accounts =  window.web3.eth.getAccounts().then((accounts) => {
                let superadmin = process.env.REACT_APP_ADMIN_ADDRESS//"xdc2ecc3f6943e5ba3b077f5121bddaccf2a761fdba";
                if (!accounts || !accounts.length) {
                    console.log("please login");
                    // Utils.apiFailureToast("error");
                    return;
                }
                if (superadmin.replace("xdc", "0x").toLocaleLowerCase() == accounts[0].toLowerCase()) {
                    setwallet(accounts[0]);


                    fetchData(accounts[0]);
                } else {
                    // setOpen4(true)
                    // Utils.apiFailureToast("Unauthorized");
                }
                console.log(accounts[0], "type");
                // setwallet(accounts[0]);
                // fetchData(accounts[0]);
            });
        } else {
            // Utils.apiFailureToast("Please install XDCPay extension");
        }
    }, []);

    // const { active, account, library, connector, activate, deactivate } =
    //   useWeb3React();

    async function connectToWallet() {
        if (window.xdc) {
            window.web3 = new Web3(window.xdc);

            try {
                // window.ethereum.enable();
                let web3;
                web3 = new Web3(window.web3.currentProvider);
                const conn = await window.web3.currentProvider._events.disconnect[0]();
                console.log("+++++", conn);
                // window.ethereum.enable();

                let accounts =window.web3.eth.getAccounts().then((accounts) => {
                    let superadmin = process.env.REACT_APP_ADMIN_ADDRESS;//"xdc2ecc3f6943e5ba3b077f5121bddaccf2a761fdba";
                    if (!accounts || !accounts.length) {
                      setOpen5(true)
                        // Utils.apiFailureToast("Wallet is not connected");
                        return;
                    }
                    if (superadmin.replace("xdc", "0x").toLocaleLowerCase() != accounts[0].toLowerCase()) {
                        setOpen4(true)
                    }
                    // else{
                    //   // setWalletLogin(true);
                    //   // props.state.walletLogin
                    //   setwallet(accounts[0]);
                    //   fetchData(accounts[0]);
                    // }
                });
            } catch (err) {
                alert("Something went wrong.");
            }
        } else {
          setOpen6(true)
            // Utils.apiFailureToast("Please install XDCPay extension");
        }
    }

    const [address, setAddress] = useState({data: ""});
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
                {console.log(wallet, "walletaddress")}
                {wallet ? (

                    <>
                        {wallet ? (
                            <>
                                <div className="address-image">{wallet.substr(0, 6)}</div>
                                {" "}
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
                        <div style={{marginTop: "3px"}}>
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
            <Snackbar
                open={open4}
                autoHideDuration={3000}
                anchorOrigin={{vertical: "top", horizontal: "center"}}
                // onClose={handleClose4}
            >
                <Alert severity="" className={classes.Alert}>
                    <div style={{display: "flex"}}>
            <span
                style={{
                    marginRight: "10px",
                    marginTop: "-5px",
                    marginLeft: "-8px",
                }}
            >
              <img
                  className="done-logo"
                  style={{height: "24px", width: "24px", marginTop: "10px"}}
                  src={require("../../assets/styles/images/Unauthorised icon.svg")}
              ></img>
            </span>
                        <span>
          
            <div className="unauthorized">Unauthorized</div>
              <div className="unauthorized-message">
             
                <span>You are not authorised to connect your wallet to this site</span>
               
              </div>
              
              
            </span>
                        <span
                            onClick={closeAlert}
                            style={{
                                float: "right",
                                cursor: "pointer",
                                marginTop: "-8px",
                                fontWeight: "600"
                            }}
                        >
                  X
                </span>
                    </div>
                </Alert>
            </Snackbar>



           {/* ************ wallet not connectet *************** */}
           <Snackbar
                open={open5}
                autoHideDuration={3000}
                anchorOrigin={{vertical: "top", horizontal: "center"}}
                // onClose={handleClose4}
            >
                <Alert severity="" className={classes.Alert}>
                    <div style={{display: "flex"}}>
            <span
                style={{
                    marginRight: "10px",
                    marginTop: "-7px",
                    marginLeft: "-8px",
                }}
            >
              <img
                  className="done-logo"
                  style={{height: "24px", width: "24px", marginTop: "10px"}}
                  src={require("../../assets/styles/images/Error.svg")}
              ></img>
            </span>
                        <span>
          
            {/* <div className="unauthorized">Unauthorized</div> */}
              <div className="unauthorized-message">
             
                <span>Please Login to XDCPay</span>
               
              </div>
              
              
            </span>
                        <span
                            onClick={closeAlert}
                            style={{
                                float: "right",
                                cursor: "pointer",
                               marginTop:"-5px",
                               marginLeft:"15px",
                                fontWeight: "600"
                            }}
                        >
                  X
                </span>
                    </div>
                </Alert>
            </Snackbar>

           {/* ////////////////////////////////// */}

            {/* ************ NOT iNstalled *************** */}
            <Snackbar
                open={open6}
                autoHideDuration={3000}
                anchorOrigin={{vertical: "top", horizontal: "center"}}
                // onClose={handleClose4}
            >
                <Alert severity="" className={classes.Alert}>
                    <div style={{display: "flex"}}>
            <span
                style={{
                    marginRight: "10px",
                    marginTop: "-7px",
                    marginLeft: "-8px",
                }}
            >
              <img
                  className="done-logo"
                  style={{height: "24px", width: "24px", marginTop: "10px"}}
                  src={require("../../assets/styles/images/Error.svg")}
              ></img>
            </span>
                        <span>
          
            {/* <div className="unauthorized">Unauthorized</div> */}
              <div className="unauthorized-message">
             
                <span>Please install XDCPay extension</span>
               
              </div>
              
              
            </span>
                        <span
                            onClick={closeAlert}
                            style={{
                                float: "right",
                                cursor: "pointer",
                               marginTop:"-5px",
                               marginLeft:"15px",
                                fontWeight: "600"
                            }}
                        >
                  X
                </span>
                    </div>
                </Alert>
            </Snackbar>

           {/* ////////////////////////////////// */}
          

        </div>
    );
}

export default Header;
