import React, { useEffect } from "react";
import { Row } from "simple-flexbox";
import { Button } from "@material-ui/core";
import { history } from "../../managers/history";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import PaginationRounded from "./pagination";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Tooltip } from "@material-ui/core";
import CustomizedSnackbars from "./DemoForm";
import "../../assets/styles/custom.css";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { EditService, Logout } from "../../services";
import { DeleteService } from "../../services";
import { AccountService } from "../../services";
import { SearchService } from "../../services";
// import { searchaddress } from "../../services/getListOfAddress";
import Utils from "../../utility";
import moment from "moment";
import Web3 from "web3";
import { connect } from "react-redux";
import { sessionManager } from "../../managers/sessionManager";
import { reduxEvent } from "../../constants";
import Pagination from "@material-ui/lab/Pagination";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  Alert: {
    backgroundColor: "#00144D",
  },
  dialog: {
    marginLeft: "26%",
    marginTop: "38px",
    width: "55% !important",
    height: "50% !important",
    borderRadius: "80px !important",
  },
  buttons: {
    padding: "0px 35px 0px 0px",
    marginTop: "1px",
    marginBottom: "6px",
  },
  buttons1: {
    padding: "0px 35px 0px 0px",
    marginTop: "-10px",
    marginBottom: "6px",
  },
  input: {
    width: "400px",
    height: "5vh",
    border: "solid 1px #c6c8ce",
    backgroundColor: "#ffffff",
    borderRadius: "7px",
    outline: "none",
    marginTop: "-15px",
    // padding: "15px",
  },
