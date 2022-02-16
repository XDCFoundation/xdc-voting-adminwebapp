import React, {useEffect, useRef} from "react";
import {Row} from "simple-flexbox";
import {Button} from "@material-ui/core";
import {history} from "../../managers/history";
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
import {Tooltip} from "@material-ui/core";
import CustomizedSnackbars from "./DemoForm";
import "../../assets/styles/custom.css";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {makeStyles, useTheme} from "@material-ui/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {EditService, Logout} from "../../services";
import {DeleteService} from "../../services";
import {AccountService} from "../../services";
import {SearchService} from "../../services";
import Utils from "../../utility";
import moment from "moment";
import Web3 from "web3";
import {connect} from "react-redux";
import {sessionManager} from "../../managers/sessionManager";
import {envConstant, reduxEvent} from "../../constants";
import Pagination from "@material-ui/lab/Pagination";
import Jazzicon from "react-jazzicon";
import CloseIcon from "@material-ui/icons/Close";
import clsx from "clsx";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";

import Web3Dialog from "./mainDialog";
import Header from "./header";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  Alert: {
    backgroundColor: "#ffffff !important",
  },
  dialog: {
    marginLeft: "26%",
    marginTop: "38px",
    width: "55% !important",
    height: "50% !important",
    borderRadius: "80px !important",
  },
  buttons: {
    "& #Add": {
      marginTop:"20px",
    },
    padding: "1px 35px 10px 0px",
    // marginTop: "-4px",

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
  deleteconfirmation: {
    // width: "404px"  height: "62px",,
    width: "100%",
    height: "100%",
    background: "#FDE9E9 0% 0% no-repeat padding-box",
    borderRadius: "4px",
    textAlign: "center",
    /* font: normal normal normal 14px/22px Inter; */
    letterSpacing: "0px",
    color: "#EB4444",
    opacity: "1",
    fontSize: "14px",
    fontFamily: "Inter",
    padding: "12px 36px 11px 35px",
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
        marginTop: "-8px",
        marginBottom: "-2px",
        // marginBottom: "0px",
        border: "none !important",
        color: "#9FA9BA",
        letterSpacing: "0px",

    fontWeight: "500",
    fontSize: "15px",
    fontFamily: "Inter",
  },
  addedon: {
    color: "#9FA9BA",
    /* border: none !important; */
    fontSize: "14px",
    marginTop: "10px",
    /* font-family: unset; */
    /* font-weight: 500; */
    marginBottom: "0px",
    letterSpacing: "0px",
    marginLeft: "3px",
    fontFamily: "Inter,sans-serif",
  },
  deleteheading: {
    letterSpacing: "0px",
    color: "#2A2A2A",
    opacity: "1",
    fontSize: "18px",
    fontFamily: "Inter,sans-serif",
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
    marginTop:"22.5px"
  },
  deletesubheading: {
    marginBottom: "0px",
    letterSpacing: "0px",
    opacity: "1",
    fontSize: "14px",
    color: "#2A2A2A",
    fontWeight: "600",
    fontFamily: "Inter,sans-serif",
  },
  deleteaddress: {
    color: "#3763DD",
    letterSpacing: "0px",
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
  mainheading: {
    letterSpacing: "0px",
    color: " #2A2A2A",
    opacity: "1",
    fontSize: "18px",
    fontFamily: "Inter,sans-sarif",
    fontWeight: "600",
  },
  list: {
    width: "336px",
    backgroundColor: "#102e84",
    height: "100%",
  },
  fullList: {
    width: "auto",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    overflow: "hidden",
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#102e84",
    overflow: "hidden",
  },
  drawerHeader: {
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    // padding: theme.spacing(0, 1),
    // ...theme.mixins.toolbar,
    justifyContent: "flex-start",
    marginTop: "-12px",
  },
  firstContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "19px",
  },
}));

