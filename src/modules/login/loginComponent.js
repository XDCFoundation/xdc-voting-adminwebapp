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

export default function LoginForm() {


    const handlePassword = () => {
        history.push('/forgot-password');
    }


    const [passwordValid, setPasswordValid] = React.useState("");
    const [emailValid, setEmailValid] = React.useState("");
    const [emailError, setEmailError] = useState('')


    const validateEmail = (e) => {



        if (validator.isEmail(emailValid)) {

            history.push('/dashboard')

        }

        else {

            setEmailError('Please enter a valid email address')

        }
    }


    const login = async () => {
        const reqObj = {
          "email": emailValid,
          "password":passwordValid
        }
    
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!", reqObj)
        const [error, totalAccounts] = await Utils.parseResponse(LoginAPI.loginapi(reqObj))
        console.log(totalAccounts, "total-accounts");
        console.log(error,"errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
        if (error || !totalAccounts)
        {

            utility.apiSuccessToast("Sign in successfull");
       
       
        return
        }
          
          else

          utility.apiFailureToast("Wrong Email or password");
        
       
    
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
                        value={emailValid}
                        onChange={(e) => {
                            setEmailValid(e.target.value)
                            setEmailError("")
                        }


                        }

                    />

                </div>
                <div style={{ marginLeft: "20px", color: "red", marginTop: "-7px" }}>{emailError}</div>
                <div className="heading">
                    <p>Password</p>
                    <input className="input" type="password" required="true"
                        value={passwordValid}
                        onChange={(e) =>

                            setPasswordValid(e.target.value)

                        }

                        style={{
                            fontSize: "38px",
                            fontWeight: "bolder",
                            paddingBottom: "10px"
                        }}
                    />


                </div>

                <p className="forgot" onClick={handlePassword} >Forgot Password?</p>
                <div>
                    <button className="sign-btn"
                        onClick={() => {


                            setPasswordValid("");
                            validateEmail();
                            login()


                        }}
                        disabled={(!passwordValid) || !emailValid}

                        type="button"> Sign in</button>
                </div>


            </div>
            <div style={{ height: "50px" }}></div>

        </div>

    )
}