// searchbox: {
//   width: "431px",
//   height: "42px",
//   background: "#4264C4 0% 0% no-repeat padding-box",
//   borderRadius: "6px",
//   opacity: "1",
//   border: "none",
//   outline: "none",
//   color: "#E0E0E0",
//   fontSize: "14px",
//   padding: "10px",
//   fontWeight: "500",
//   background: "url(/images/Search.svg) no-repeat 1px",
//   backgroundSize: "14px",
//   backgroundPositionX: "9.5px",
// },
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
    "&:hover": {
      backgroundColor: "#eeeeee !important",
      color: "#2149B9",
    },
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

    fontWeight: "600",
    fontSize: "13px",
    fontFamily: "unset",
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
    fontWeight: "600",
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
    marginLeft: "123px",
  },
  createaccount: {
    color: "#2149b9",
    marginLeft: "32px",
    fontfamily: "Inter",
    fontsize: "14px",
  },
  icon: {
    marginLeft: "-30px",
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
    fontweight: "600",
  },

}));
function DashboardComponent(props) {
  const [getListOfAddress, setgetListOfAddress] = React.useState([]);
  const [pageNumber, setPageNumber] = React.useState();
  const [pagecount, setPagecount] = React.useState(0);

  const [skip, setSkip] = React.useState(0);
  const [limit, setLimit] = React.useState(10);
  // const { state }=props;

  const pagination = async (event, value) => {
    await getListOffAddress({ skip: (value - 1) * 10, limit: limit });
  };

  const getListOffAddress = async (data) => {
    let [error, totalAccounts] = await Utils.parseResponse(
      AccountService.getListOfWhitelistedAddress(data)
    );
    if (error || !totalAccounts) return;
    await setgetListOfAddress(totalAccounts.dataList);
    await setPagecount(totalAccounts.count);
  };
  useEffect(async () => {
    await getListOffAddress({ skip: skip, limit: limit });
  }, []);

  const deleteaddress = async () => {
    const id = {
      address: deleteMessage,
      permission: {
        allowVoting: allowVoting,
        allowProposalCreation: proposal,
      },
    };
    await props.deleteAddress(id);

    let [error, totalAccounts] = await Utils.parseResponse(
      DeleteService.deleteWhitelistedAddress(id)
    );
    console.log(totalAccounts, "total-accounts");
    if (error || !totalAccounts) return;

    await getListOffAddress({ skip: skip, limit: limit });
    handleCloseDailog();
  };

  const editWhitelistAddress = async () => {
    const reqObj = {
      address: deleteMessage,
      updateAddress: addressInput,
      permission: {
        allowVoting: allowVoting,
        allowProposalCreation: proposal,
      },
    };
    await props.onEditAddress(reqObj);
    let [error, totalAccounts] = await Utils.parseResponse(
      EditService.editWhitelistedAddress(reqObj)
    );
    if (error || !totalAccounts) return;
    await getListOffAddress({ skip: skip, limit: limit });
    handleCloseDailog1();
  };

  const search=async(e)=>{
    // setAddressSearch(e.target.value);
    console.log(e.target.value,"adddddddddddddddddddddddddddd")
    console.log(addressSearch,"address of input")
    const reqObj={
      address:e.target.value,
      skip:skip,
      limit:limit
    }
    // await props.searchaddress(reqObj);
    let [error, totalAccounts] = await Utils.parseResponse(
      SearchService.searchaddress(reqObj)
    );
    await setgetListOfAddress(totalAccounts?.searchData)
    // await getListOffAddress({ skip: skip, limit: limit });
  //  await setIsError("No record Found")
    console.log(totalAccounts,"responseaddress")
    console.log(error,"errorrrrrrrrrrrrrrrrrrrrrrr")
    if (error || !totalAccounts)
   
    // {
    // //  Utils.apiFailureToast("error")
    //  await setIsError("No record found")
    // }
    // await getListOffAddress({ skip: skip, limit: limit });
    // else{
      
   
  // else{
  //   await setgetListOfAddress(totalAccounts?.message)
    
  // }
   return;

  //  setAddressSearch("")
     
      
    // }
   

  
  }
  console.log(getListOfAddress,"jhbbbbbbbbbbbbbbbbbb")

  const logOut = () => {
    props.dispatch({ type: reduxEvent.LOGGED_OUT, data: null });
    sessionManager.removeDataFromLocalStorage("userInfo");
    sessionManager.removeDataFromLocalStorage("isLoggedIn");
    window.location.href = "/";

    // history.push("/");
  };

  const classes = useStyles();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    history.push("/");
  };
  const handleChangePassword = () => {
    window.location.href = "/change-password";
  };

  const handleEditClick = () => {
    // editWhitelistAddress();
    setEditClick(!editClick);
  };
  const { state,setDeleteDialogValue,setEditDialogValue } = props;
  const validateAddress = () => {
    if (
      (addressInput && addressInput.length > 40) ||
      addressInput.slice(0, 2) == "xdc"
    ) {
      editWhitelistAddress();
    } else if (!addressInput) {
      setEmailError("enter a valid Address");
    } else {
      setEmailError("Address should start with xdc & min 40 characters");
    }
  };
  const { useState, Fragment } = React;

  const handleToastClose=()=>{
    setOpen3(false)
  }
  const handleToastCloseEdit=()=>{
    setOpen4(false)
  }

  // The added element component
  const AddedElement = () => (
    <button
      onClick={() => {
        // setallowVoting(false);
        // setAddressInput("");
        // setProposal(false);
        validateAddress();
      }}
      // disabled={(!allowVoting && !proposal) || !addressInput}
      style={{ marginLeft: "12px" }}
      className={classes.addbtn}
      type="button"
    >
      Done
    </button>
  );

  // The parent component
  const [addressSearch, setAddressSearch] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isError, setIsError] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [Date, setDate] = React.useState();
  const [deleteMessage, setDeleteMessage] = useState("");
  const [editClick, setEditClick] = useState(false);
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
    // setStateValues({deleteDialog:false})
    setDeleteDialogValue(false)
  };
  const handleCancelClose = () => {
    setDialogOpen(false);
  };
  const handleDialog1 = () => {
    setDialogOpen1(true);
    setCount(0);
    setButtonText("Edit");
    setEditClick(false);
    setEditDialogValue(false)
  };
  const handleCancelClose1 = () => {
    setDialogOpen1(false);
  };
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
            <img
              className="header-logo"
              src={require("../../assets/styles/images/XDC-Icon-Logo.svg")}
            ></img>
          </span>
          <span className="common-span-header">
          <span className="voting-para">
            <p>Voting Address Manager</p>
            
            
          </span>
          <span>
          <input type="text" className="inputsearch" placeholder="Search Address" 
          // value={addressSearch}
          onChange={(e)=>{search(e)}}
          >
            
          </input>
          <img className="searchicon" src={require("../../assets/styles/images/Search.png")}></img>
          </span>
          </span>
          
          <span className="profile-icon">
            <div>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <img
                  className="profile-logo"
                  src={require("../../assets/styles/images/Profile-Logo.svg")}
                ></img>
              </Button>
              <Menu
                id="simple-menu-item"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={handleChangePassword}
                  className="menu-heading"
                  style={{ backgroundColor: "white" }}
                >
                  Change Password{" "}
                </MenuItem>
                <hr className="menu-line" />
                <MenuItem
                  onClick={() => {
                    logOut();
                  }}
                  className="menu-heading"
                  style={{ backgroundColor: "white" }}
                >
                  Log out
                </MenuItem>
              </Menu>
            </div>
          </span>
        </div>
      </div>
      <CustomizedSnackbars
        getListOffAddress={() =>
          getListOffAddress({ skip: skip, limit: limit })
        }
        addWhiteListAddress={props.addWhiteListAddress}
        state={props.state}
        setStateValues={props.setStateValues}
      />
      <div className="griddiv">
        <Grid lg={13} className="tablegrid_address">
          <Grid component={Paper} style={{ boxShadow: "0px 0px 0px 0px" }}>
            <Table
              className="table"
              aria-label="Whitelisted Addresses"
              // style={{ boxShadow: "0px 0px 0px 0px" }}
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{
                      border: "none",
                      paddingLeft: "4%",
                      fontWeight: "500",
                    }}
                    align="left"
                  >
                    <span className="tableheading">Address</span>
                  </TableCell>
                  <TableCell
                    style={{
                      border: "none",
                      paddingLeft: "0%",
                      fontWeight: "500",
                    }}
                    align="left"
                  >
                    <span className="tableheading">Added on</span>
                  </TableCell>
                  <TableCell
                    style={{
                      border: "none",
                      fontWeight: "500",
                    }}
                    align="left"
                  >
                    <span className="tableheading">Votes</span>
                  </TableCell>
                
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {filteredProducts.map((product)=>{ */}
                {getListOfAddress?.map((row, index) => {
                  return (
                    
                    // address={filteredData && filteredData.length ? filteredData : address}
                    <TableRow
                      style={
                        index % 2 !== 1
                          ? { background: "#f9f9f9" }
                          : { background: "white" }
                      }
                    >
                     
                      <TableCell
                        style={{ border: "none", paddingLeft: "4%" }}
                        margin-left="5px"
                        onClick={() => {
                          handleDialog1();
                          setDeleteMessage(row.address);
                          setAddressInput(row.address);
                          setDate(row.createdOn);
                          setallowVoting(row.permission.allowVoting);
                          setProposal(row.permission.allowProposalCreation);
                        }}
                      >
                        <a className="linkTable">
                          <Tooltip placement="top" title={row.address}>
                            <span className="tabledata">
                              {row.address ? row.address.substr(0, 13) : " "}...
                              {row.address
                                ? row.address.substr(row.address.length - 5, 5)
                                : ""}
                              {/* (row.address)}{" "} */}
                            </span>
                          </Tooltip>
                        </a>
                      </TableCell>

                      <TableCell
                        style={{ border: "none", paddingLeft: "0%" }}
                        align="left"
                        onClick={() => {
                          handleDialog1();
                          setDeleteMessage(row.address);
                          setAddressInput(row.address);
                          setallowVoting(row.permission.allowVoting);
                          setProposal(row.permission.allowProposalCreation);
                          setDate(row.createdOn);
                        }}
                      >
                        <span className="tablemiddata">
                          {" "}
                          {moment(row.createdOn).format("DD MMMM YYYY")}
                        </span>
                      </TableCell>
                      <TableCell
                        style={{ border: "none" }}
                        align="left"
                        onClick={() => {
                          handleDialog1();
                          setDeleteMessage(row.address);
                          setAddressInput(row.address);
                          setDate(row.createdOn);
                          setallowVoting(row.permission.allowVoting);
                          setProposal(row.permission.allowProposalCreation);
                        }}
                      >
                        <span className="tablemiddata">
                         
                          {row.votes.length}
                          {/* {(row.totalVotes = "null" ? 0 : row.totalVotes)} */}
                        </span>
                      </TableCell>
                      <TableCell
                        style={{ border: "none", paddingLeft: "4%" }}
                        align="left"
                      >
                        <a className="linkTable">
                          <span
                            className="tabledata"
                            onClick={() => {
                              handleDialog();
                              setDeleteMessage(row.address);
                              setAddressInput(row.address);
                              setDate(row.createdOn);
                              setallowVoting(row.permission.allowVoting);
                              setProposal(row.permission.allowProposalCreation);
                            }}
                          >
                            {" "}
                            Delete
                          </span>
                        </a>
                      </TableCell>
                    </TableRow>
                  );
                })

                // ) : (
                //   <div className="display-flex justify-content-center p-t-50">
                //     {" "}
                //    {"No record found"}
                //   </div>

                }
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </div>

      {/* ---------Delete Dialog Box----------- */}

      <div>
        {!state.deleteDialog?
        <>
        <Dialog
          className={classes.dialog}
          open={dialogOpen}
          divide
          aria-labelledby="form-dialog-title"
        >
          <Row>
            <DialogTitle id="form-dialog-title">
              <div className={classes.deleteheading}>Delete Address</div>
            </DialogTitle>
          </Row>
          <DialogContent>
            <DialogContentText className={classes.deletesubheading}>
              Do you want to delete this address{" "}
              <span className={classes.deleteaddress}>
                {deleteMessage ? deleteMessage.substr(0, 13) : " "}...
                {deleteMessage
                  ? deleteMessage.substr(deleteMessage.length - 5, 5)
                  : ""}
                {/* {(deleteMessage)} */}
              </span>
            </DialogContentText>
          </DialogContent>

          <DialogActions className={classes.buttons}>
            <span>
              <button className={classes.cnlbtn} onClick={handleCancelClose}>
                Cancel
              </button>
            </span>

            <span>
              <button
                className={classes.addbtn}
                onClick={() => {
                  deleteaddress(deleteMessage);
                }}
              >
                {" "}
                Delete{" "}
              </button>
            </span>
          </DialogActions>
        </Dialog>
        </>
        :
        <>
       <Dialog className={classes.dialog} open={dialogOpen} divide>
       {/* <Row> */}
            {/* <DialogTitle id="form-dialog-title">
              <div className={classes.deleteheading}>Deleting Address</div>
            </DialogTitle> */}
          {/* </Row> */}
          <DialogContent>
            <DialogContentText className={classes.deleteheading}>
            Deleting Address {" "}
              <span className={classes.deleteaddress}>
                {deleteMessage ? deleteMessage.substr(0, 13) : " "}...
                {deleteMessage
                  ? deleteMessage.substr(deleteMessage.length - 5, 5)
                  : ""}
                {/* {(deleteMessage)} */}
              </span>
            </DialogContentText>
          </DialogContent>
        <DialogContent>
           <img
           style={{width:"100px",height:"100px",display:"flex",justifyContent:"center",marginLeft:"120px",marginRight:"50px"}}
              // className="header-logo"
              src={require("../../assets/styles/images/loader-small.gif")}
            ></img>
            <DialogContentText className={classes.subCategory}>
              <div style={{fontSize:"15px",display:"flex",justifyContent:"center",color: "#2A2A2A",
    opacity: "1",
    fontFamily: "Inter",
    fontweight: "400",}}>Transaction is in Progress</div>
    
              
            </DialogContentText>
        </DialogContent>
      </Dialog>
      </>
}
      </div>

      {/* ------Delete Toast Message----- */}

      <Snackbar
        open={open3}
        // autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleClose3}
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
                style={{ height: "30px", width: "30px", marginTop: "10px" }}
                src={require("../../assets/styles/images/DONE.svg")}
              ></img>
            </span>
            <span>
              <div className="toast-message">
              <span>
                You have successfully deleted address
                </span>
                <span onClick={handleToastClose} style={{float:"right",cursor:"pointer",marginTop:"-8px"}}>
                  X
                </span>
              </div>
              <div className="toast-address">{deleteMessage}</div>
            </span>
          </div>
        </Alert>
      </Snackbar>

      {/* --------Edit Toast Message--------- */}

      <Snackbar
        open={open4}
        // autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleClose4}
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
                style={{ height: "30px", width: "30px", marginTop: "10px" }}
                src={require("../../assets/styles/images/DONE.svg")}
              ></img>
            </span>
            <span>
              <div className="toast-message">
              <span>
                You have successfully edited address
                </span>
                <span onClick={handleToastCloseEdit} style={{float:"right",cursor:"pointer",marginTop:"-8px"}}>
                  X
                </span>
              </div>
              <div className="toast-address">{deleteMessage}</div>
            </span>
          </div>
        </Alert>
      </Snackbar>

      {/* -----------Edit Dialog Box------------ */}
      <div>
      {!state.editDialog?
        <>
        <Dialog
          className={classes.dialog}
          open={dialogOpen1}
          divide
          onClose={handleCancelClose1}
          aria-labelledby="form-dialog-title"
        >
          <Row>
            <DialogTitle id="form-dialog-title">
              <div className="editheading">Address</div>
            </DialogTitle>
          </Row>
          <DialogContent className="editdialogdiv">
            <input
              className="editinput"
              value={addressInput}
              onChange={(e) => {
                setAddressInput(e.target.value);
                setEmailError("");
              }}
              disabled={!editClick}
            ></input>
            <div
              style={{ marginLeft: "5px", color: "red", marginBottom: "-2px" }}
            >
              {emailError}
            </div>
            <DialogContentText className={classes.addedon}>
              <span>
                Added on: <span>{moment(Date).format("DD MMMM YYYY")}</span>
              </span>
            </DialogContentText>
          </DialogContent>

          <div className="checked-upper">
            <div
              className="custom-check1"
              onClick={() => {
                if (editClick) setallowVoting(!allowVoting);
              }}
              value={allowVoting}
              className={
                !allowVoting ? "custom-check1edit" : "custom-check1-edit-active"
              }
              //  className={`${!allowVoting ? "custom-check1edit" : "custom-check1-edit-active"} ${editClick?"custom-check1":"custom-check1-active"}`}
              // className={allowVoting ? (editClick?"custom-check1":"custom-check1-edit-active" ): (editClick?"custom-check1edit":"custom-check1-active")}
            ></div>

            <span className="checkbox-heading">Allow Voting</span>
          </div>

          <div className="checked-down">
            <div
              className="custom-check1"
              onClick={() => {
                if (editClick) setProposal(!proposal);
              }}
              value={proposal}
              className={
                !proposal ? "custom-check1edit" : "custom-check1-edit-active"
              }

              // className={`${!proposal ? "custom-check1edit" : "custom-check1-edit-active"} ${editClick?"custom-check1":"custom-check1-active"}`}
              // className={proposal ? (editClick?"custom-check1-edit-active":"custom-check1edit" ): (editClick?"custom-check1-active":"custom-check1")}
            ></div>

            <span className="checkbox-heading">Allow Proposal Creation</span>
          </div>

          <DialogActions className={classes.buttons1}>
            <Fragment>
              <button
                onClick={() => {
                  if (count === 1) {
                    handleCancelClose1();
                    setEmailError("");
                  } else {
                    setCount(1);
                    setButtonText("Cancel");
                    handleEditClick();
                    setEmailError("");
                  }
                }}
                className={count === 1 ? classes.cnlbtn : classes.addbtn}
              >
                {buttonText}
              </button>
              {[...Array(count)].map((_, i) => (
                <AddedElement key={i} />
              ))}
            </Fragment>
          </DialogActions>
        </Dialog>
        </>
        :
        <>
       <Dialog className={classes.dialog} open={dialogOpen1} divide>
       {/* <Row> */}
            {/* <DialogTitle id="form-dialog-title">
              <div className={classes.deleteheading}>Deleting Address</div>
            </DialogTitle> */}
          {/* </Row> */}
          <DialogContent>
          <DialogContentText className={classes.deleteheading}>
            Editing Address {" "}
              <span className={classes.deleteaddress}>
                {addressInput ? addressInput.substr(0, 13) : " "}...
                {addressInput
                  ? addressInput.substr(addressInput.length - 5, 5)
                  : ""}
                {/* {(deleteMessage)} */}
              </span>
            </DialogContentText>
          </DialogContent>
        <DialogContent>
           <img
           style={{width:"100px",height:"100px",display:"flex",justifyContent:"center",marginLeft:"120px",marginRight:"50px"}}
              // className="header-logo"
              src={require("../../assets/styles/images/loader-small.gif")}
            ></img>
            <DialogContentText className={classes.subCategory}>
              <div style={{fontSize:"15px",display:"flex",justifyContent:"center",color: "#2A2A2A",
    opacity: "1",
    fontFamily: "Inter",
    fontweight: "400",}}>Transaction is in Progress</div>
    
              
            </DialogContentText>
        </DialogContent>
      </Dialog>
        </>
}
      </div>

      {/* ---------Pagination--------- */}

      <div className="pagination-div">
        {/* <PaginationRounded /> */}
        <div className={classes.root}>
          <div className="paging">
            <Pagination
              onChange={pagination}
              count={Math.ceil(pagecount / 10)}
              // count={20}
              shape="rounded"
              siblingCount={0}
              color="primary"
              size="small"
            />
          </div>
        </div>
      </div>

      <div style={{ height: "50px" }}></div>
    </div>
  );
}

export default connect(null)(DashboardComponent);
