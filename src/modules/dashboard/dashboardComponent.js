import React from 'react'
import { Column, Row } from "simple-flexbox";
import { Button } from "@material-ui/core";
import CustomInput from "../../common/components/CustomInput";
import { history } from "../../managers/history";
import Divider from "@material-ui/core/Divider/Divider";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FormDialog from '../Dialog/addDialog';
import Pagination from '@material-ui/lab/Pagination';
import PaginationRounded from './pagination';
// import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import color from '@material-ui/core/colors/amber';
import { Tooltip } from '@material-ui/core';
import EditDialog from '../Dialog/confirmDialog';
import utility from '../../utility';
import CustomizedSnackbars from './DemoForm'
import "../../assets/styles/custom.css";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles, mergeClasses } from "@material-ui/styles";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}



const useStyles = makeStyles((theme) => ({
  Alert: {
    backgroundColor: "#00144D"
  },
  dialog: {
    marginLeft: "26%",
    marginTop: "38px",
    width: "55% !important",
    height: "50% !important",
    borderRadius: "80px !important"
  },
  buttons: {
    padding: "0px 35px 0px 0px",
    marginTop: "1px",
    marginBottom: "6px"
  },
  buttons1: {
    padding: "0px 35px 0px 0px",
    marginTop: "-10px",
    marginBottom: "6px"
  },
  input: {
    width: "400px",
    height: "5vh",
    border: "solid 1px #c6c8ce",
    backgroundColor: "#ffffff",
    borderRadius: "7px",
    outline: "none",
    marginTop: "-15px"
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
    marginTop: "5px",
    marginBottom: "0px",
    // fontWeight: "50px",
    // fontfamily: "Inter",
    // fontsize: "12px",
    // fontweight: "bold",
    border: "none !important",
    color: "#9FA9BA",
    letterSpacing: "0.54px",

    fontWeight: "600", fontSize: "13px",
    fontFamily: "unset"
  },
  deleteaddress: {
    color: "#3763DD",
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
    marginLeft: "2px",
    fontfamily: "Inter",
    fontweight: "600"
  }
}));
export default function DashboardComponent(props) {



  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose1 = () => {
    setOpen(false);
  };

  const handleClickOpen1 = () => {
    setOpen(true);
  };

  const handleClose2 = () => {
    setOpen1(false);
    setCount(0);
    setButtonText("Edit")
  };

  function handleDelete() {
    return (
      <div><button>Add</button></div>

    )

  }

  const handleClickDelete = () => {

    handleDelete()


  }



  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClick1 = (event) => {
    setAnchorEl(event.target.value);
  };
  // const handleClickOpen = () => {
  //     setOpen(true);
  //   };


  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    history.push('/');
  }
  const handleChangePassword = () => {
    history.push('/change-password');
  }

  function shorten(b, amountL = 10, amountR = 3, stars = 3) {
    return `${b.slice(0, amountL)}${".".repeat(stars)}${b.slice(
      b.length - 3,
      b.length
    )}`;
  }

  const [toggle, handleToggle] = React.useState(false);
  const [address, setAddress] = React.useState([]);

  React.useEffect(() => {
    let address = [
      {
        Adress: "0x9b20bd863e1cf226b98…5a30",
        AddedOn: "30 June 2021",
        Votes: "100",
        id: 1,
      },
      {
        Adress: "xdcc4e699581116412965b…5e7c",
        AddedOn: "21 June 2021",
        Votes: "200",
        id: 2,
      },
      {
        Adress: "5e7c71b8e2dd50ac8d30x…5b9c",
        AddedOn: "1 June 2021",
        Votes: "170",
        id: 3,
      },
    ]

      ;
    setAddress(
      address.map((d) => {
        return {
          select: false,
          Adress: d.Adress,
          AddedOn: d.AddedOn,
          Votes: d.Votes,

          id: d.id,
        };
      })
    );
  }, []);

  const { state } = props;




  const { useState, Fragment } = React

  // The added element component
  const AddedElement = () => <button onClick={handleCloseDailog1} style={{ marginLeft: "12px" }} className={classes.addbtn} type="button">Done</button>

  // The parent component

  const [count, setCount] = React.useState(0) // Name it however you wish

  const [buttonText, setButtonText] = useState("Edit");

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogOpen1, setDialogOpen1] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const handleDialog = () => {
    setDialogOpen(true);
  };
  const handleCancelClose = () =>{
    setDialogOpen(false);
  }
  const handleDialog1 = () => {
    setDialogOpen1(true);
  };
  const handleCancelClose1 = () =>{
    setDialogOpen1(false);
  }
  const handleCloseDailog = () => {

    setDialogOpen(false);
    setOpen3(true);

  };
  const handleCloseDailog1 = () => {

    setDialogOpen1(false);
    setOpen4(true);

  };


  const handleClose3 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen3(false);
  };
  const handleClose4 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen4(false);
  };

  return (

    <div>

      {/* <div><CustomizedSnackbars/></div> */}
      <div className="header">
        <div className="div1">
          <span>
            <img className="header-logo" src={require("../../assets/styles/images/xdc_logo.svg")} ></img>


          </span>

          <span className="voting-para">

            <p >Voting Address Manager</p>
          </span>
          <span className="profile-icon">

            {/* <img className="profile-logo" src={require("../../assets/styles/images/Profile.png")} ></img> */}

            <div>
              <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <img className="profile-logo" src={require("../../assets/styles/images/Profile.png")} ></img>

              </Button>
              <Menu
                id="simple-menu-item"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}

              >

                <MenuItem onClick={handleChangePassword} style={{ backgroundColor: "white" }} >Change Password </MenuItem>
                <hr className="menu-line" />
                <MenuItem onClick={handleLogout} style={{ backgroundColor: "white" }} >Logout</MenuItem>
              </Menu>
            </div>
          </span>

        </div>

      </div>







      <CustomizedSnackbars />
      <div className="griddiv">


        <Grid lg={13} className="tablegrid_address">
          {/* <Grid class="tabletop-header">Whitelisted Addresses</Grid> */}
          <Grid component={Paper} style={{ boxShadow: "0px 0px 0px 0px" }}>

            <Table className="table" aria-label="Whitelisted Addresses" style={{ boxShadow: "0px 0px 0px 0px" }}>
              <TableHead>
                <TableRow>
                  <TableCell style={{
                    border: "none", paddingLeft: "4%", fontWeight: "500", fontSize: "15px",
                    fontFamily: "unset"
                  }} align="left">

                    <span className={"tableheaders"}>Address</span>
                  </TableCell>

                  <TableCell
                    style={{
                      border: "none", paddingLeft: "0%", fontWeight: "500", fontSize: "15px",
                      fontFamily: "unset"
                    }}
                    align="left"
                  >
                    <span className={"tableheaders"}>Added On</span>
                  </TableCell>
                  <TableCell
                    style={{
                      border: "none", paddingLeft: "1%", fontWeight: "500", fontSize: "15px",
                      fontFamily: "unset"
                    }}
                    align="left"
                  >
                    <span className={"tableheaders"}>Votes</span>
                  </TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {/* {filteredProducts.map((product)=>{ */}



                {address.map((row, index) => {


                  return (

                    // address={filteredData && filteredData.length ? filteredData : address}
                    <TableRow

                      style={
                        index % 2 !== 1
                          ? { background: "#f9f9f9" }
                          : { background: "white" }
                      }
                    >

                      <TableCell style={{ border: "none", paddingLeft: "4%" }} margin-left="5px" onClick={handleDialog1}>

                        <a className="linkTable" >
                          <Tooltip placement="top" title={row.Adress}>

                            <span className="tabledata"  >
                              {(row.Adress)}{" "}

                            </span>
                          </Tooltip>
                        </a>
                      </TableCell>

                      <TableCell style={{ border: "none", paddingLeft: "0%" }} align="left" onClick={handleDialog1}>
                        {/* <a className="linkTable" href="/"> */}
                        <span className="tabledata"> {row.AddedOn}</span>
                        {/* </a> */}
                      </TableCell>
                      <TableCell style={{ border: "none" }} align="left" onClick={handleDialog1}>
                        {/* <a className="linkTable" href="/"> */}
                        <span className="tabledata">{row.Votes}</span>
                        {/* </a> */}
                      </TableCell>
                      <TableCell style={{ border: "none", paddingLeft: "5%" }} align="left">
                        <a className="linkTable" >
                          <span className="tabledata" onClick={handleDialog} >  Delete</span>
                        </a>
                      </TableCell>

                    </TableRow>
                  );
                })}

              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </div>


      <div>
        <Dialog
          className={classes.dialog}
          open={dialogOpen}
          divide
          aria-labelledby="form-dialog-title"
        >
          <Row>
            <DialogTitle className={classes.heading} id="form-dialog-title">Delete Address</DialogTitle>

          </Row>
          <DialogContent>
            <DialogContentText className={classes.subCategory}>
              Do you want to delete this address <span className={classes.deleteaddress}>0x9b20bd863e1cf226b98…5a30</span>
            </DialogContentText>

          </DialogContent>

          <DialogActions className={classes.buttons}>
            <span><button className={classes.cnlbtn} onClick={handleCancelClose} >Cancel</button></span>

            <span>
              <button className={classes.addbtn}
                onClick={handleCloseDailog}
              // onClick={() => { utility.apiSuccessToast("You have succesfully deleted addres"); handleClose1() }}
              >  Delete </button></span>
          </DialogActions>

        </Dialog>
        <Snackbar
          open={open3}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={handleClose3}
        >
          <Alert severity="" className={classes.Alert}>
            <div style={{ display: "flex" }}>
              <span style={{ marginRight: "10px", marginTop: "-5px", marginLeft: "-8px" }}><img className="done-logo" style={{ height: "30px", width: "30px", marginTop: "10px" }} src={require("../../assets/styles/images/DONE.svg")} ></img></span>
              <span>
                <div className="toast-message">You have successfully deleted address</div>
                <div className="toast-address">0x9b20bd863e1cf226b98…6b10</div>
              </span>
            </div>
          </Alert>
        </Snackbar>
        <Snackbar
          open={open4}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={handleClose4}
        >
          <Alert severity="" className={classes.Alert}>
            <div style={{ display: "flex" }}>
              <span style={{ marginRight: "10px", marginTop: "-5px", marginLeft: "-8px" }}><img className="done-logo" style={{ height: "30px", width: "30px", marginTop: "10px" }} src={require("../../assets/styles/images/DONE.svg")} ></img></span>
              <span>
                <div className="toast-message">You have successfully edited address</div>
                <div className="toast-address">0x9b20bd863e1cf226b98…6b10</div>
              </span>
            </div>
          </Alert>
        </Snackbar>
      </div>



      <div>
        <Dialog
          className={classes.dialog}
          open={dialogOpen1}
          divide
          aria-labelledby="form-dialog-title"
        >
          <Row>
            <DialogTitle className={classes.heading} id="form-dialog-title">Address</DialogTitle>

          </Row>
          <DialogContent>

            <input className={classes.input}></input>
            <DialogContentText className={classes.subCategory}>
              <span >Added on: 30 June 2021</span>
            </DialogContentText>
          </DialogContent>

          <div className="checked-upper">
            <input
              onChange={(event) => {

                let checked = event.target.checked.id;

                handleToggle(checked);
              }}
              type="checkbox"
              checked={toggle}
              className="checked-btn"
             

            />
            <span className="tabledata">
              Allow Voting
            </span>
          </div>





          <div className="checked-down">
            <input
              onChange={(event) => {

                let checked = event.target.checked.id;

                handleToggle(checked);
              }}
              type="checkbox"
              checked={toggle}
              className="checked-btn"
              
            />
            <span className="tabledata">
              Allow Proposal Creation
            </span>
          </div>

          <DialogActions className={classes.buttons1}>
            {/* <span><button className={classes.cnlbtn} onClick={handleClose2} >Cancel</button></span> */}
            <Fragment>
              <button onClick={() => (setCount(1), setButtonText("Cancel"))}
              // {...buttonText=="cancel"? handleCancelClose1:""}
                className={count === 1 ? classes.cnlbtn : classes.addbtn}
              >{buttonText}</button>
              {[...Array(count)].map((_, i) => <AddedElement key={i} />)}
            </Fragment>

            {/* <span><button className={classes.addbtn} onClick={handleClickDelete}  >  Edit <EditDialog/> </button></span> */}
          </DialogActions>
        </Dialog>
      </div>
      <div><PaginationRounded /></div>
      <div style={{ height: "50px" }}></div>
    </div>
  )
}