function DashboardComponent(props) {
    const theme = useTheme();
    const [getListOfAddress, setgetListOfAddress] = React.useState([]);
    const [pageNumber, setPageNumber] = React.useState();
    const [pagecount, setPagecount] = React.useState(0);

    const [skip, setSkip] = React.useState(0);
    const [limit, setLimit] = React.useState(10);
    // const { state }=props;

    const pagination = async (event, value) => {
        await getListOffAddress({skip: (value - 1) * 10, limit: limit});
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
        await getListOffAddress({skip: skip, limit: limit});
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

        await getListOffAddress({skip: skip, limit: limit});
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
        await getListOffAddress({skip: skip, limit: limit});
        handleCloseDailog1();
    };

    const search = async (e) => {
        // setAddressSearch(e.target.value);

        setAddressSearch(e.target.value)
        console.log(addressSearch, "address of input");
        const reqObj = {
            address: e.target.value,
            skip: skip,
            limit: limit,
        };
        // await props.searchaddress(reqObj);
        let [error, totalAccounts] = await Utils.parseResponse(
            SearchService.searchaddress(reqObj)
        );
        await setgetListOfAddress(totalAccounts?.searchData);
        // await getListOffAddress({ skip: skip, limit: limit });
        //  await setIsError("No record Found")
        if (error || !totalAccounts)
            return;
    };

    const crossSearch = () => {
        setAddressSearch("")
    }
    const inputEl = useRef(null);
    const onButtonClick = () => {
        // @ts-ignore (us this comment if typescript raises an error)
        search({address: inputEl.current.value = ""})
    };
    const logOut = () => {
        props.dispatch({type: reduxEvent.LOGGED_OUT, data: null});
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
    const {
        state,
        setDeleteDialogValue,
        setEditDialogValue,
        setDeleteConfirmDialogStateValues,
        setEditConfirmDialogStateValues,
        setDialogOpen,
        stateSetDialogOpen,
        setDialogOpen1,
        stateSetDialogOpen1,

    } = props;
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
    const {useState, Fragment} = React;

    const handleToastClose = () => {
        setOpen3(false);
    };
    const handleToastCloseEdit = () => {
        setOpen4(false);
    };

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
            style={{marginLeft: "12px"}}
            className={classes.addbtn}
            type="button"
        >
            Done
        </button>
    );

    const [inputColor, setInputColor] = useState(0);
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
    // const [dialogOpen, setDialogOpen] = React.useState(false);
    // const [dialogOpen1, setDialogOpen1] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const [open4, setOpen4] = React.useState(false);
    const handleDialog = () => {
        stateSetDialogOpen(true);
        // setStateValues({deleteDialog:false})
        setDeleteDialogValue(false);
        setDeleteConfirmDialogStateValues(false);
    };
    const handleCancelClose = () => {
        stateSetDialogOpen(false);
    };
    const handleDialog1 = () => {
        setEditConfirmDialogStateValues(false);
        stateSetDialogOpen1(true);
        setCount(0);
        setButtonText("Edit");
        setEditClick(false);
        setEditDialogValue(false);
        setInputColor(0);
    };
    const handleCancelClose1 = () => {
        stateSetDialogOpen1(false);
    };
    const handleCloseDailog = () => {
        setDeleteConfirmDialogStateValues(true);
        // setDialogOpen(false);
        // setOpen3(true);
    };
    const closeDeleteDialog = () => {
        stateSetDialogOpen(false);
        setOpen3(true);
    };
    const handleCloseDailog1 = () => {
        // setDialogOpen1(false);
        // setOpen4(true);
        setEditConfirmDialogStateValues(true);
    };
    const closeEditDialog = () => {
        stateSetDialogOpen1(false);
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

    // ***************************Humburger Function********************************

    const [state1, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState({...state1, [anchor]: open});
    };
    const list = ["Accounts", "Contract", "Tools", "XDC Apis", "Nodes", "Tokens"];
    // const list = (anchor) => (
    //   <div
    //     sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
    //     role="presentation"
    //     onClick={toggleDrawer(anchor, false)}
    //     onKeyDown={toggleDrawer(anchor, false)}
    //   >
    //     <List>
    //       {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
    //         <ListItem button key={text}>
    //           <ListItemIcon>
    //             {index % 2 === 0 ? "<InboxIcon />" : "<InboxIcon />"}
    //           </ListItemIcon>
    //           <ListItemText primary={text} />
    //         </ListItem>
    //       ))}
    //     </List>

    //     <List>
    //       {['All mail', 'Trash', 'Spam'].map((text, index) => (
    //         <ListItem button key={text}>
    //           <ListItemIcon>
    //             {index % 2 === 0 ? "<InboxIcon />" : "<InboxIcon />"}
    //           </ListItemIcon>
    //           <ListItemText primary={text} />
    //         </ListItem>
    //       ))}
    //     </List>
    //   </div>
    // );

    const lists = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === "top" || anchor === "bottom",
            })}
            role="presentation"
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <div className={classes.firstContainer}>
                <p className="inside-side-box-browse">Browse</p>
                <div className={classes.drawerHeader}>
                    <IconButton
                        style={{color: "white"}}
                        onClick={toggleDrawer(anchor, false)}
                    >
                        <CloseIcon/>
                    </IconButton>
                </div>
            </div>

            <List className="side-box">
                <ul className="inside-side-box">
                    <a href="https://observer.xdc.org/" target="_blank">
                        <p className="xinfin_api_button" style={{cursor: "pointer"}}>
                            {" "}
                            XDC Observatory{" "}
                            <span className="side-arrow-contract-tab">
                <i class="fa fa-angle-right" aria-hidden="true"></i>
              </span>
                        </p>
                    </a>
                    <hr className="myhr"/>
                </ul>

                <ul className="inside-side-box">
                    <a href="https://stats.xdc.org/" target="_blank">
                        <p className="xinfin_api_button" style={{cursor: "pointer"}}>
                            XDC Network Stats{" "}
                            <span className="right-arrow-side-bar">
                <i class="fa fa-angle-right" aria-hidden="true"></i>
              </span>
                        </p>
                    </a>
                    <hr className="myhr"/>
                </ul>
                <ul className="inside-side-box">
                    <a href="http://betagovernance.xdcroadmap.net/" target="_blank">
                        {" "}
                        <p className="xinfin_api_button" style={{cursor: "pointer"}}>
                            XDC Governance Portal
                        </p>{" "}
                    </a>
                    <hr className="myhr"/>
                </ul>
                <ul className="inside-side-box">
                    <a
                        href="https://chrome.google.com/webstore/detail/xdcpay/bocpokimicclpaiekenaeelehdjllofo"
                        target="_blank"
                    >
                        <p className="xinfin_api_button" style={{cursor: "pointer"}}>
                            XDCPay
                        </p>
                    </a>
                    <hr className="myhr"/>
                </ul>
                <ul className="inside-side-box">
                    <a href="https://github.com/xdcfoundation" target="_blank">
                        <p className="xinfin_api_button" style={{cursor: "pointer"}}>
                            XDC Github
                        </p>
                    </a>
                    <hr className="myhr"/>
                </ul>
                <ul className="inside-side-box">
                    <a href="https://xdcroadmap.org/" target="_blank">
                        <p className="xinfin_api_button" style={{cursor: "pointer"}}>
                            XDC Roadmap
                        </p>
                    </a>
                    <hr className="myhr"/>
                </ul>
                <ul className="inside-side-box">
                    <a
                        href="https://medium.com/xdc-foundation-communications"
                        target="_blank"
                        className="account_details_button"
                    >
                        <div
                            style={{cursor: "pointer"}}
                            className="xinfin_account_button"
                        >
                            About XDC
                        </div>
                    </a>
                    <hr className="myhr"/>
                </ul>
            </List>
        </div>


    );

    const [wallet, setwallet] = useState("");
    console.log(wallet, "dashboard wallet value")
    useEffect(() => {
        // var body = document.querySelector('body')
        // for(var i = 0; i < 60; i++) {
        //   var el = jazzicon(100, Math.round(Math.random() * 10000000))
        //   console.log("dsjfkksdgfkjhjldsf ",el)
        //   body.appendChild(el)
        // }


        if (window.ethereum) {
            //the error line
            window.web3 = new Web3(window.ethereum);

            try {
                window.ethereum.enable();

                let web3;
                web3 = new Web3(window.web3.currentProvider);
                console.log("+++", web3);
                window.ethereum.enable();
                const accounts = web3.eth.getAccounts().then((accounts) => {
                    let superadmin = envConstant.ADMIN_ADDRESS//"xdc2ecc3f6943e5ba3b077f5121bddaccf2a761fdba";
                    if (!accounts || !accounts.length) {
                        console.log("please login");
                        // Utils.apiFailureToast("error");
                        return;
                    }

                    if (superadmin.replace("xdc", "0x").toLocaleLowerCase() == accounts[0].toLowerCase()) {
                        setwallet(accounts[0]);


                    }
                    console.log(accounts[0]);
                    // setwallet(accounts[0]);

                    // fetchData(accounts[0]);
                });
            } catch (err) {
                alert("Something went wrong.");
            }
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
            let web3;
            web3 = new Web3(window.web3.currentProvider);
            console.log("+++", web3);
            window.ethereum.enable();

            const accounts = web3.eth.getAccounts().then((accounts) => {
                if (!accounts || !accounts.length) {
                    console.log("please login");
                    // Utils.apiFailureToast("Wallet is not connected");
                    return;
                }
                console.log(accounts[0], "type");
                setwallet(accounts[0]);
                // fetchData(accounts[0]);
            });
        } else {
            // Utils.apiFailureToast("Please install XDCPay extension");
        }
    }, []);


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
              <p>XDC Governance</p>
            </span>
            <span>
              <input
                  type="text"

                  className="inputsearch"
                  placeholder="Search Address"
                  // value={addressSearch}
                  onChange={(e) => {
                      search(e);
                  }}
              ></input>
              
              <img
                  className="searchicon"
                  src={require("../../assets/styles/images/Search.png")}
              ></img>
             
            </span>
          </span>

                    <span className="profile-icon">
            <div style={{display: "flex"}}>
              {/* <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              > */}
                {/* <img
                  className="profile-logo"
                  src={require("../../assets/styles/images/Profile-Logo.svg")}
                ></img> */}
                {/* <button className="connect-wallet"> */}
                <div>
                <Header state={props.state} wallet={props.wallet}/>
              </div>
                {/* <div className="tab-dialog"> <TabDialogFunction/> </div> */}
                <Web3Dialog wallet={wallet}/>
                {/* </button> */}
                <div style={{marginLeft: "16px", marginRight: "22px"}}>
                <span>
                  <React.Fragment className="rigt-line" key={"right"}>
                    <IconButton
                        className="hamburger-icon"
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        onClick={toggleDrawer("right", true)}
                    >
                      <img style={{marginTop: '5px'}} src={"/images/Menu.svg"}></img>
                        {/* <MenuIcon /> */}
                    </IconButton>

                    <Drawer
                        className={classes.drawer}
                        anchor={"right"}
                        open={state1["right"]}
                    >
                      {lists("right")}
                    </Drawer>
                  </React.Fragment>
                </span>{" "}
              </div>
                {/* </Button> */}
                {/* <Menu
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
              </Menu> */}
            </div>
          </span>
        </div>
      </div>
      <CustomizedSnackbars
        getListOffAddress={() =>
          getListOffAddress({ skip: skip, limit: limit })
        }
        getListOfAddress={getListOfAddress}
        wallet={wallet}
        addWhiteListAddress={props.addWhiteListAddress}
        state={props.state}
        setStateValues={props.setStateValues}
        setConfirmDialogStateValues={props.setConfirmDialogStateValues}
        setAddDialogOpen={props.setAddDialogOpen}
        stateAddSetDialogOpen={props.stateAddSetDialogOpen}
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
                      // paddingBottom:"1%"
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
                      // paddingBottom:"1%"
                    }}
                    align="left"
                  >
                    <span className="tableheading">Added on</span>
                  </TableCell>
                  <TableCell
                    style={{
                      border: "none",
                      paddingLeft: "0%",
                      fontWeight: "500",
                      // paddingBottom:"1%"
                    }}
                    align="left"
                  >
                    <span className="tableheading">Can Vote</span>
                  </TableCell>
                  <TableCell
                    style={{
                      border: "none",
                      paddingLeft: "2%",
                      fontWeight: "500",
                      // paddingBottom:"1%"
                    }}
                    align="left"
                  >
                    <span className="tableheading">Can Create Proposal</span>
                  </TableCell>
                  <TableCell
                    style={{
                      border: "none",
                      fontWeight: "500",
                      // paddingBottom:"1%"
                    }}
                    align="left"
                  >
                    <span className="tableheading">Votes</span>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {filteredProducts.map((product)=>{ */}
                {getListOfAddress?.length > 0 ? (
                  getListOfAddress?.map((row, index) => {
                    return (
                      // address={filteredData && filteredData.length ? filteredData : address}
                      //  getListOfAddress && getListOfAddress.length>0?(
                      <TableRow
                        style={
                          index % 2 !== 1
                            // ? { background: "#f9f9f9" }
                            ? { background: "rgba(250,250,250,1)" }
                            : { background: "white" }
                        }
                      >
                        <TableCell
                          style={{ 
                            border: "none",
                              paddingLeft: "3.2%"
                            //  paddingLeft: "4%"
                           }}
                          margin-left="5px"
                          // onClick={() => {
                          //   handleDialog1();
                          //   setDeleteMessage(row.address);
                          //   setAddressInput(row.address);
                          //   setDate(row.createdOn);
                          //   setallowVoting(row.permission.allowVoting);
                          //   setProposal(row.permission.allowProposalCreation);
                          // }}
                        >
                          <a className="linkTable">
                            {/* <div><Jazzicon  diameter={20} seed={Math.round(Math.random() * 10000000)}/></div> */}
                            <span>
                              <Jazzicon
                                  diameter={20}
                                  seed={Math.round(Math.random() * 10000000)}
                              />
                            </span>{" "}
                                                        &nbsp;
                                                        <Tooltip placement="top" title={row.address}>
                              <span className="tabledata">
                                <span>
                                  {row.address
                                      ? row.address.substr(0, 13)
                                      : " "}
                                    ...
                                    {row.address
                                        ? row.address.substr(
                                            row.address.length - 5,
                                            5
                                        )
                                        : ""}
                                </span>
                                  {/* (row.address)}{" "} */}
                              </span>
                                                        </Tooltip>
                                                    </a>
                                                </TableCell>

                                                <TableCell
                                                    style={{border: "none", paddingLeft: "0%"}}
                                                    align="left"
                                                    // onClick={() => {
                                                    //   handleDialog1();
                                                    //   setDeleteMessage(row.address);
                                                    //   setAddressInput(row.address);
                                                    //   setallowVoting(row.permission.allowVoting);
                                                    //   setProposal(row.permission.allowProposalCreation);
                                                    //   setDate(row.createdOn);
                                                    // }}
                                                >
                          <span className="tablemiddata">
                            {" "}
                              {moment(row.createdOn).format("DD MMMM YYYY")}
                          </span>
                                                </TableCell>
                                                <TableCell
                                                    style={{border: "none", paddingLeft: "0%"}}
                                                    align="left"
                                                    // onClick={() => {
                                                    //   handleDialog1();
                                                    //   setDeleteMessage(row.address);
                                                    //   setAddressInput(row.address);
                                                    //   setDate(row.createdOn);
                                                    //   setallowVoting(row.permission.allowVoting);
                                                    //   setProposal(row.permission.allowProposalCreation);
                                                    // }}
                                                >
                          <span
                              className={
                                  row.permission.allowVoting
                                      ? "permission-yes"
                                      : "permission-no"
                              }
                          >
                            {row.permission.allowVoting ? "Yes" : "No"}

                              {/* {(row.totalVotes = "null" ? 0 : row.totalVotes)} */}
                          </span>
                                                </TableCell>
                                                <TableCell
                                                    style={{border: "none", paddingLeft: "2%"}}
                                                    align="left"
                                                    // onClick={() => {
                                                    //   handleDialog1();
                                                    //   setDeleteMessage(row.address);
                                                    //   setAddressInput(row.address);
                                                    //   setDate(row.createdOn);
                                                    //   setallowVoting(row.permission.allowVoting);
                                                    //   setProposal(row.permission.allowProposalCreation);
                                                    // }}
                                                >
                          <span
                              className={
                                  row.permission.allowProposalCreation
                                      ? "permission-yes"
                                      : "permission-no"
                              }
                          >
                            {row.permission.allowProposalCreation
                                ? "Yes"
                                : "No"}

                              {/* {(row.totalVotes = "null" ? 0 : row.totalVotes)} */}
                          </span>
                                                </TableCell>
                                                <TableCell
                                                    style={{border: "none"}}
                                                    align="left"
                                                    // onClick={() => {
                                                    //   handleDialog1();
                                                    //   setDeleteMessage(row.address);
                                                    //   setAddressInput(row.address);
                                                    //   setDate(row.createdOn);
                                                    //   setallowVoting(row.permission.allowVoting);
                                                    //   setProposal(row.permission.allowProposalCreation);
                                                    // }}
                                                >
                          <span className="tablemiddata">
                            {row.votes.length}
                              {/* {(row.totalVotes = "null" ? 0 : row.totalVotes)} */}
                          </span>
                                                </TableCell>
                                                <TableCell
                                                    style={{border: "none", paddingLeft: "0%", padding: "0.5rem"}}
                                                    align="left"
                                                >
                                                    <a className="linkTable">
                            <span
                                className="tabledata"

                                onClick={() => {
                                    handleDialog1();
                                    setDeleteMessage(row.address);
                                    setAddressInput(row.address);
                                    setDate(row.createdOn);
                                    setallowVoting(row.permission.allowVoting);
                                    setProposal(
                                        row.permission.allowProposalCreation
                                    );
                                }}
                            >
                              {" "}
                                {wallet ?
                                    <img
                                        className="edit-icon"
                                        src={require("../../assets/styles/images/edit.svg")}
                                    ></img> : ""}
                            </span>
                                                    </a>
                                                </TableCell>
                                                <TableCell
                                                    style={{border: "none", paddingLeft: "0%"}}
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
                                    setProposal(
                                        row.permission.allowProposalCreation
                                    );
                                }}
                            >
                              {" "}
                                {wallet ?
                                    <img
                                        className="delete-icon"
                                        src={require("../../assets/styles/images/delete.svg")}
                                    ></img> : ""}
                            </span>
                                                    </a>
                                                </TableCell>
                                            </TableRow>
                                            // ):(
                                            //   <TableRow style={
                                            //     index % 2 !== 1
                                            //       ? { background: "#f9f9f9" }
                                            //       : { background: "white" }
                                            //   }>
                                            //     <TableCell style={{justifyContent:"center",display:"flex",width:"100%",backgroundColor:"black"}}>{"message"}</TableCell>
                                            //     </TableRow>
                                            // )
                                        );
                                    })
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            style={{
                                                border: "none",
                                                paddingLeft: "4%",
                                                fontWeight: "500",
                                            }}
                                            align="left"
                                        >
                                            <span></span>
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                border: "none",
                                                paddingLeft: "0%",
                                                fontWeight: "500",
                                            }}
                                            align="center"
                                        >
                                            <span></span>
                                            {/* <div className="display-flex justify-content-center p-t-50"> */}

                                            {/* </div> */}
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                border: "none",
                                                paddingLeft: "10%",
                                                fontWeight: "500",
                                                font: "normal normal 600 14px/17px Inter",
                                                letterSpacing: "0px",
                                                color: "#D5DAEA",
                                                opacity: "1",
                                                paddingTop: "136px",
                                                paddingBottom: "93px",
                                            }}
                                            align="center"
                                        >
                                            <div>
                                                <img
                                                    className="noaddress-icon"
                                                    src={require("../../assets/styles/images/no address found.svg")}
                                                ></img>
                                            </div>
                                            <span>No Record found</span>

                                            {/* <div className="display-flex justify-content-center p-t-50"> */}

                                            {/* </div> */}
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                border: "none",
                                                paddingLeft: "0%",
                                                fontWeight: "500",
                                            }}
                                            align="center"
                                        >
                                            <span></span>
                                            {/* <div className="display-flex justify-content-center p-t-50"> */}

                                            {/* </div> */}
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                border: "none",
                                                fontWeight: "500",
                                            }}
                                            align="left"
                                        >
                                            <span></span>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
            </div>

            {/* ---------Delete Dialog Box----------- */}

            <div>
                {!state.deleteDialog ? (
                    <>
                        <Dialog
                            className={classes.dialog}
                            open={state.setDialogOpen}
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
                  </span>{" "}
                                    ?
                                </DialogContentText>
                            </DialogContent>

                            <DialogContent>
                                <DialogContentText className={classes.deleteconfirmation}>
                                    Once an address is deleted, it cannot be readded. It is a permanent removal.
                                </DialogContentText>
                            </DialogContent>

                            <DialogActions className={classes.buttons}>
                <span>
                  <button
                      className={classes.cnlbtn}
                      onClick={handleCancelClose}
                  >
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
                ) : !state.deleteConfirmDialog ? (
                    <>
                        <Dialog className={classes.dialog} open={state.setDialogOpen} divide>
                            <DialogTitle className={classes.heading} id="form-dialog-title">
                                <div className={classes.mainheading}>
                                    Deleting address<span className="cross-loader">X</span>
                                </div>
                                {" "}
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
                                <div style={{marginTop: "-25px"}}>
                                    {" "}
                                    <div className="loader-spin"></div>
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
                                        Deleting your address
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
                        <Dialog className={classes.dialog} open={state.setDialogOpen} divide>
                            <DialogTitle className={classes.heading} id="form-dialog-title">
                                <div className={classes.mainheading}>
                                    Deleting address
                                    <span onClick={closeDeleteDialog} className="cross-loader">
                    X
                  </span>
                                </div>
                                {" "}
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
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        marginTop: "-20px",
                                    }}
                                >
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
            </div>

            {/* ------Delete Toast Message----- */}

            <Snackbar
                open={open3}
                autoHideDuration={3000}
                anchorOrigin={{vertical: "top", horizontal: "center"}}
                onClose={handleClose3}
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
                  src={require("../../assets/styles/images/confirm done.svg")}
              ></img>
            </span>
                        <span>
              <div className="toast-message">
                <span>You have successfully deleted address</span>
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
                            {/* <div className="toast-address">{deleteMessage}</div> */}
            </span>
                    </div>
                </Alert>
            </Snackbar>

            {/* --------Edit Toast Message--------- */}

            <Snackbar
                open={open4}
                autoHideDuration={3000}
                anchorOrigin={{vertical: "top", horizontal: "center"}}
                onClose={handleClose4}
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
                  src={require("../../assets/styles/images/confirm done.svg")}
              ></img>
            </span>
                        <span>
              <div className="toast-message">
                <span>You have successfully edited address</span>
                  {/* <span
                  onClick={handleToastCloseEdit}
                  style={{
                    float: "right",
                    cursor: "pointer",
                    marginTop: "-8px",
                  }}
                >
                  X
                </span> */}
              </div>
                            {/* <div className="toast-address">{deleteMessage}</div> */}
            </span>
                    </div>
                </Alert>
            </Snackbar>

      {/* -----------Edit Dialog Box------------ */}
      <div>
        {!state.editDialog ? (
          <>
            <Dialog
              className={classes.dialog}
              open={state.setDialogOpen1}
              divide
              onClose={handleCancelClose1}
              aria-labelledby="form-dialog-title"
            >
              <Row style={{ marginBottom: "10px" }}>
                <DialogTitle className={classes.heading} id="form-dialog-title">
                  <div className={classes.mainheading}>Add a New Address</div>{" "}
                </DialogTitle>
              </Row>
              <DialogContent
                style={{ marginTop: "-25px", marginBottom: "8px" }}
              >
                <DialogContentText className={classes.subCategory}>
                  <div className={classes.subheading}>Address</div>
                </DialogContentText>
                <div
                  // className={!inputColor?"editinput":"btnclick"}
                  className="editinput"
                  // onChange={(e) => {
                  //   setAddressInput(e.target.value);
                  //   setEmailError("");
                  // }}
                  disabled="true"
                >
                  <span style={{ fontSize: "15px" }}>
                    {addressInput ? addressInput.substr(0, 13) : " "}...
                      {addressInput
                          ? addressInput.substr(addressInput.length - 5, 5)
                          : ""}
                  </span>

                                    <span
                                        style={{
                                            color: "#92A5DD",
                                            fontSize: "12px",
                                            paddingTop: "3px",
                                        }}
                                    >
                    Added on: <span>{moment(Date).format("DD MMMM YYYY")}</span>
                  </span>
                                </div>
                                {/* <input
                className="addinput"
                type="text"
                required="true"
                placeholder="Write address"
                // value={addAddress}
                onChange={(e) => {
                  // setAddAddress(e.target.value);
                  setEmailError("");
                }}
                // value={addAddress}
              ></input> */}
                                {/* <div
                  style={{
                    marginLeft: "5px",
                    color: "red",
                   
                  }}
                >
                  {emailError}
                </div> */}
                                {/* <DialogContentText className={classes.addedon}>
                  
                </DialogContentText> */}
                            </DialogContent>

                            <div className="checked-upper">
                                <div
                                    className="custom-check1"
                                    onClick={() => {
                                        setallowVoting(!allowVoting);
                                    }}
                                    value={allowVoting}
                                    className={
                                        !allowVoting
                                            ? "custom-check1edit"
                                            : !inputColor
                                                ? "custom-check1-edit-active"
                                                : "custom-check1-active"
                                    }
                                    //  className={`${!allowVoting ? "custom-check1edit" : "custom-check1-edit-active"} ${editClick?"custom-check1":"custom-check1-active"}`}
                                    // className={allowVoting ? (editClick?"custom-check1":"custom-check1-edit-active" ): (editClick?"custom-check1edit":"custom-check1-active")}
                                ></div>

                                <span className="checkbox-heading">
                  <div>Allow Voting</div>
                  <div className="checkbox-des">
                  By selecting this, you are permitting the address to cast a vote
                  </div>
                </span>
                            </div>

                            <div className="checked-down">
                                <div
                                    className="custom-check1"
                                    onClick={() => {
                                        setProposal(!proposal);
                                    }}
                                    value={proposal}
                                    className={
                                        !proposal
                                            ? "custom-check1edit"
                                            : !inputColor
                                                ? "custom-check1-edit-active"
                                                : "custom-check1-active"
                                    }

                                    // className={`${!proposal ? "custom-check1edit" : "custom-check1-edit-active"} ${editClick?"custom-check1":"custom-check1-active"}`}
                                    // className={proposal ? (editClick?"custom-check1-edit-active":"custom-check1edit" ): (editClick?"custom-check1-active":"custom-check1")}
                                ></div>

                                <span className="checkbox-heading">
                  <div>Allow Proposal Creation</div>
                  <div className="checkbox-des">
                  By selecting this, you are permitting the address to create a proposal
                  </div>
                </span>
                            </div>

                            <DialogActions className={classes.buttons} >
                <span id="Add">
                  <button
                      className={classes.cnlbtn}
                      onClick={handleCancelClose1}
                  >
                    Cancel
                  </button>
                </span>
                                <span id="Add">
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
                      Done
                    </button>
                  </div>
                </span>
                            </DialogActions>

                            {/* <DialogActions className={classes.buttons1}>
                <Fragment>
                  <button
                    onClick={() => {
                      if (count === 1) {
                        handleCancelClose1();
                        setEmailError("");
                      } 
                      else if(inputColor===1){
                        setInputColor(0);
                      }
                      else {
                        setCount(1);
                        setInputColor(1);
                        setButtonText("Cancel");
                        handleEditClick();
                        setEmailError("");
                      }
                    }}
                    className={count === 1 ? classes.cnlbtn : classes.addbtn}
                    
                    // className={count ==0 ? "btnclick":"editinput"}
                  >
                    {buttonText}
                  </button>
                  {[...Array(count)].map((_, i) => (
                    <AddedElement key={i} />
                  ))}
                </Fragment>
              </DialogActions> */}
                        </Dialog>
                    </>
                ) : !state.editConfirmDialog ? (
                    <>
                        <Dialog className={classes.dialog} open={state.setDialogOpen1} divide>
                            <DialogTitle className={classes.heading} id="form-dialog-title">
                                <div className={classes.mainheading}>
                                    Editing address<span className="cross-loader">X</span>
                                </div>
                                {" "}
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
                                <div style={{marginTop: "-25px"}}>
                                    {" "}
                                    <div className="loader-spin"></div>
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
                                        Editing your address
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
                        <Dialog className={classes.dialog} open={state.setDialogOpen1} divide>
                            <DialogTitle className={classes.heading} id="form-dialog-title">
                                <div className={classes.mainheading}>
                                    Editing address
                                    <span onClick={closeEditDialog} className="cross-loader">
                    X
                  </span>
                                </div>
                                {" "}
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
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        marginTop: "-20px",
                                    }}
                                >
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

            <div className="footer">
                <div className="footer-heading">
                    © 2022 XDC Foundation. All Right Reserved
                </div>
            </div>
        </div>
    );
}

export default connect(null)(DashboardComponent);
