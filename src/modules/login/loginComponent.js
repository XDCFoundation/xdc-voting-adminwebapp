import React, { useState } from 'react'
import { Column, Row } from "simple-flexbox";
import { Button } from "@material-ui/core";
import CustomInput from "../../common/components/CustomInput";
import { history } from "../../managers/history";
import "../../assets/styles/custom.css";
// import "../../assets/styles/images";
import utility from '../../utility';
import validator from 'validator';
import { LoginAPI } from '../../services';
import Utils from '../../utility';
import Auth0Service from "../../services/auth0";
import { AuthService } from '../../services';
import { sessionManager } from '../../managers/sessionManager';
import Cookies from 'universal-cookie';

export default function LoginForm(props) {


    const handlePassword = () => {
        history.push('/forgot-password');
    }


    const [passwordValid, setPasswordValid] = React.useState("");
    const [emailValid, setEmailValid] = React.useState("");
    const [emailError, setEmailError] = useState('');
    const [inputError, setInputError] = useState("");

    const [isloggedIn, setisloggedIn] = useState(false);



    // const validateEmail = (e) => {


    //     if (validator.isEmail(emailValid)) {

    //         history.push('/dashboard')

    //     }

    //     else {

    //         setEmailError('Please enter a valid email address')

    //     }
    // }


    const login = async () => {
        const reqObj = {
            "email": emailValid,
            "password": passwordValid,
            "isLoggedIn":true
        }
        const [error, authResponse] = await Utils.parseResponse(new AuthService().signin(emailValid, passwordValid))
        if (error || !authResponse) {
            utility.apiFailureToast("Wrong email or password");
            // setislogged(true)
        } else {
            localStorage.setItem("userInfo", JSON.stringify(authResponse))
            localStorage.setItem("isLoggedIn",JSON.stringify(true))

            // sessionManager.setDataInCookies("userInfo",authResponse)
            // Cookies.set("user",authResponse)
            

            utility.apiSuccessToast("Sign in successfull");
            history.push('/dashboard')
        }
    }

    // else {

    //     setEmailError('Please enter a valid email address')

    // }
    // }
    // if (error || !totalAccounts)
    // {
    //     utility.apiFailureToast("Wrong Email or password");
    //     // utility.apiSuccessToast("Sign in successfull");


    // return
    // console.log("return------------------>")

    // }

    //   else

    // //   utility.apiFailureToast("Wrong Email or password");
    //   utility.apiSuccessToast("Sign in successfull");
    //   history.push('/dashboard')


    return (
        <div className="main-div">
            <div className="voting">
                <p>Voting Address Manager</p>
            </div>
            <div className="login-center">
                <div className="login-div">
                    <img className="logo" src={require("../../assets/styles/images/xdc_logo.svg")}></img>
                    <div className="sign-in">

                        Sign in
                    </div>
                    <div className="heading">
                        <p>Email</p>
                        <input className="input" type="text" id="userEmail" required="true"
                            value={emailValid}
                            onChange={(e) => {
                                setEmailValid(e.target.value)
                                setEmailError("")
                                setInputError(" ")
                            }


                            }

                        />

                    </div>
                    <div style={{ marginLeft: "20px", color: "red", marginTop: "-7px" }}>{emailError}</div>
                    <div className="heading">
                        <p>Password</p>
                        <input className="input" type="password" required="true"
                            value={passwordValid}
                            onChange={(e) => {
                                setPasswordValid(e.target.value)
                                setInputError(" ")
                            }


                            }

                            style={{
                                fontSize: "38px",
                                fontWeight: "bolder",
                                paddingBottom: "10px"
                            }}
                        />


                    </div>

                    <p className="forgot" onClick={handlePassword}>Forgot Password?</p>
                    <div style={{ marginLeft: "20px", color: "red", marginTop: "-7px" }}>{inputError}</div>
                    <div>


                        <button className="sign-btn-login"
                            onClick={() => {


                                // setPasswordValid("");
                                // validateEmail();
                                { (!passwordValid) || !emailValid ? setInputError('Please Enter Input Fields') : login() }


                            }}

                            // disabled={(!passwordValid) || !emailValid}


                            type="button"> Sign in
                        </button>

                    </div>


                </div>
            </div>
            <div style={{ height: "50px" }}></div>

        </div>

    )
}

