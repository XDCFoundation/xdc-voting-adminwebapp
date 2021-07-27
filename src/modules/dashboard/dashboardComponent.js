import React from 'react'
import {Column, Row} from "simple-flexbox";
import {Button} from "@material-ui/core";
import CustomInput from "../../common/components/CustomInput";
import {history} from "../../managers/history";
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


import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles, mergeClasses } from "@material-ui/styles";


// import PaginationRounded from './pagination';
// import { makeStyles } from '@material-ui/core/styles';
// import Pagination from '@material-ui/lab/Pagination';

// import utils from '@material-ui/core/utils';
// const useStyles = makeStyles((theme) => ({
//     style:{
//         focus:{
//             backgroundColor:"white"
//         },
//         onmouseover:{
//             backgroundColor:"white"

//         }
//     }
// }));
// const useStyles = makeStyles((theme) => ({
//     root: {
//       '& > *': {
//         marginTop: theme.spacing(2),
//       },
//     },
//   }));


const useStyles = makeStyles((theme) => ({

    dialog: {
        marginLeft: "26%",
        marginTop: "38px",
        width: "55% !important",
        height: "50% !important",
        borderRadius: "80px !important"
      },
      buttons: {
        padding: "0px 35px 0px 0px",
        marginTop:"1px",
        marginBottom:"6px"
          },
          buttons1:{
            padding: "0px 35px 0px 0px",
            marginTop:"-10px",
            marginBottom:"6px"
          },
      input: {
        width: "400px",
        height: "5vh",
        border: "solid 1px #c6c8ce",
        backgroundColor: "#ffffff",
        borderRadius: "7px",
        outline:"none",
        marginTop:"-15px"
        // padding: "15px",
      },
    
      addbtn: {
        width: "110px",
      height: "34px",
      // margin: "33px 0 0 21px",
      // padding: "8px 30px 7px 32px",
      margin: "14px -8px 15px 2px",
        padding: "5px 19px 3px 20px",
      borderRadius: "4px",
      backgroundColor: "#3763dd",
      color: "white",
      border:"none",
      },
      // addbtn: {
      //   width: "110px",
      // height: "34px",
      // margin: "33px 0 0 21px",
      // padding: "8px 30px 7px 32px",
      // borderRadius: "4px",
      // backgroundColor: "#3763dd",
      // },
      // cnlbtn: {
      //   width: "94px",
      // height: "34px",
      // margin: "33px 21px 0 87px",
      // padding: "8px 19px 7px 21px",
      // borderRadius: "4px",
      // backgroundColor: "#9fa9ba",
    
      // },
      cnlbtn: {
        width: "94px",
      height: "34px",
      // margin: "33px 21px 0 87px",
      // padding: "8px 19px 7px 21px",
      borderRadius: "4px",
      backgroundColor: "#9fa9ba",
      color: "white",
      border:"none",
      
        
        margin: "14px 8px 15px 2px",
        padding: "6px 19px 3px 20px",
    
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

        fontWeight: "600",fontSize: "13px",
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
      setOpen1(true);
    };
  
    const handleClose2 = () => {
      setOpen1(false);
    };

   function handleDelete(){
        return(
            <div><button>Add</button></div>
            
        )

    }

     const handleClickDelete=()=>{
        
             handleDelete()
         

    }
      
  
    // const handleClickOpen2 = () => {
    //     setOpen1(true);
    //   };
    
    //   const handleClose2 = () => {
    //     setOpen1(false);
    //   };

     

    // const classes = useStyles();
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
    const handleLogout =()=>{
        history.push('/');
    }
    const handleChangePassword =()=>{
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

                // Description: "My wallet",
                // Balance: "800 XDC ($38.56)",
                AddedOn: "30 June 2021",
                Votes: "100",
                // Value: "45000.00XDC",
                id: 1,
            },
            {
                Adress: "xdcc4e699581116412965b…5e7c",
                // xdcc4e699581116412965b…5e7c
                // Description: "My wallet",
                // Balance: "800 XDC ($38.56)",
                AddedOn: "21 June 2021",
                Votes: "200",
                // Value: "45000.00XDC",
                id: 2,
            },
            {
                Adress: "5e7c71b8e2dd50ac8d30x…5b9c",
                // Description: "My wallet",
                // Balance: "800 XDC ($38.56)",
                AddedOn: "1 June 2021",
                Votes: "170",
                // Value: "45000.00XDC",
                id: 3,
            },
        ]
        
        ;
        setAddress(
            address.map((d) => {
                return {
                    select: false,
                    Adress: d.Adress,
                    // Description: d.Description,
                    // Balance: d.Balance,
                    AddedOn: d.AddedOn,
                    Votes: d.Votes,
                    // Value: d.Value,
                    id: d.id,
                };
            })
        );
    }, []);
    
    const { state } = props;




    const {useState, Fragment} = React

