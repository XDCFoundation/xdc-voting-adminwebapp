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

    const [proposal, setProposal] = React.useState("");
    const [addressInput, setAddressInput] = React.useState("");

    const [emailError, setEmailError] = useState('')
    const [emailError1, setEmailError1] = useState('')
    const [password, setPassword] = React.useState("");

    const [isDisabled, setDisabled] = useState(true);

    const validateEmail = (e) => {



        if (validator.isEmail(addressInput)) {

            history.push('/dashboard')

        }

        else {

            setEmailError('Please enter a valid email address')
            // setEmailError("")
        }
    }

    // const validatePasword = (e) => {
    //     var password = e.target.value


    //     if (password.length>=8) {
    //         setDisabled(false)

    //         setEmailError1('')

    //     }
    //     else {

    //         setEmailError1('')
    //     }
    // }

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
                        value={addressInput}
                        onChange={(e) =>
                            setAddressInput(e.target.value)

                            // validateEmail(e)
                        }

                    />

                </div>
                <div style={{ marginLeft: "20px", color: "red", marginTop: "-7px" }}>{emailError}</div>
                <div className="heading">
                    <p>Password</p>
                    <input className="input" type="password" required="true"
                        value={proposal}
                        onChange={(e) =>

                            setProposal(e.target.value)

                        }

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
                    <button className="sign-btn"
                        onClick={() => {

                            setAddressInput("");
                            setProposal("");
                            validateEmail();


                        }}
                        disabled={(!proposal) || !addressInput}

                        type="button"> Sign in</button>
                </div>


            </div>


        </div>

    )
}

