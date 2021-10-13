import React, { useState } from 'react';
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import "../../assets/styles/custom.css";
import { AddService } from '../../services';
import Utils from '../../utility';
import { useEffect } from "react";




function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  },

  Alert: {
    backgroundColor: "#00144D"
  },
  btn: {

  },
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
    borderRadius: "80px !important"
  },
  buttons: {
    padding: "1px 35px 10px 0px",
    marginTop: "20px",
  },
  input: {
    width: "400px",
    height: "5vh",
    border: "solid 1px #9FA9BA",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    outline: "none",
    paddingLeft: "10px",
    marginLeft: "4px",
  },

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
    letterSpacing: "0.69px",
    color: " #2A2A2A",
    opacity: "1",
    fontSize: "18px",
    fontFamily: "Inter,sans-sarif",
    fontWeight: "600",
  },
  subheading: {
    letterSpacing: "0.54px",
    color: "#2A2A2A",
    opacity: "1",
    marginLeft: "3px",
    fontFamily: "Inter,sans-sarif",
    fontWeight: "600",
    fontSize: "14px",

  },

  heading: {
    marginLeft: "3px",
    letterSpacing: "0.69px",
    color: "#2A2A2A",
    opacity: "1",
    fontFamily: "Inter",
    fontweight: "600"
  }
}));

export default function CustomizedSnackbars(props) {

  console.log("0000000000000000000", props)


  const [addAddress, setAddAddress] = React.useState("")


  const redirect = () => {
    console.log(addAddress, "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

  }


  const checking = () => {
    let istrue = "false"
  }



  const classes = useStyles();
  const [allowVoting, setallowVoting] = React.useState(false);
  const [proposal, setProposal] = React.useState(false);
  const [addressInput, setAddressInput] = React.useState("");
  const [message, setMessage] = useState("")
  const [open, setOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  // const [error, setError] = React.useState(false);
  const [emailError, setEmailError] = useState('')

  const addWhitelistAddress = async () => {

    const reqObj = {

      "address": addAddress,
      "allowVoting": allowVoting,
      "allowProposalCreation": proposal
    }
    setMessage(reqObj.address)

    let [error, totalAccounts] = await Utils.parseResponse(AddService.addWhitelistedAddress(reqObj))

    if (error || !totalAccounts)
    {
      // alert(error.message)
      setEmailError(error.message)
    
      return
    }

    props.getListOffAddress();
    handleCloseDailog();
    // setAddAddress(totalAccounts);
  }

  const validateAddress=()=>{
    // console.log(addAddress.slice(0,3),"slice")
    if(addAddress && addAddress.length>40 || addAddress.slice(0,2)=="xdc")
    {
      addWhitelistAddress()
    }
    else{
      setEmailError('Address should start with xdc & min 40 characters')
    }
  }



  const handleClick = () => {
    setOpen(true);
  };
  const handleCancelClose = () => {
    setDialogOpen(false);
    setallowVoting(false);
    setProposal(false);
    setAddAddress("");
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleDialog = () => {
    setDialogOpen(true);
    // setOpen(true)
  };
  const handleCloseDailog = () => {

    setDialogOpen(false);
    setOpen(true);
    // setDialogOpen(true);
  };




  return (
    <div className={classes.root}>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "40px", width: "60vw", marginLeft: "20vw" }}>
        <div className="whitelisted-heading">Whitelisted Addresses</div>
        <button variant="outlined" onClick={handleDialog} className="add-btn1" >
          Add
        </button>
      </div>
      <Dialog className={classes.dialog} open={dialogOpen} divide>
        <DialogTitle

          className={classes.heading} id="form-dialog-title"><div className={classes.mainheading}>Add a New Address</div>  </DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.subCategory}>
            <div className={classes.subheading}>Address</div>
          </DialogContentText>
          <input className={classes.input} type="text" required="true"
            // value={addAddress}
            onChange={(e) =>{
              setAddAddress(e.target.value);
              setEmailError("");
              setEmailError("");
            }
          }
              value={addAddress}
          ></input>
            <div style={{ marginLeft: "5px", color: "red"}}>{emailError}</div>
        </DialogContent>
        <div style={{ display: "flex", marginTop: "10px" }}>

          {/* <input
            onChange={(e) => {
              setallowVoting(!allowVoting)
            }}
            type="checkbox"
            className="checked-btn"
            checked={allowVoting}

          /> */}
          <div className="custom-check1"
            onClick={() => {
              setallowVoting(!allowVoting);
            }}

            className={!allowVoting ? "custom-check1" : "custom-check1-active"}
          ></div>
          <span className="checkbox-heading">
            Allow Voting
          </span>
        </div>
        <div style={{ display: "flex" }}>
          <div className="custom-check1"
            onClick={() => {
              setProposal(!proposal);
            }}

            className={!proposal ? "custom-check1" : "custom-check1-active"}
          ></div>

          <span className="checkbox-heading">
            Allow Proposal Creation
          </span>
        </div>

        <DialogActions className={classes.buttons}>
          <span><button className={classes.cnlbtn}
            onClick={handleCancelClose}
          >Cancel</button></span>
          <span>
            <div>
              <button className={classes.addbtn}
                variant="contained"
                color="primary"
                onClick={() => {
                 
                  setallowVoting(false);
                  setAddAddress("");
                  setProposal(false);
                  validateAddress()

                }}
                disabled={(!allowVoting && !proposal) || !addAddress}

              >
                Add
              </button>
            </div>
          </span>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleClose}
      >
        <Alert severity="" className={classes.Alert}>
          <div style={{ display: "flex" }}>
            <span style={{ marginRight: "10px", marginTop: "-5px", marginLeft: "-8px" }}><img className="done-logo" style={{ height: "30px", width: "30px", marginTop: "10px" }} src={require("../../assets/styles/images/DONE.svg")} ></img></span>
            <span>
              <div className="toast-message">You have successfully added address</div>
              <div className="toast-address">{message}</div>
              {/* 0x9b20bd863e1cf226b98…6b10 */}
            </span>
          </div>
        </Alert>
      </Snackbar>
    </div>
  );
}                                                                                                                                        