// The added element component
const AddedElement = () => <button style={{marginLeft:"12px"}}  className={classes.addbtn} type="button">Done</button>

// The parent component

  const [count, setCount] = React.useState(0) // Name it however you wish

  const [buttonText, setButtonText] = useState("Edit");
 
  
// const handeCloseText=()=>{
//   buttonText(null)
// }
  // const handleChangeButton=()=> <button>Cancel</button>
    //  const handlePasswprdSent = () =>{
    //     history.push('/email-sent');
    //  }
    return (

        <div>
            <div className="header">
                <div className="div1">
                    <span>
                    <img  className="header-logo" src={require("../../assets/styles/images/xdc_logo.svg")} ></img>
                    

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
        
        <MenuItem onClick={handleChangePassword} style={{backgroundColor:"white"}} >Change Password </MenuItem>
        <hr className="menu-line"/>
        <MenuItem onClick={handleLogout}style={{backgroundColor:"white"}} >Logout</MenuItem>
      </Menu>
    </div>
                    </span>
                    
                </div>

            </div>

            
           
               {/* <div>
                <span className="address">
                    <p>Whitelist Addresses</p></span>
               <span className="btn"> <button type="button" className="add-btn">Add</button></span>
               </div>
                 */}
                
            {/* <span><p className="whitelist" >Whitelisted Addresses</p></span>
            <span ><button type="button" >Add</button>
            </span> */}
           
           {/* <div id="containerIntro">
    <h1>Whitelisted Addresses</h1>
    
    <button className="add-btn" onClick={handleClickOpen} ><FormDialog/> Add </button>
</div> */}
{/* <div><addDialogComponent/></div> */}



<FormDialog/>
            <div className="griddiv">
            

<Grid lg={13} className="tablegrid_address">
{/* <Grid class="tabletop-header">Whitelisted Addresses</Grid> */}
    <Grid component={Paper} style={{ boxShadow: "0px 0px 0px 0px" }}>
    
        <Table className="table" aria-label="Whitelisted Addresses" style={{ boxShadow: "0px 0px 0px 0px" }}>
            <TableHead>
                <TableRow>
                    <TableCell style={{ border: "none",paddingLeft: "4%", fontWeight: "500",fontSize: "15px",
    fontFamily: "unset" }} align="left">

                        <span className={"tableheaders"}>Address</span>
                    </TableCell>
                    {/* <TableCell
                        style={{ border: "none", paddingLeft: "1.8%" }}
                        align="left"
                    >
                        <span className={"tableheaders"}>Description</span>
                    </TableCell>
                    <TableCell
                        style={{ border: "none", paddingLeft: "2%" }}
                        align="left"
                    >
                        <span className={"tableheaders"}>Balance</span>
                        
                    </TableCell> */}
                    <TableCell
                        style={{ border: "none", paddingLeft: "0%", fontWeight: "500",fontSize: "15px",
                        fontFamily: "unset" }}
                        align="left"
                    >
                        <span className={"tableheaders"}>Added On</span>
                    </TableCell>
                    <TableCell
                        style={{ border: "none", paddingLeft: "1%", fontWeight: "500",fontSize: "15px",
                        fontFamily: "unset" }}
                        align="left"
                    >
                        <span className={"tableheaders"}>Votes</span>
                    </TableCell>
                    {/* <TableCell
                        style={{ border: "none", paddingLeft: "1%" }}
                        align="left"
                    >
                        <span className={"tableheaders"}></span>
                    </TableCell> */}
                    {/* <TableCell style={{ border: "none", paddingLeft: "2.5%" }} align="left"><span className={"tableheaders"}>Txn Fee</span></TableCell> */}
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
                            
                            <TableCell style={{ border: "none",paddingLeft: "4%" }} margin-left="5px"  onClick={handleClickOpen1}>
                             
                                <a className="linkTable" >
                                <Tooltip placement="top" title={row.Adress}>
                                    
                                    <span className="tabledata"  >
                                        {(row.Adress)}{" "}
                                        
                                    </span>
                                    </Tooltip>
                                </a>
                            </TableCell>
                            {/* <TableCell style={{ border: "none" }} align="left">
                                <span className="tabledata">{row.Description}</span>
                            </TableCell>
                            <TableCell style={{ border: "none" }} align="left">
                                
                                <span className="tabledata">{row.Balance}</span>
                                
                            </TableCell> */}
                            <TableCell style={{ border: "none", paddingLeft: "0%" }} align="left"  onClick={handleClickOpen1}>
                                {/* <a className="linkTable" href="/"> */}
                                <span className="tabledata"> {row.AddedOn}</span>
                                {/* </a> */}
                            </TableCell>
                            <TableCell style={{ border: "none" }} align="left"  onClick={handleClickOpen1}>
                                {/* <a className="linkTable" href="/"> */}
                                <span className="tabledata">{row.Votes}</span>
                                {/* </a> */}
                            </TableCell>
                            <TableCell style={{ border: "none", paddingLeft: "6%" }} align="left">
                                <a className="linkTable" >
                                    <span className="tabledata" onClick={handleClickOpen} >  Delete</span>
                                </a>
                            </TableCell>
                            {/* <TableCell style={{ border: "none" }} align="right"><span className="tabledata">0.00000000005 XDC</span></TableCell> */}
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
          open={open}
          onClose={handleClose1}
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
          <span><button className={classes.cnlbtn} onClick={handleClose1} >Cancel</button></span>
         
             <span>
                <button className={classes.addbtn} 
                onClick={()=>{utility.apiSuccessToast("You have succesfully deleted addres");handleClose1()}} 
                //  onClick={handleClose1} 
                  >  Delete </button></span>
                </DialogActions>
         
     
      
        
        </Dialog>
      </div>



      <div>
        <Dialog
          className={classes.dialog}
          open={open1}
          onClose={handleClose2}
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

          <div style={{display:"inline", marginTop:"5px"}}>
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
                                                                backgroundColor:"none",
                                                                marginTop:"-25px",
                                                                marginRight:"10px",
                                                            }}
                                                        
                                                        />
                                                        <span className="tabledata">
                                                                Allow Voting
                                                            </span>
                                                            </div>  





                                                            <div style={{display:"inline"}}>
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
                                                                backgroundColor:"none",
                                                                marginTop:"-25px",
                                                                marginRight:"10px", 
                                                            }}
                                                        />
                                                        <span className="tabledata">
                                                                Allow Proposal Creation
                                                            </span>
                                                            </div>
          
          <DialogActions className={classes.buttons1}>
          {/* <span><button className={classes.cnlbtn} onClick={handleClose2} >Cancel</button></span> */}
          <Fragment>
    <button  className={classes.addbtn}  onClick={() => (setCount( 1),setButtonText("Cancel"))}  >{buttonText}</button>
    { [...Array(count)].map((_, i) => <AddedElement key={i} />) }
  </Fragment>
            
      {/* <span><button className={classes.addbtn} onClick={handleClickDelete}  >  Edit <EditDialog/> </button></span> */}
                </DialogActions>
         
     
      
        
        </Dialog>
      </div>

