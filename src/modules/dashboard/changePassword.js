import React, { useState } from 'react'
import {Column, Row} from "simple-flexbox";
import {Button} from "@material-ui/core";
import CustomInput from "../../common/components/CustomInput";
import {history} from "../../managers/history";
import "../../assets/styles/custom.css";
// import "../../assets/styles/images";
export default function LoginForm() {

    // const [password,handlePassword]=useState();
  const handlePassword =()=>{
        history.push('/forgot-password');
    }
    const handleDashboard = ()=>{
        history.push('/dashboard');

    }
    const handleClickUpdate = ()=>{
        history.push('/forgot-password');
        
    }
    // let {state, togglePassword, onChangeEvent, onLoginClicked} = props;
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
                        
                    <img className="profile-logo" src={require("../../assets/styles/images/Profile.png")} ></img>
                    
                
                    </span>
                    
                </div>

            </div>
        
        {/* <div className="main-div"> */}
            <div className="change-password">
            <p>Change Password</p>
            </div>
            <div className="change-div">
            {/* <img className="logo" src={require("../../assets/styles/images/xdc_logo.svg")} ></img> */}
                <div className="heading-change">
                
                <p>Current Password</p>
                    <input className="input" type="password"/>
                </div>
                <div className="heading-change">
                    <p>New Password</p>
                    <input className="input" type="password"/>

                </div>
                <div className="heading-change">
                    <p>Confirm Password</p>
                    <input className="input" type="password" />
                   

                </div>
                {/* <p className="forgot" onClick={handlePassword} >Forgot Password?</p> */}
                <div>
                    <button className="sign-btn" onClick={handleClickUpdate} type="button"> Update Password</button>
                </div>


            </div>
        </div>
        // </div>
          )
        }