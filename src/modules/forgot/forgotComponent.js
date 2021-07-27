import React from 'react'
import {Column, Row} from "simple-flexbox";
import {Button} from "@material-ui/core";
import CustomInput from "../../common/components/CustomInput";
import {history} from "../../managers/history";
import Divider from "@material-ui/core/Divider/Divider";
import validator from 'validator';
  
 export default function ForgotForm() {
     const handlePasswprdSent = () =>{
        setDisabled(false)
        history.push('/email-sent');
     }


     const [emailError, setEmailError] = React.useState('')
     const [password, setPassword] = React.useState("");
     
     const [isDisabled, setDisabled] = React.useState(true);
     
       const validateEmail = (e) => {
         var email = e.target.value
       
         if (validator.isEmail(email)) {
          
             setDisabled(false)
           setEmailError('')
             
         } 
         else {
            setEmailError('Please enter a valid email address')
          }
       }

    return (
        <div className="main-div">
        <div className="voting">
        <p>Voting Address Manager</p>
        </div>
        <div className="forgot-div">
        <img className="logo" src={require("../../assets/styles/images/xdc_logo.svg")} ></img>
            <div className="forgot-in">
            
               Forgot Password
            </div>
            <div className="para">
                {/* <p>Email</p>
                <input className="input" type="text"/> */}
                <p>Enter your registered email to receive password reset link</p>

            </div>
            <div className="heading-password">
                <p>Email</p>
                <input className="input" type="email" required="true"
                onChange={(e) => validateEmail(e)}
                />
               

            </div>
            <div style={{marginLeft:"20px",marginTop:"-7px", color:"red"}}>{emailError}</div>
            {/* <p className="forgot"  >Forgot Password?</p> */}
            <div>
                <button className="sign-btn1" disabled={isDisabled} onClick={handlePasswprdSent} type="button"> Submit</button>
            </div>
            <p className="login-account"  >Log in to your account</p>


        </div>


    </div>


    )
 }

