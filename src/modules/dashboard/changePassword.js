import React, { useState } from 'react'
import { Column, Row } from "simple-flexbox";
import { Button } from "@material-ui/core";
import CustomInput from "../../common/components/CustomInput";
import { history } from "../../managers/history";
import "../../assets/styles/custom.css";
import DemoForm from './DemoForm';
import utility from '../../utility';
// import "../../assets/styles/images";


export default function LoginForm() {

    const [currentpassword, setcurrentPassword] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmpassword, setconfirmPassword] = React.useState("");
    const [isError, setIsError] = React.useState("");

    const [isDisabled, setDisabled] = useState(true);

    const isButton = false;
    const checkValidationPassword = (e) => {
        const confirmpassword = e.target.value
        setconfirmPassword(confirmpassword)
        if ((password != confirmpassword) | ((password.length <= 8) | (currentpassword.length <= 8))) {
            setIsError("Password should match and have minimum 8 characters");
        } else {
            setDisabled(false)
            setIsError("");
        }

    }


    const handlePassword = () => {

        history.push('/forgot-password');
    }
    const handleDashboard = () => {
        history.push('/dashboard');

    }
    const handleClickUpdate = () => {
        setDisabled(false)
        history.push('/');

    }



    return (

        <div>

            {/* <div><DemoForm/></div> */}

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

            {/* <div className="main-div"> */}
            <div className="change-password">
                <p>Change Password</p>
            </div>
            <div className="change-div">

                <div className="heading-change">

                    <p>Current Password</p>
                    <input className="input" type="password" required="true" value={currentpassword}
                        onChange={(e) => { setcurrentPassword(e.target.value) }}

                        style={{
                            fontSize: "38px",
                            fontWeight: "bolder",
                            paddingBottom: "10px"
                        }}

                    />
                </div>
                <div className="heading-change">
                    <p>New Password</p>
                    <input className="input" value={password} type="password" required="true"
                        onChange={(e) => { setPassword(e.target.value) }}
                        style={{
                            fontSize: "38px",
                            fontWeight: "bolder",
                            paddingBottom: "10px"
                        }}

                    />

                </div>
                <div className="heading-change">
                    <p>Confirm Password</p>
                    <input className="input" type="password" value={confirmpassword} required="true"
                        onChange={checkValidationPassword}

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
                        disabled={isDisabled}

                        onClick={handleClickUpdate}
                        type="button"> Update Password</button>
                </div>


            </div>
        </div>

    )
}