<div><PaginationRounded/></div>
<div style={{height:"50px"}}></div>
{/* <div className={classes.root}>
      <Pagination count={10} shape="rounded" />
      <Pagination count={10} variant="outlined" shape="rounded" />
    </div> */}


        </div>

    //     <div className="main-div">
    //     <div className="voting">
    //     <p>Voting Address Manager</p>
    //     </div>
    //     <div className="forgot-div">
    //     <img className="logo" src={require("../../assets/styles/images/xdc_logo.svg")} ></img>
    //         <div className="forgot-in">
            
    //            Forgot Password
    //         </div>
    //         <div className="para">
    //             {/* <p>Email</p>
    //             <input className="input" type="text"/> */}
    //             <p>Enter your registered email to receive password reset link</p>

    //         </div>
    //         <div className="heading-password">
    //             <p>Email</p>
    //             <input className="input" type="email" />
               

    //         </div>
    //         {/* <p className="forgot"  >Forgot Password?</p> */}
    //         <div>
    //             <button className="sign-btn1" onClick={handlePasswprdSent} type="button"> Submit</button>
    //         </div>
    //         <p className="login-account"  >Log in to your account</p>


    //     </div>


    // </div>


    )
 }












//         <div
//             className="p-3 cursor-pointer fc-dark-slate-blue text-center m-3 w-250 bg-white b-1-white subscription-plan-card-shadow z-index-100 br-4">
//             <div className="fs-20 font-weight-bold">Loan Seller</div>
//             <div className="fs-15 my-3">Create, transfer, sell and
//                 publish Loan Data Records
//                 on Blockchain
//             </div>
//             <img/>
//             <Button className="my-3 bg-blue px-2 fc-white fs-17 outline-none text-transform-capitalize">
//                 Buy this plan
//             </Button>
//         </div>
//     );
// }

