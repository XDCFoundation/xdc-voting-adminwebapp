import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles, mergeClasses } from "@material-ui/styles";
import { Row } from "simple-flexbox";
// import Alert from '@material-ui/lab/Alert';
// import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
// import Pagination from "@material-ui/lab/Pagination";
import ColorAlerts from "./confirmDialog";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import PositionedSnackbar from './confirmDialog';
import utility from "../../utility";
import { Checkbox } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStyles = makeStyles((theme) => ({

  Alert: {
    backgroundColor: "black"
  },
  add: {
    // marginLeft: "80%",
    // backgroundColor: "#f5f8fa",
    // fontFamily: "Roboto",
    // fontStyle: "normal",
    backgroundColor: "#2149b9",
    marginLeft: "90px"
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
  forgotpass: {
    color: "#2149b9",
    marginLeft: "123px"
  },
  createaccount: {
    color: "#2149b9",
    marginLeft: "32px",
    fontfamily: "Inter",
    fontsize: "14px",
  },
  icon: {
    marginLeft: "-30px"
  },
  xdc: {
    color: "#2a2a2a",
    marginLeft: "30px",
    fontfamily: "Inter",
    fontsize: "5px",
  },
  heading: {
    marginLeft: "5px",
    fontfamily: "Inter",
    fontweight: "600"
  }
}));

export default function FormDialog() {
  // const [open, setOpen] = React.useState(false);
  const [toggle, handleToggle] = React.useState(false);
  const [passwordShown, setPasswordShown] = React.useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
    // {passwordShown ?<VisibilityIcon/>:<VisibilityOff/>}

  };


  const [isDisabled, setDisabled] = React.useState(true);
  const [emailError, setEmailError] = React.useState('')
  const validateInputField = (e) => {
    var text = e.target.value
   var checkbox = e.target.value

    if (text.length>=5)  {
        setDisabled(false)

        setEmailError('')

    }
    else {

        setEmailError('')
    }
}

  
  const classes = useStyles();




  const [open, setOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [error , setError] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  };












  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleDialog = () => {
    setDialogOpen(true);
  };
  const handleCloseDailog = () => {
   
    setDialogOpen(false);
    setOpen(true);

  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  // function handleClose() {

  //   setOpen(false);
  //   toast.dark(<Msg />)
  // };


  // const handleLogin = () => {
  //   //   history.push("/loginprofile")

  // }
  // const handleAlert = () => {


  // }




  const Msg = ({ closeToast, toastProps }) => (



    <div style={{ display: "flex" }}>
      <span> <img className="done-logo" style={{ height: "30px", width: "30px", marginTop: "10px" }} src={require("../../assets/styles/images/DONE.svg")} ></img>
      </span>
      <span>


        <div style={{ width: "350px", color: "#FFFFFF", padding: "0px" }}>

          You have successfully added address
        </div>
        <div>
          0x9b20bd863e1cf226b98…6b10
        </div>
      </span>

    </div>

  )





//   function notify() {
//     // handleClose()
//     // console.log("toats")

    
// //  setOpen(false)
//  toast.dark(<Msg />)

//   }



  // function handleALertOpen() {
  //   notify();
  //   handleClose();
  // }



  // const wrapperFunction = () => {
  //   notify()
  //   handleClose()

  // }

  //   const [state, setState] = React.useState({
  //     open1: false,
  //     vertical: 'top',
  //     horizontal: 'center',
  //   });

  //   const { vertical, horizontal, open1, buttons } = state;

  //   const handleClick = (newState,buttons) => () => {

  //     const buttons = (
  //         <React.Fragment>
  //           <Button onClick={handleClick({ vertical: 'top', horizontal: 'center' })}>Top-Center</Button>
  //           <Button onClick={handleClick({ vertical: 'top', horizontal: 'right' })}>Top-Right</Button>
  //           <Button onClick={handleClick({ vertical: 'bottom', horizontal: 'right' })}>
  //             Bottom-Right
  //           </Button>
  //           <Button onClick={handleClick({ vertical: 'bottom', horizontal: 'center' })}>
  //             Bottom-Center
  //           </Button>
  //           <Button onClick={handleClick({ vertical: 'bottom', horizontal: 'left' })}>Bottom-Left</Button>
  //           <Button onClick={handleClick({ vertical: 'top', horizontal: 'left' })}>Top-Left</Button>
  //         </React.Fragment>
  //       );

  //   };

  //   const handleClose1 = () => {
  //     setState({ ...state, open1: false });
  //   };








  return (
    <div >
      {/* <div >
      <Alert severity="success" color="" >
      <div style={{ display: "flex" }}>
      <span> <img className="done-logo" style={{ height: "30px", width: "30px", marginTop: "10px" }} src={require("../../assets/styles/images/DONE.svg")} ></img>
      </span>
      <span>


        <div style={{ width: "350px", color: "#FFFFFF", padding: "0px" }}>

          You have successfully added address
        </div>
        <div>
          0x9b20bd863e1cf226b98…6b10
        </div>
      </span>

    </div>
      </Alert>
    </div> */}




      <div id="containerIntro">
        <h1>Whitelisted Addresses</h1>
        <Button variant="outlined" onClick={handleDialog}>
        Open success snackbar
      </Button>

        {/* <button className="add-btn" 
onClick={handleDialog}
        // onClick={handleClickOpen}
         > Add </button> */}
      </div>

      {/* <Button
        className={classes.btn}
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
      >
          <img className="Shape2" src={require("../../../../src/assets/images/Profile.png")}></img>
      </Button> */}

      <div>
        <Dialog
          className={classes.dialog}
          // open={{dialogOpen}}
          // onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <Row>
            <DialogTitle className={classes.heading} id="form-dialog-title">Add a new Address</DialogTitle>

          </Row>
          <DialogContent>
            <DialogContentText className={classes.subCategory}>
              <b>Address</b>
            </DialogContentText>
            <input className={classes.input}  type="text" required="true"
             onChange={(e) => validateInputField(e)}
            ></input>
          </DialogContent>


          <div style={{ display: "inline", marginTop: "10px" }}>
            <input
              onChange={(e) => {
                // validateInputField(e)
                let checked = e.target.checked.id;
                // exportAddress(event.row);
                handleToggle(checked)
                
              }}
              type="checkbox"
              checked={toggle}
              style={{
                marginLeft: "28px",
                backgroundColor: "none",
                marginTop: "-25px",
                marginRight: "10px",
              }}

            />
            <span className="tabledata">
              Allow Voting
            </span>
          </div>





          <div style={{ display: "inline" }}>
            <input
              onChange={(event) => {

                let checked = event.target.checked.id;
                // exportAddress(event.row);
                handleToggle(checked);
              }}
              type="checkbox"
              checked={toggle}
              style={{
                marginLeft: "28px",
                backgroundColor: "none",
                marginTop: "-25px",
                marginRight: "10px",
              }}
            />
            <span className="tabledata">
              Allow Proposal Creation
            </span>
          </div>
          {/* </DialogContent> */}
          <DialogActions className={classes.buttons}>
            <span><button className={classes.cnlbtn} 
            // onClick={handleClose} 
            >Cancel</button></span>
            {/* const buttons = ( */}
            {/* <React.Fragment> */}
            <span>
              <div>
                <button className={classes.addbtn} disabled={isDisabled}
                onClick={handleCloseDailog}
                  // onClick={notify}
                  // onClick={handleDialog}
                  // onClick={handleClose}
                  // onClick={() => { utility.apiSuccessToast("You have successfully added addres"); handleClose() }}
                >Add</button>
                {/* <ToastContainer

                  position="top-center"
                  color="black"
                  hideProgressBar={false}
                  autoClose={null}
                  // hideProgressBar={false}
                  // newestOnTop={false}
                  // closeOnClick
                  // rtl={false}
                  // pauseOnFocusLoss
                  draggable

                /> */}
              </div>
              {/* <button className={classes.addbtn}  >  Add </button> */}
            </span>

          </DialogActions>

        </Dialog>

        <Snackbar
        open={open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" className={classes.Alert}>
          This is a success message!
        </Alert>
      </Snackbar>
      </div>
    </div>
  );
}
