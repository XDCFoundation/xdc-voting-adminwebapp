// import React from 'react';
  
// class DemoForm extends React.Component {
//     constructor() {
//     super();
//     this.state = {
//       input: {},
//       errors: {}
//     };
     
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }
     
//   handleChange(event) {
//     let input = this.state.input;
//     input[event.target.name] = event.target.value;
  
//     this.setState({
//       input
//     });
//   }
     
//   handleSubmit(event) {
//     event.preventDefault();
  
//     if(this.validate()){
//         console.log(this.state);
  
//         let input = {};
//         input["name"] = "";
//         input["email"] = "";
//         input["password"] = "";
//         input["confirm_password"] = "";
//         this.setState({input:input});
  
//         alert('Demo Form is submited');
//     }
//   }
  
//   validate(){
//       let input = this.state.input;
//       let errors = {};
//       let isValid = true;
  
//       if (!input["name"]) {
//         isValid = false;
//         errors["name"] = "Please enter your name.";
//       }
  
//       if (!input["email"]) {
//         isValid = false;
//         errors["email"] = "Please enter your email Address.";
//       }
  
//       if (typeof input["email"] !== "undefined") {
          
//         var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
//         if (!pattern.test(input["email"])) {
//           isValid = false;
//           errors["email"] = "Please enter valid email address.";
//         }
//       }
  
//       if (!input["password"]) {
//         isValid = false;
//         errors["password"] = "Please enter your password.";
//       }
  
//       if (!input["confirm_password"]) {
//         isValid = false;
//         errors["confirm_password"] = "Please enter your confirm password.";
//       }
  
//       if (typeof input["password"] !== "undefined" && typeof input["confirm_password"] !== "undefined") {
          
//         if (input["password"] != input["confirm_password"]) {
//           isValid = false;
//           errors["password"] = "Passwords don't match.";
//         }
//       } 
  
//       this.setState({
//         errors: errors
//       });
  
//       return isValid;
//   }
     
//   render() {
//     return (
//       <div>
//         <h1>React Password and Confirm Password Validation Example - ItSolutionStuff.com</h1>
//         <form onSubmit={this.handleSubmit}>
  
//           <div class="form-group">
//             <label for="name">Name:</label>
//             <input 
//               type="text" 
//               name="name" 
//               value={this.state.input.name}
//               onChange={this.handleChange}
//               class="form-control" 
//               placeholder="Enter name" 
//               id="name" />
  
//               <div className="text-danger">{this.state.errors.name}</div>
//           </div>
  
//           <div class="form-group">
//             <label for="email">Email Address:</label>
//             <input 
//               type="text" 
//               name="email" 
//               value={this.state.input.email}
//               onChange={this.handleChange}
//               class="form-control" 
//               placeholder="Enter email" 
//               id="email" />
  
//               <div className="text-danger">{this.state.errors.email}</div>
//           </div>
   
//           <div class="form-group">
//             <label for="password">Password:</label>
//             <input 
//               type="password" 
//               name="password" 
//               value={this.state.input.password}
//               onChange={this.handleChange}
//               class="form-control" 
//               placeholder="Enter password" 
//               id="password" />
  
//               <div className="text-danger">{this.state.errors.password}</div>
//           </div>
  
//           <div class="form-group">
//             <label for="password">Confirm Password:</label>
//             <input 
//               type="password" 
//               name="confirm_password" 
//               value={this.state.input.confirm_password}
//               onChange={this.handleChange}
//               class="form-control" 
//               placeholder="Enter confirm password" 
//               id="confirm_password" />
  
//               <div className="text-danger">{this.state.errors.confirm_password}</div>
//           </div>
              
//           <input type="submit" value="Submit" class="btn btn-success" />
//         </form>
//       </div>



//     );
//   }
// }
  
// export default DemoForm;





import React from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { Dialog, DialogActions, DialogContent,DialogContentText,DialogTitle } from "@material-ui/core";
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
    backgroundColor: "black"
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

  return (
    <div className={classes.root}>
      <div style={{display:"flex",justifyContent:"space-between",marginTop:"40px",width:"60vw",marginLeft:"20vw"}}>
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
            <input className={classes.input}  type="text" required="true"
            //  onChange={(e) => validateInputField(e)}
            ></input>
          </DialogContent>
          <div style={{ display: "inline", marginTop: "10px" }}>
            <input
              onChange={(e) => {
                // validateInputField(e)
                let checked = e.target.checked.id;
                // exportAddress(event.row);
                // handleToggle(checked)
                
              }}
              type="checkbox"
              // checked={toggle}
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
                // handleToggle(checked);
              }}
              type="checkbox"
              // checked={toggle}
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
       
        <DialogActions className={classes.buttons}>
        <span><button className={classes.cnlbtn} 
            >Cancel</button></span>
            <span>
              <div>
          <button className={classes.addbtn}
            variant="contained"
            color="primary"
            onClick={handleCloseDailog}
          >
            Add
          </button>
          </div>
          </span>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={open}
        autoHideDuration={600}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" className={classes.Alert}>
          This is a success message!
        </Alert>
      </Snackbar>
    </div>
  );
}