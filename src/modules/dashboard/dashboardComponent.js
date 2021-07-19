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

// import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import color from '@material-ui/core/colors/amber';
import addDialogComponent from '../Dialog/addDialog';

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

 export default function DashboardComponent(props) {


    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
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
        {/* Open Menu */}
      </Button>
      <Menu
        id="simple-menu-item"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        
      >
        {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
        <MenuItem onClick={handleChangePassword} >Change Password </MenuItem>
        <hr className="menu-line"/>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
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
           
           <div id="containerIntro">
    <h1>Whitelisted Addresses</h1>
    <addDialogComponent/>
    <button className="add-btn"  >Add </button>
</div>
{/* <div><addDialogComponent/></div> */}

            <div className="griddiv">
            

<Grid lg={13} className="tablegrid_address">
{/* <Grid class="tabletop-header">Whitelisted Addresses</Grid> */}
    <Grid component={Paper} style={{ boxShadow: "0px 0px 0px 0px" }}>
    
        <Table className="table" aria-label="Whitelisted Addresses" style={{ boxShadow: "0px 0px 0px 0px" }}>
            <TableHead>
                <TableRow>
                    <TableCell style={{ border: "none",paddingLeft: "4%", fontWeight: "bold",fontSize: "15px",
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
                        style={{ border: "none", paddingLeft: "0%", fontWeight: "bold",fontSize: "15px",
                        fontFamily: "unset" }}
                        align="left"
                    >
                        <span className={"tableheaders"}>AddedOn</span>
                    </TableCell>
                    <TableCell
                        style={{ border: "none", paddingLeft: "1%", fontWeight: "bold",fontSize: "15px",
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
                            <TableCell style={{ border: "none",paddingLeft: "4%" }} margin-left="5px">
                             
                                <a className="linkTable" href="/">
                                {/* <Tooltip placement="top" title={row.Adress}> */}
                                    <span className="tabledata">
                                        {(row.Adress)}{" "}
                                    </span>
                                    {/* </Tooltip> */}
                                </a>
                            </TableCell>
                            {/* <TableCell style={{ border: "none" }} align="left">
                                <span className="tabledata">{row.Description}</span>
                            </TableCell>
                            <TableCell style={{ border: "none" }} align="left">
                                
                                <span className="tabledata">{row.Balance}</span>
                                
                            </TableCell> */}
                            <TableCell style={{ border: "none", paddingLeft: "0%" }} align="left">
                                {/* <a className="linkTable" href="/"> */}
                                <span className="tabledata"> {row.AddedOn}</span>
                                {/* </a> */}
                            </TableCell>
                            <TableCell style={{ border: "none" }} align="left">
                                {/* <a className="linkTable" href="/"> */}
                                <span className="tabledata">{row.Votes}</span>
                                {/* </a> */}
                            </TableCell>
                            <TableCell style={{ border: "none", paddingLeft: "4%" }} align="left">
                                <a className="linkTable" href="/">
                                    <span className="tabledata">Delete</span>
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
   
