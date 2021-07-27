import React, { useState } from 'react'
import { Column, Row } from "simple-flexbox";
import { Button } from "@material-ui/core";
import CustomInput from "../../common/components/CustomInput";
import { history } from "../../managers/history";
import "../../assets/styles/custom.css";
// import "../../assets/styles/images";
import utility from '../../utility';
import validator from 'validator';

export default function LoginForm() {


    const handlePassword = () => {
        history.push('/forgot-password');
    }
    const handleDashboard = () => {
        setDisabled(false)
        history.push('/dashboard');
    }

    const [emailError, setEmailError] = useState('')
    const [emailError1, setEmailError1] = useState('')
    const [password, setPassword] = React.useState("");

    const [isDisabled, setDisabled] = useState(true);

    const validateEmail = (e) => {
        var email = e.target.value
       

        if (validator.isEmail(email)) {
            // setDisabled(false)

            setEmailError('')

        }
        //    else if (password.length>=8)
        //     {
        //         console.log(password.length)
        //          setDisabled(false)
        //     }
        else {

            setEmailError('Please enter a valid email address')
        }
    }

    const validatePasword = (e) => {
        var password = e.target.value
       

        if (password.length>=8) {
            setDisabled(false)

            setEmailError1('')

        }
        else {

            setEmailError1('')
        }
    }

    return (
        <div className="main-div">
            <div className="voting">
                <p>Voting Address Manager</p>
            </div>
            <div className="login-div">
                <img className="logo" src={require("../../assets/styles/images/xdc_logo.svg")} ></img>
                <div className="sign-in">

                    Sign in
                </div>
                <div className="heading">
                    <p>Email</p>
                    <input className="input" type="text" id="userEmail" required="true" 
                        onChange={(e) => validateEmail(e)}
                    />

                </div>
                <div style={{ marginLeft: "20px", color: "red" }}>{emailError}</div>
                <div className="heading">
                    <p>Password</p>
                    <input className="input" type="password"  required="true"
                      onChange={(e) => validatePasword(e)}
                        // onChange={(e) => { setPassword(e.target.value) }}
                        style={{
                            fontSize: "38px",
                            fontWeight: "bolder",
                            paddingBottom: "10px"
                        }}
                    />


                </div>
                <div style={{ marginLeft: "20px", color: "red" }}>{emailError1}</div>
                <p className="forgot" onClick={handlePassword} >Forgot Password?</p>
                <div>
                    <button className="sign-btn" disabled={isDisabled} onClick={handleDashboard} type="button"> Sign in</button>
                </div>


            </div>


        </div>

    )
}

