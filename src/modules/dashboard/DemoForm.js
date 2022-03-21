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
import { AccountService, AddService } from "../../services";
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
    backgroundColor: "#3763DD",
    color: "white",
    border: "none",
    fontFamily: "Inter,sans-serif",
    // "&:hover": {
    //   backgroundColor: "#eeeeee !important",
    //   color: "#2149B9",
    // },
    "&:disabled": {
      backgroundColor: "#A6BAF0 !important",
      color: "white",
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
    marginBottom: "17px",
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
  const {
    state,
    setStateValues,
    setConfirmDialogStateValues,
    setAddDialogOpen,
    stateAddSetDialogOpen,
  } = props;
  // const { state1, setConfirmDialogStateValues } = props;

  const [addAddress, setAddAddress] = React.useState("");

  const classes = useStyles();
  const [allowVoting, setallowVoting] = React.useState(false);
  const [proposal, setProposal] = React.useState(false);
  const [addressInput, setAddressInput] = React.useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = React.useState(false);
  // const [dialogOpen, setDialogOpen] = React.useState(false);
  // const [error, setError] = React.useState(false);
  const [emailError, setEmailError] = useState("");
  const [addPopup, setAddPopup] = useState(false);
  const [getListOfAddress, setgetListOfAddress] = React.useState([]);
  const [errorInAddingAddress, setErrorInAddingAddress] = React.useState(false);
  const [disabledValue, setdisabledValue] = React.useState(true);

  String.prototype.replaceAt = function (index, replacement) {
    return (
      this.substr(0, index) +
      replacement +
      this.substr(index + replacement.length)
    );
  };

  const addWhitelistAddress = async () => {
    setErrorInAddingAddress(false);
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
        setEmailError(err ? err : "Unable to add address");
        setErrorInAddingAddress(err ? err : "Unable to add address")
        handleCloseDailog();
        return;
      });

    if (!totalAccounts) {
      setEmailError("Unable to add address");
      return;
    }
    props.getListOffAddress();
    handleCloseDailog();
  };

  // const getListOffWhitelistedAddress = async (data) => {
  //   console.log(props.getListOfAddress,"getttttttttttttttttttt")
  //   let [error, totalAccounts] = await Utils.parseResponse(
  //     AccountService.getListOfWhitelistedAddress(data)
  //   );
  //   console.log(totalAccounts,"checkwhitelisted")
  //   if (error || !totalAccounts) return;
  //   await setgetListOfAddress(totalAccounts.dataList);
  //   console.log(totalAccounts.dataList,"get checkwhitelisted")
  //   if ((getListOfAddress.address) === addAddress) {
  //         setEmailError("Duplicate address cannot be added");

  //       }
  //       else{
  //         addWhitelistAddress();
  //       }

  //   // await setPagecount(totalAccounts.count);
  // };

  const validateAddress = async() => {
    if (
      (addAddress && addAddress.length > 40) ||
      addAddress.slice(0, 2) == "xdc"
    ) {
      if(addAddress && allowVoting || proposal)
      {
        addWhitelistAddress();
      }
      else{
        setEmailError("Atleast one checkbox must be selected")
      }
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
    stateAddSetDialogOpen(false);
    setallowVoting(false);
    setProposal(false);
    setAddAddress("");
    setStateValues(false);
    setEmailError("");
    setdisabledValue(true);
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
    stateAddSetDialogOpen(true);
    await setStateValues(false);
    await setConfirmDialogStateValues(false);
    setallowVoting(false);
    setAddAddress("");
    setProposal(false);
    setEmailError("");
    setdisabledValue(true);
  };
  const handleCloseDailog = async () => {
    await setConfirmDialogStateValues(true);
    setallowVoting(false);
    setAddAddress("");
    setProposal(false);
  };
  const closeDialog = async () => {
    stateAddSetDialogOpen(false);
    setOpen(true);
  };

  const closeErrorDialog = async () => {
    stateAddSetDialogOpen(false);
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
        {/* {props.wallet?<> */}
        {props.wallet ? (
          <button
            variant="outlined"
            onClick={handleDialog}
            className="add-btn1"
          >
            Add
          </button>
        ) : (
          ""
        )}
        {/* </>
        :""} */}
      </div>
      {!state.addDialog ? (
        <>
          <Dialog
            className={classes.dialog}
            open={state.setAddDialogOpen}
            divide
            id="dialog"
          >
            <DialogTitle className={classes.heading} id="form-dialog-title">
              <div className={classes.mainheading}>Add a New Address </div>{" "}
            </DialogTitle>
            <DialogContent style={{ marginTop: "-5px" }}>
              <DialogContentText className={classes.subCategory}>
                <div className={classes.subheading}>Address</div>
              </DialogContentText>

              <input
                className="addinput"
                id="writeAddress"
                type="text"
                required="true"
                placeholder="Enter address"
                // value={addAddress}
                onChange={(e) => {
                  setAddAddress(e.target.value);
                  setEmailError("");
                  if (e.target.value.length >= 1) {
                    setdisabledValue(false);
                  } else {
                    setdisabledValue(true);
                  }
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
              <div
                className="custom-check1"
                onClick={() => {
                  setallowVoting(!allowVoting);
                  setEmailError("");
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
                  setEmailError("");
                }}
                className={!proposal ? "custom-check1" : "custom-check1-active"}
              ></div>

              <span className="checkbox-heading">
                <div>Allow Proposal Creation</div>
                <div className="checkbox-des">
                  By selecting this, you are permitting the address to create a
                  proposal
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
                    id="button"
                    color="primary"
                    disabled={disabledValue}
                    onClick={() => {
                      validateAddress();
                    }}
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
          <Dialog
            className={classes.dialog}
            open={state.setAddDialogOpen}
            divide
          >
            <DialogTitle className={classes.heading} id="form-dialog-title">
              <div className={classes.mainheading}>
                Adding address<span className="cross-loader"></span>
              </div>{" "}
            </DialogTitle>
            <DialogContent style={{marginTop:"-30px"}}>
              <div className="loader-spin"></div>
              <DialogContentText className={classes.subCategory}>
                <div
                  className="loader-heading"
                >
                  Adding your address
                </div>
                <div className="loader-confirm-heading">
                Confirm this transaction on XDCPay. Address will not be added if you close or refresh the page or close the XDCPay window.
                  {/* Confirm this transaction on XDCPay */}
                </div>
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </>
      ) : (
          errorInAddingAddress ? (
                  <>
                    <Dialog className={classes.dialog} open={state.setAddDialogOpen} divide>
                      <DialogTitle className={classes.heading} id="form-dialog-title">
                        <div className={classes.mainheading}>
                          Adding address
                          <span onClick={closeErrorDialog} className="cross-loader">
                  X
                </span>
                        </div>{" "}
                      </DialogTitle>
                      <DialogContent>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                          <img
                              className="confirm-done"
                              src={require("../../assets/styles/images/Error.svg")}
                          ></img>
                        </div>
                        <DialogContentText className={classes.subCategory}>
                          <div
                              className="loader-heading"
                          >
                            {errorInAddingAddress ? errorInAddingAddress : " Error in adding Address"}
                          </div>
                          <div className="loader-confirm-heading"></div>
                        </DialogContentText>
                      </DialogContent>
                    </Dialog>
                  </>
              ):
        <>
          <Dialog
            className={classes.dialog}
            open={state.setAddDialogOpen}
            divide
          >
            <DialogTitle className={classes.heading} id="form-dialog-title">
              <div className={classes.mainheading}>
                Adding address
                <span onClick={closeDialog} className="cross-loader">
                  X
                </span>
              </div>{" "}
            </DialogTitle>
            <DialogContent>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  className="confirm-done"
                  src={require("../../assets/styles/images/confirm done.svg")}
                ></img>
              </div>
              <DialogContentText className={classes.subCategory}>
                <div
                  className="loader-heading"
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
              </div>
            </span>
          </div>
        </Alert>
      </Snackbar>
    </div>
  );
}