// function SubscriptionPlanComponent(props) {
//     let {state, togglePassword, onChangeEvent, onLoginClicked} = props;
//     return (
//         <Column className="align-items-center my-5" horizontal={'center'}>
//             <div className="w-100 fs-28 text-center fc-dark-slate-blue">
//                 LIMB CRE Plans for your Business
//             </div>
//             <div className="w-100 fs-20 text-center fc-dusky-blue">
//                 Select a plan to match your company type
//             </div>
//             <Row className="mt-4">
//                 {SubscriptionTypeComponent(props)}
//                 {SubscriptionTypeComponent(props)}
//                 {SubscriptionTypeComponent(props)}
//                 {SubscriptionTypeComponent(props)}
//             </Row>
//         </Column>
//     );
// }

// function SignUpForm(props) {
//     let {state, togglePassword, onChangeEvent, onLoginClicked} = props;
//     return (
//         <Column className="w-450 pl-5 ml-3 border-left py-3 my-3 align-items-center fc-dark-slate-blue"
//                 horizontal={'center'}>
//             <form onSubmit={onLoginClicked} className="w-100">

//                 <label className="text-left w-100 fs-20"><span
//                     className='font-weight-bold'>Create your account</span> (all field required)</label>

//                 <div className="fs-15 mt-3 font-weight-bold">Full Name</div>
//                 <CustomInput id="name" type="text" value={state ? state.name : ""} onChange={onChangeEvent}
//                              error={state ? state.nameError : ""} className="fs-15 p-2 mt-1"/>

//                 <div className="fs-15 mt-2 font-weight-bold ">Email Address</div>
//                 <CustomInput id="email" type="text" value={state ? state.email : ""} onChange={onChangeEvent}
//                              error={state ? state.emailError : ""} className="fs-15 p-2 mt-1"/>

//                 <Row className="fs-15 mt-2 font-weight-bold">Password</Row>
//                 <CustomInput id="password" type={"password"} value={state ? state.password : ""}
//                              onChange={onChangeEvent} error={state ? state.passwordError : ""}
//                              className="fs-15 p-2 mt-1"/>

//                 <Row className="fs-15 mt-2 font-weight-bold">Confirm Password</Row>
//                 <CustomInput id="confirmPassword" type={"password"} value={state ? state.confirmPassword : ""}
//                              onChange={onChangeEvent} error={state ? state.confirmPasswordError : ""}
//                              className="fs-15 p-2 mt-1"/>

//                 <Button type='submit' className="bg-blue outline-none text-transform-capitalize
//                 fc-white w-100 py-2 fs-17 mt-4 cursor-pointer">
//                     Continue
//                 </Button>
//                 <div className="w-100 text-left fs-15 my-1">By clicking on continue, you agree to the LIMB CRE
//                     <a className="fc-blue"> Terms of Service </a>
//                     and <a className="fc-blue">Privacy Policy.</a>
//                 </div>
//             </form>
//         </Column>
//     );
// }

// function SelectedSubscriptionComponent(props) {
//     return (
//         <div
//             className="p-3 mx-3 cursor-pointer fc-dark-slate-blue text-center m-3 w-250 bg-white">
//             <div className="fs-20 font-weight-bold">Loan Seller</div>
//             <div className="fs-15 my-3">Create, transfer, sell and
//                 publish Loan Data Records
//                 on Blockchain
//             </div>
//             <img/>
//             <Button className="my-3 bg-blue px-2 fc-white fs-17 outline-none text-transform-capitalize">
//                 Buy this plan
//             </Button>
//         </div>
//     );
// }

// function SignUpComponent(props) {
//     let {state, togglePassword, onChangeEvent, onLoginClicked} = props;
//     return (
//         <Row className="align-items-center my-5" horizontal={'center'}>
//             {SelectedSubscriptionComponent(props)}
//             {SignUpForm(props)}
//         </Row>
//     );
// }

// function HeaderComponent(props) {
//     return (
//         <Row vertical="center" className="justify-content-between w-100">
//             <img src="/images/limb_logo.svg" alt='limb' className="w-150"/>
//             <Row vertical="center">
//                 <Column vertical="center" className="fc-brownish-grey fs-15 px-2 py-1">Existing user?</Column>
//                 <Column vertical="center" className="fc-blue br-4 b-1-blue fs-17 px-2 py-1 cursor-pointer"
//                         onClick={() => history.replace("/")}>

//                     Log in</Column>
//             </Row>
//         </Row>
//     )
// }

// function signUpComponent(props) {
//     return (
//         <Column horizontal={'center'} className="w-100 p-3 min-vh-100">
//             {HeaderComponent(props)}
//             {/*{SubscriptionPlanComponent(props)}*/}
//             {SignUpComponent(props)}
//         </Column>
   
