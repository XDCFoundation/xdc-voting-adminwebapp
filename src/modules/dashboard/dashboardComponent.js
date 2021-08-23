import React, { useEffect } from 'react'
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
import { EditService } from '../../services';
import { DeleteService } from '../../services';
import { AccountService } from '../../services';
import Utils from '../../utility';
import { number } from 'prop-types';
import moment from 'moment';
const cors = require('cors');


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
    borderRadius: "4px",
    backgroundColor: "#9fa9ba",
    color: "white",
    border: "none",
    fontFamily: "Inter,sans-serif",
    margin: "14px 8px 15px 2px",
    padding: "3px 19px 3px 20px",

  },
  subCategory: {
    marginTop: "5px",
    marginBottom: "0px",
    border: "none !important",
    color: "#9FA9BA",
    letterSpacing: "0.54px",

    fontWeight: "600", fontSize: "13px",
    fontFamily: "unset"
    
  },
  addedon: {
    color: "#9FA9BA",
    /* border: none !important; */
    fontSize: "14px",
    marginTop: "10px",
    /* font-family: unset; */
    /* font-weight: 500; */
    marginBottom: "0px",
    letterSpacing: "0.54px",
    marginLeft: "3px",
    fontFamily: "Inter,sans-serif",
  },
  deleteheading: {
    letterSpacing: "0.69px",
    color: "#2A2A2A",
    opacity: "1",
    fontSize: "18px",
    fontFamily: "Inter,sans-serif",
    fontWeight: "600",
  },
  deletesubheading: {
    marginBottom: "0px",
    letterSpacing: "0.54px",
    opacity: "1",
    fontSize: "14px",
    color: "#2A2A2A",
    fontWeight: "500",
    fontFamily: "Inter,sans-serif",
  },
  deleteaddress: {
    color: "#3763DD",
    letterSpacing: "0.54px",
    fontSize: "14px",
    fontWeight: "500",
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

  const [getListOfAddress, setgetListOfAddress] = React.useState([])

  const getListOffAddress = async () => {

    let [error, totalAccounts] = await Utils.parseResponse(AccountService.getListOfWhitelistedAddress())
    if (error || !totalAccounts)
      return
    setgetListOfAddress(totalAccounts);
  }
  useEffect(() => {
    getListOffAddress()
  }, []);


  const deleteaddress = async () => {
    const id = {
      "address": deleteMessage,
      "permission": {
        "allowVoting": allowVoting,
        "allowProposalCreation": proposal
      }
    }

    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!", id)
    let [error, totalAccounts] = await Utils.parseResponse(DeleteService.deleteWhitelistedAddress(id))
    console.log(totalAccounts, "total-accounts");
    if (error || !totalAccounts)
      return

    getListOffAddress();
    handleCloseDailog()

  }

  const editWhitelistAddress = async () => {

    const id = {

      "address": deleteMessage,
      "updateAddress": addressInput,
      "allowVoting": allowVoting,
      "allowProposalCreation": proposal,
      // "totalVotes" : null
    }

    let [error, totalAccounts] = await Utils.parseResponse(EditService.editWhitelistedAddress(id))

    if (error || !totalAccounts)
      return

    getListOffAddress();
    handleCloseDailog1();

  }




  // function shortenBalance(b, amountL = 12, amountR = 3, stars = 3) {
  //   return `${b.slice(0, amountL)}${".".repeat(stars)}${b.slice(
  //     b.length - 3,

  //   )}`;
  // }






  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
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


  const handleEditClick = () => {
    setEditClick(!editClick)
  }


  const { state } = props;




  const { useState, Fragment } = React

  // The added element component
  const AddedElement = () => <button
    onClick={() => {
      editWhitelistAddress()
      setallowVoting(false);
      setAddressInput("");
      setProposal(false);


    }}
    disabled={(!allowVoting && !proposal) || !addressInput}

    style={{ marginLeft: "12px" }}
    className={classes.addbtn} type="button">Done</button>

  // The parent component
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [Date, setDate] = React.useState();
  const [deleteMessage, setDeleteMessage] = useState("")
  const [editClick, setEditClick] = useState(false)
  const [allowVoting, setallowVoting] = React.useState(false);
  const [proposal, setProposal] = React.useState(false);
  const [addressInput, setAddressInput] = React.useState("");
  const [count, setCount] = React.useState(0);
  const [buttonText, setButtonText] = useState("Edit");
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogOpen1, setDialogOpen1] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const handleDialog = () => {
    setDialogOpen(true);
  };
  const handleCancelClose = () => {
    setDialogOpen(false);
  }
  const handleDialog1 = () => {
    setDialogOpen1(true);
    setCount(0)
    setButtonText("Edit")
    setEditClick(false)






  };
  const handleCancelClose1 = () => {
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


      <div className="header">
        <div className="div1">
          <span>
            <img className="header-logo" src={require("../../assets/styles/images/xdc_logo.svg")} ></img>


          </span>

          <span className="voting-para">

            <p >Voting Address Manager</p>
          </span>
          <span className="profile-icon">



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

      <CustomizedSnackbars getListOffAddress={() => getListOffAddress()} />
      <div className="griddiv">


        <Grid lg={13} className="tablegrid_address">
          <Grid component={Paper} style={{ boxShadow: "0px 0px 0px 0px" }}>

            <Table className="table" aria-label="Whitelisted Addresses" style={{ boxShadow: "0px 0px 0px 0px" }}>
              <TableHead>
                <TableRow>
                  <TableCell style={{
                    border: "none", paddingLeft: "4%", fontWeight: "500", 
                  }} align="left">

                    <span className="tableheading">Address</span>
                  </TableCell>

                  <TableCell
                    style={{
                      border: "none", paddingLeft: "0%", fontWeight: "500", 
                    }}
                    align="left"
                  >
                    <span className="tableheading">Added On</span>
                  </TableCell>
                  <TableCell
                    style={{
                      border: "none", fontWeight: "500",
                    }}
                    align="left"
                  >
                    <span className="tableheading">Votes</span>
                  </TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {/* {filteredProducts.map((product)=>{ */}



                {getListOfAddress.map((row, index) => {


                  return (

                    // address={filteredData && filteredData.length ? filteredData : address}
                    <TableRow

                      style={
                        index % 2 !== 1
                          ? { background: "#f9f9f9" }
                          : { background: "white" }
                      }
                    >

                      <TableCell style={{ border: "none", paddingLeft: "4%" }} margin-left="5px" onClick={() => {
                        handleDialog1(); setDeleteMessage(row.address); setAddressInput(row.address); setDate(row.createdOn); setallowVoting(row.permission.allowVoting); setProposal(row.permission.allowProposalCreation);
                      }}>

                        <a className="linkTable" >
                          <Tooltip placement="top" title={row.address}>

                            <span className="tabledata"  >
                              {shorten(row.address)}{" "}

                            </span>
                          </Tooltip>
                        </a>
                      </TableCell>

                      <TableCell style={{ border: "none", paddingLeft: "0%" }} align="left" onClick={() => {
                        handleDialog1(); setDeleteMessage(row.address); setAddressInput(row.address); setallowVoting(row.permission.allowVoting); setProposal(row.permission.allowProposalCreation); setDate(row.createdOn)
                      }}>

                        <span className="tablemiddata" > {moment(row.createdOn).format('DD MMMM YYYY')}</span>

                      </TableCell>
                      <TableCell style={{ border: "none" }} align="left" onClick={() => {
                        handleDialog1(); setDeleteMessage(row.address); setAddressInput(row.address); setDate(row.createdOn); setallowVoting(row.permission.allowVoting); setProposal(row.permission.allowProposalCreation);
                      }}>

                        <span className="tablemiddata">{row.totalVotes = "null" ? 100 : row.totalVotes}</span>


                      </TableCell>
                      <TableCell style={{ border: "none", paddingLeft: "4%" }} align="left">
                        <a className="linkTable" >
                          <span className="tabledata" onClick={() => {
                            handleDialog(); setDeleteMessage(row.address); setAddressInput(row.address); setDate(row.createdOn); setallowVoting(row.permission.allowVoting); setProposal(row.permission.allowProposalCreation);
                          }} >  Delete</span>
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

      {/* ---------Delete Dialog Box----------- */}

      <div>

        <Dialog
          className={classes.dialog}
          open={dialogOpen}
          divide
          aria-labelledby="form-dialog-title"
        >
          <Row>
            <DialogTitle  id="form-dialog-title"><div className={classes.deleteheading}>Delete Address</div></DialogTitle>

          </Row>
          <DialogContent>
            <DialogContentText className={classes.deletesubheading}>
              Do you want to delete this address <span className={classes.deleteaddress}>{shorten(deleteMessage)}</span>
            </DialogContentText>
          </DialogContent>

          <DialogActions className={classes.buttons}>
            <span><button className={classes.cnlbtn} onClick={handleCancelClose} >Cancel</button></span>

            <span>
              <button className={classes.addbtn}
                onClick={() => {

                  deleteaddress(deleteMessage)

                }}
              // onClick={handleCloseDailog}
              // onClick={() => { utility.apiSuccessToast("You have succesfully deleted addres"); handleClose1() }}
              >  Delete </button></span>
          </DialogActions>

        </Dialog>
      </div>

      {/* ------Delete Toast Message----- */}

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
              <div className="toast-address">{deleteMessage}</div>
            </span>
          </div>
        </Alert>
      </Snackbar>


      {/* --------Edit Toast Message--------- */}

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
              <div className="toast-address">{deleteMessage}</div>
            </span>
          </div>
        </Alert>
      </Snackbar>




      {/* -----------Edit Dialog Box------------ */}
      <div>
        <Dialog
          className={classes.dialog}
          open={dialogOpen1}
          divide
          onClose={handleCancelClose1}
          aria-labelledby="form-dialog-title"
        >
          <Row>
            <DialogTitle  id="form-dialog-title"><div className="editheading">Address</div></DialogTitle>

          </Row>
          <DialogContent>

            <input className="editinput"
              value={addressInput}
              onChange={(e) =>
                setAddressInput(e.target.value)

              }

              disabled={!editClick}


            ></input>
            <DialogContentText className={classes.addedon}>
              <span >Added on: <span>{moment(Date).format('DD MMMM YYYY')}</span></span>
            </DialogContentText>
          </DialogContent>

          <div className="checked-upper">
            <input
              onChange={(e) => {
                setallowVoting(!allowVoting)

              }}
              type="checkbox"

              checked={allowVoting}
              value={allowVoting}
              disabled={!editClick}


              className="checked-btn"



            />
            <span className="checkbox-heading">
              Allow Voting
            </span>
          </div>





          <div className="checked-down">
            <input
              onChange={(event) => {
                setProposal(!proposal)

              }}
              type="checkbox"
              checked={proposal}
              value={proposal}
              disabled={!editClick}
              className="checked-btn"

            />
            <span className="checkbox-heading">
              Allow Proposal Creation
            </span>
          </div>

          <DialogActions className={classes.buttons1}>
            {/* <span><button className={classes.cnlbtn} onClick={handleClose2} >Cancel</button></span> */}
            <Fragment>
              <button onClick={() => (setCount(1), setButtonText("Cancel"), handleEditClick())}

                className={count === 1 ? classes.cnlbtn : classes.addbtn}
              >{buttonText}</button>
              {[...Array(count)].map((_, i) => <AddedElement key={i} />)}
              {/* {count==1?<button className={classes.cnlbtn} onClick={handleCancelClose1}>Cancel</button>:""} */}
            </Fragment>

            {/* <span><button className={classes.addbtn} onClick={handleClickDelete}  >  Edit  </button></span> */}
          </DialogActions>
        </Dialog>
      </div>

      {/* ---------Pagination--------- */}

      <div className="pagination-div"><PaginationRounded /></div>

      <div style={{ height: "50px" }}></div>
    </div>
  )
}











