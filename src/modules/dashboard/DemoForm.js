import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import "../../assets/styles/custom.css";
import { AddService } from "../../services";
import Utils from "../../utility";
import { useEffect } from "react";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },

  Alert: {
    backgroundColor: "#ffffff !important",
  },
  btn: {},
  value: {
    width: "400px !important",
  },
  cross: {
    marginTop: "25px",
    marginLeft: "40px",
    fontWeight: "500",
  },
  dialog: {
    marginLeft: "26%",
    marginTop: "38px",
    width: "55% !important",
    height: "60% !important",
    borderRadius: "80px !important",
  },
  buttons: {
    padding: "1px 35px 10px 0px",
    marginTop: "20px",
  },
  // input: {
  //   width: "400px",
  //   height: "5vh",
  //   border: "solid 1px #9FA9BA",
  //   backgroundColor: "#ffffff",
  //   borderRadius: "8px",
  //   outline: "none",
  //   paddingLeft: "10px",
  //   marginLeft: "4px",
  // },

  addbtn: {
    width: "110px",
    height: "34px",
    // margin: "33px 0 0 21px",
    // padding: "8px 30px 7px 32px",
    margin: "14px -8px 15px 2px",
    padding: "3px 19px 3px 20px",
    borderRadius: "4px",
    backgroundColor: "#3763dd",
    color: "white",
    border: "none",
    fontFamily: "Inter,sans-serif",
    "&:hover": {
      backgroundColor: "#eeeeee !important",
      color: "#2149B9",
    },
  },
  cnlbtn: {
    width: "94px",
    height: "34px",
    // margin: "33px 21px 0 87px",
    // padding: "8px 19px 7px 21px",
    borderRadius: "4px",
    backgroundColor: "#9fa9ba",
    color: "white",
    border: "none",
    fontFamily: "Inter,sans-serif",

    margin: "14px 8px 15px 2px",
    padding: "3px 19px 3px 20px",
  },
  subCategory: {
    marginTop: "-8px",
    marginBottom: "-2px",
    // fontWeight: "50px",
    fontfamily: "Inter-Medium",
    fontSize: "15px",
    fontWeight: "500",
    border: "none !important",
  },
  mainheading: {
    letterSpacing: "0px",
    color: " #2A2A2A",
    opacity: "1",
    fontSize: "18px",
    fontFamily: "Inter,sans-sarif",
    fontWeight: "600",
  },
  subheading: {
    letterSpacing: "0px",
    color: "#2A2A2A",
    opacity: "1",
    marginLeft: "3px",
    fontFamily: "Inter,sans-sarif",
    fontWeight: "600",
    fontSize: "14px",
  },

  heading: {
    marginLeft: "3px",
    letterSpacing: "0px",
    color: "#2A2A2A",
    opacity: "1",
    fontFamily: "Inter",
    fontweight: "600",
  },
}));

