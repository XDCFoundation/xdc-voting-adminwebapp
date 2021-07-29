
import React from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import "../../assets/styles/custom.css";

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
    border: "solid 1px #c6c8ce",
    backgroundColor: "#ffffff",
    borderRadius: "7px",
    outline: "none"
    // padding: "15px",
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


    margin: "14px 8px 15px 2px",
    padding: "3px 19px 3px 20px",

  },
  subCategory: {
    marginTop: "3px",
    marginBottom: "-2px",
    // fontWeight: "50px",
    fontfamily: "Inter",
    fontsize: "12px",
    fontweight: "500",
    border: "none !important"
  },
  heading: {
    marginLeft: "5px",
    fontfamily: "Inter",
    fontweight: "600"
  }
}));

export default function CustomizedSnackbars() {
  const classes = useStyles();

  const [isDisabled, setDisabled] = React.useState(true);
const [check, setCheck] = React.useState(false)
  const [open, setOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [error, setError] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleCancelClose = () =>{
    setDialogOpen(false);
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


  const validateInputField = (e) => {
    var text = e.target.value
  //  var check= e.target.checked.id;

    if (text.length>=5)  {
        // setDisabled(false)

        // setEmailError('')

    }
    else {

        // setEmailError('')
    }
}

const validateCheckbox = (e) => {
  var check = e.target.value;
 

  if (check) {
      setDisabled(false)

      // setEmailError1('')

  }
  else {

      // setEmailError1('')
  }
}

  return (
    <div className={classes.root}>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "40px", width: "60vw", marginLeft: "20vw" }}>
        <div className="whitelisted-heading">Whitelisted Addresses</div>
        <button variant="outlined" onClick={handleDialog} className="add-btn1" >
          Add
        </button>
      </div>
      <Dialog className={classes.dialog} open={dialogOpen} divide>
        <DialogTitle className={classes.heading} id="form-dialog-title">Add a new Address</DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.subCategory}>
            <b>Address</b>
          </DialogContentText>
          <input className={classes.input} type="text" required="true"
           onChange={(e) => validateInputField(e)}
          ></input>
        </DialogContent>
        <div style={{ display: "inline", marginTop: "10px" }}>
          <input
            onChange={(e) => {
              validateCheckbox(e)
            // validateCheckbox(e.target.checked.id)
              // setCheck(e.target.checked.id);
              
              // {checked?isDisabled(false):isDisabled(true)}
              // exportAddress(event.row);
              // handleToggle(checked)

            }}
           
            type="checkbox"
            className="checked-btn"
           value={check}

          />
          <span className="tabledata">
            Allow Voting
          </span>
        </div>
        <div style={{ display: "inline" }}>
          <input
            onChange={(e) => {
              validateCheckbox(e)
              // let checked = event.target.checked.id;
              // exportAddress(event.row);
              // handleToggle(checked);
            }}
            type="checkbox"
            className="checked-btn"
           
          />
          <span className="tabledata">
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
                onClick={handleCloseDailog}
                disabled={isDisabled}

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
              <div className="toast-address">0x9b20bd863e1cf226b98…6b10</div>
            </span>
          </div>
        </Alert>
      </Snackbar>
    </div>
  );
}