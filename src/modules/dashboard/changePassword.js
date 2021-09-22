import React, { useState } from 'react'
import { Column, Row } from "simple-flexbox";
import { Button } from "@material-ui/core";
import CustomInput from "../../common/components/CustomInput";
import { history } from "../../managers/history";
import "../../assets/styles/custom.css";
import DemoForm from './DemoForm';
import utility from '../../utility';
import Utils from '../../utility';
import { ChangePassword } from '../../services';
import LoginForm from '../login/loginComponent';
// import "../../assets/styles/images";


export default function LoginChange(props) {

    


    const [allowVoting, setallowVoting] = React.useState("");
    const [proposal, setProposal] = React.useState("");
    const [addressInput, setAddressInput] = React.useState("");


    const [isError, setIsError] = React.useState("");

    const checkValidationPassword = (e) => {

        if ((allowVoting != proposal) | ((allowVoting.length <= 8) | (addressInput.length <= 8))) {
            setIsError("Password should match and have minimum 8 characters");
        } else {
            history.push('/')


        }

    }
    // "userId": "auth0|611c92b7f01e430069bd2c15"
    const updatepassword = async () => {

        const reqObj = {
    
            "email":"nadeem@leewayhertz.com",
            "userId":"auth0|6149d7a38681e0006941b38a",
            "oldPassword": addressInput,
            "password": allowVoting,
            // "password":proposal
           
           
          
        }
       
    
        let [error, totalAccounts] = await Utils.parseResponse(ChangePassword.changepassword(reqObj))
    
        if (error || !totalAccounts)
          return
    
      
       
        
      }

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

                        <img className="profile-logo" src={require("../../assets/styles/images/Profile.png")} ></img>


                    </span>

                </div>

            </div>



            <div className="change-div">
                <div className="change-password">
                    <p>Change Password</p>
                </div>
                <div className="heading-change">

                    <p>Current Password</p>
                    <input className="input" type="password" required="true"

                        value={addressInput}
                        onChange={(e) => {
                            {
                                setAddressInput(e.target.value);
                                setIsError("")
                            }

                        }}

                        style={{
                            fontSize: "38px",
                            fontWeight: "bolder",
                            paddingBottom: "10px"
                        }}

                    />
                </div>
                <div className="heading-change">
                    <p>New Password</p>
                    <input className="input"
                        value={allowVoting}


                        type="password" required="true"
                        onChange={(e) => {
                            {
                                setallowVoting(e.target.value);
                                setIsError("")
                            }

                        }}
                        style={{
                            fontSize: "38px",
                            fontWeight: "bolder",
                            paddingBottom: "10px"
                        }}

                    />

                </div>
                <div className="heading-change">
                    <p>Confirm Password</p>
                    <input className="input" type="password"
                        value={proposal}

                        required="true"
                        onChange={(e) => {
                            {
                                setProposal(e.target.value);
                                setIsError("")
                            }


                        }}

                        style={{
                            fontSize: "38px",
                            fontWeight: "bolder",
                            paddingBottom: "10px"
                        }}

                    />

                </div>

                <div style={{ marginLeft: "17px", color: "red" }}> {isError}</div>
                <div>
                    <button className="sign-btn"
                        //  onClick={utility.isPasswordValid}
                        onClick={() => {
                            setallowVoting("");
                            setAddressInput("");
                            setProposal("");
                            checkValidationPassword();
                            updatepassword()


                        }}
                        disabled={!allowVoting || !proposal || !addressInput}

                        type="button"> Update Password</button>
                </div>



            </div>
            <div style={{ height: "50px" }}></div>
        </div>

    )
}