export default function CustomizedSnackbars(props) {
  console.log("demoform state", props.state);
  console.log("demoform addpopup", props.state.addDialog);
  const { state, setStateValues, setConfirmDialogStateValues } = props;
  // const { state1, setConfirmDialogStateValues } = props;

  const [addAddress, setAddAddress] = React.useState("");

  const classes = useStyles();
  const [allowVoting, setallowVoting] = React.useState(false);
  const [proposal, setProposal] = React.useState(false);
  const [addressInput, setAddressInput] = React.useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  // const [error, setError] = React.useState(false);
  const [emailError, setEmailError] = useState("");
  const [addPopup, setAddPopup] = useState(false);

  String.prototype.replaceAt = function (index, replacement) {
    return (
      this.substr(0, index) +
      replacement +
      this.substr(index + replacement.length)
    );
  };

  const addWhitelistAddress = async () => {
    // setAddPopup(true);
    console.log(addAddress.replace("xdc", "0x"), "replaceeeeeeeeeeeeeeeeeeeee");
    // console.log(addAddress.replaceAt(0,"0x"),"replace value");
    const reqObj = {
      address: addAddress.replace("xdc", "0x"),
      permission: {
        allowVoting,
        allowProposalCreation: proposal,
      },
    };
    setMessage(reqObj.address);
    const totalAccounts = await props
      .addWhiteListAddress(reqObj)
      .catch((err) => {
        setEmailError("Unable to add address");
        return;
      });

    if (!totalAccounts) {
      setEmailError("Unable to add address");
      return;
    }

    props.getListOffAddress();
    handleCloseDailog();
  };

  const validateAddress = () => {
    if (
      (addAddress && addAddress.length > 40) ||
      addAddress.slice(0, 2) == "xdc"
    ) {
      if(addAddress && allowVoting || proposal)
      addWhitelistAddress();
      else{ setEmailError("Atleast one checkbox must be selected"); }
    } else if (!addAddress) {
      setEmailError("Enter a valid Address");
    } else {
      setEmailError("Address should start with xdc & min 40 characters");
    }
  };

  const handleClick = () => {
    setOpen(true);
  };
  const handleCancelClose = () => {
    setDialogOpen(false);
    setallowVoting(false);
    setProposal(false);
    setAddAddress("");
    setStateValues(false);
    setEmailError("");
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleToastClose = () => {
    setOpen(false);
  };

  const handleDialog = async () => {
    setDialogOpen(true);
    await setStateValues(false);
    // await props.state.setConfirmDialogStateValues(false);
    await setConfirmDialogStateValues(false);

    // setOpen(true)
  };
  const handleCloseDailog = async () => {
    // setDialogOpen(false);
    // setOpen(true);
    await setConfirmDialogStateValues(true);
    setallowVoting(false);
    setAddAddress("");
    setProposal(false);
    // setStateValues(false)

    // setAddPopup(false)

    // setDialogOpen(true);
  };
  const closeDialog = async () => {
    setDialogOpen(false);
    setOpen(true);
  };

  return (
    <div className={classes.root}>
      <div
        className="dashboard-upper-div"
        // style={{
        //   display: "flex",
        //   justifyContent: "space-between",
        //   marginTop: "40px",
        //   width: "60vw",
        //   marginLeft: "20vw",
        // }}
      >
        <div className="whitelisted-heading">
          <div>Whitelisted Addresses</div>
          <div className="address-des">
            Addresses added here can vote and create proposals for XDC
            Governance portal
          </div>
        </div>
        <button variant="outlined" onClick={handleDialog} className="add-btn1">
          Add
        </button>
      </div>
      {!state.addDialog ? (
        <>
          <Dialog className={classes.dialog} open={dialogOpen} divide>
            <DialogTitle className={classes.heading} id="form-dialog-title">
              <div className={classes.mainheading}>Add a New Address</div>{" "}
            </DialogTitle>
            <DialogContent style={{ marginTop: "-5px" }}>
              <DialogContentText className={classes.subCategory}>
                <div className={classes.subheading}>Address</div>
              </DialogContentText>
              <input
                className="addinput"
                type="text"
                required="true"
                placeholder="Write address"
                // value={addAddress}
                onChange={(e) => {
                  setAddAddress(e.target.value);
                  setEmailError("");
                }}
                value={addAddress}
              ></input>
              <div
                style={{
                  marginLeft: "5px",
                  color: "red",
                  fontSize: "14px",
                  fontFamily: "Inter",
                }}
              >
                {emailError}
              </div>
            </DialogContent>
            <div
              style={{
                display: "flex",
                marginTop: "10px",
                marginBottom: "5px",
              }}
            >
              {/* <input
            onChange={(e) => {
              setallowVoting(!allowVoting)
            }}
            type="checkbox"
            className="checked-btn"
            checked={allowVoting}

          /> */}
              <div
                className="custom-check1"
                onClick={() => {
                  setallowVoting(!allowVoting);
                  setEmailError("")
                }}
                className={
                  !allowVoting ? "custom-check1" : "custom-check1-active"
                }
              ></div>
              <span className="checkbox-heading">
                <div>Allow Voting</div>
                <div className="checkbox-des">
                By selecting this, you are permitting the address to cast a vote

                </div>
              </span>
            </div>
            <div style={{ display: "flex" }}>
              <div
                className="custom-check1"
                onClick={() => {
                  setProposal(!proposal);
                  setEmailError("")
                }}
                className={!proposal ? "custom-check1" : "custom-check1-active"}
              ></div>

              <span className="checkbox-heading">
                <div>Allow Proposal Creation</div>
                <div className="checkbox-des">
                By selecting this, you are permitting the address to create a proposal
                </div>
              </span>
            </div>

            <DialogActions className={classes.buttons}>
              <span>
                <button className={classes.cnlbtn} onClick={handleCancelClose}>
                  Cancel
                </button>
              </span>
              <span>
                <div>
                  <button
                    className={classes.addbtn}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      // setallowVoting(false);
                      // setAddAddress("");
                      // setProposal(false);
                      validateAddress();
                      // setAddPopup(true)
                    }}
                    // disabled={(!allowVoting && !proposal) || !addAddress}
                  >
                    Add
                  </button>
                </div>
              </span>
            </DialogActions>
          </Dialog>
        </>
      ) : !state.addConfirmDialog ? (
        <>
          <Dialog className={classes.dialog} open={dialogOpen} divide>
            <DialogTitle className={classes.heading} id="form-dialog-title">
              <div className={classes.mainheading}>
                Adding address<span className="cross-loader">X</span>
              </div>{" "}
            </DialogTitle>
            <DialogContent>
              {/* <img
                style={{
                  width: "200px",
                  height: "200px",
                  display: "flex",
                  justifyContent: "center",
                  marginLeft: "30px",
                  marginRight: "30px",
                }}
                // className="header-logo"
                src={require("../../assets/styles/images/loader-small.gif")}
              ></img> */}
              <div className="loader-spin"></div>
              <DialogContentText className={classes.subCategory}>
                <div
                  className="loader-heading"
                  // style={{
                  //   fontSize: "15px",
                  //   display: "flex",
                  //   justifyContent: "center",
                  //   color: "#2A2A2A",
                  //   opacity: "1",
                  //   fontFamily: "Inter",
                  //   fontweight: "600",
                  // }}
                >
                  Adding your address
                </div>
                <div className="loader-confirm-heading">
                  Confirm this transaction on XDCPay
                </div>
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <>
          <Dialog className={classes.dialog} open={dialogOpen} divide>
            <DialogTitle className={classes.heading} id="form-dialog-title">
              <div className={classes.mainheading}>
                Adding address
                <span onClick={closeDialog} className="cross-loader">
                  X
                </span>
              </div>{" "}
            </DialogTitle>
            <DialogContent>
              {/* <img
                style={{
                  width: "200px",
                  height: "200px",
                  display: "flex",
                  justifyContent: "center",
                  marginLeft: "30px",
                  marginRight: "30px",
                }}
                // className="header-logo"
                src={require("../../assets/styles/images/loader-small.gif")}
              ></img> */}
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  className="confirm-done"
                  src={require("../../assets/styles/images/confirm done.svg")}
                ></img>
              </div>
              <DialogContentText className={classes.subCategory}>
                <div
                  className="loader-heading"
                  // style={{
                  //   fontSize: "15px",
                  //   display: "flex",
                  //   justifyContent: "center",
                  //   color: "#2A2A2A",
                  //   opacity: "1",
                  //   fontFamily: "Inter",
                  //   fontweight: "600",
                  // }}
                >
                  Transaction Complete
                </div>
                <div className="loader-confirm-heading"></div>
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </>
      )}

      <Snackbar
        open={open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleClose}
      >
        <Alert severity="" className={classes.Alert}>
          <div style={{ display: "flex" }}>
            <span
              style={{
                marginRight: "10px",
                marginTop: "-5px",
                marginLeft: "-8px",
              }}
            >
              <img
                className="done-logo"
                style={{ height: "24px", width: "24px", marginTop: "10px" }}
                src={require("../../assets/styles/images/confirm done.svg")}
              ></img>
            </span>
            <span>
              <div className="toast-message">
                <span>You have successfully added address</span>
                {/* <span
                  onClick={handleToastClose}
                  style={{
                    float: "right",
                    cursor: "pointer",
                    marginTop: "-8px",
                  }}
                >
                  X
                </span> */}
              </div>
              {/* <div className="toast-address">{message}</div> */}
              {/* 0x9b20bd863e1cf226b98…6b10 */}
            </span>
          </div>
        </Alert>
      </Snackbar>
    </div>
  );
}
