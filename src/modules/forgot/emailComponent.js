import React from 'react'
import {Column, Row} from "simple-flexbox";
import {Button} from "@material-ui/core";
import CustomInput from "../../common/components/CustomInput";
import {history} from "../../managers/history";
import Divider from "@material-ui/core/Divider/Divider";

  
 export default function EmailSent() {
     const handlePasswprdSent = () =>{
        history.push('/email-sent');
     }
     const handleRedirect = () =>{
         history.push('/')
     }
    return (
        <div className="main-div">
        <div className="voting">
        <p>Voting Address Manager</p>
        </div>
        <div className="email-div" onClick={handleRedirect} >
        <img className="logo" src={require("../../assets/styles/images/xdc_logo.svg")} ></img>
            <div className="forgot-in">
            
               Forgot Password
            </div>
            <div className="para1">
                {/* <p>Email</p>
                <input className="input" type="text"/> */}
                <p>An email has been sent. Please click on the link when you get it</p>

            </div>
          


        </div>


    </div>


    )
 }

