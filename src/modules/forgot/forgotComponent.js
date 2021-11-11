import React from "react";
import { Column, Row } from "simple-flexbox";
import { Button } from "@material-ui/core";
import CustomInput from "../../common/components/CustomInput";
import { history } from "../../managers/history";
import Divider from "@material-ui/core/Divider/Divider";
import validator from "validator";
import { ResetPassword } from "../../services";
import Utils from "../../utility";

export default function ForgotForm() {
  const [emailError, setEmailError] = React.useState("");
  const [emailValid, setEmailValid] = React.useState("");

  const handleRedirectLogin = () => {
    history.push("/");
  };

  // const validateEmail = (e) => {

  //     if (validator.isEmail(emailValid)) {

  //         history.push('/email-sent')

  //     }
  //     else {
  //         setEmailError('Please enter a valid email address');

  //     }
  // }

  const forgotpassword = async () => {
    const reqObj = {
      email: emailValid,
    };

    let [error, forgotPass] = await Utils.parseResponse(
      ResetPassword.resetpassword(reqObj)
    ).catch((err) => {
      console.log(err, "777777777777777777777777777");
    });

    if (error || !forgotPass) {
      setEmailError("Please enter a valid email address");
    } else if (validator.isEmail(emailValid)) {
      history.push("/email-sent");
    }
  };

  return (
    <div className="main-div">
      <div className="voting">
        <p>Voting Address Manager</p>
      </div>
      <div className="login-center">
        <div className="forgot-div">
          <img
            className="logo"
            src={require("../../assets/styles/images/xdc_logo.svg")}
          ></img>
          <div className="forgot-in">Forgot Password</div>
          <div className="para">
            <p>Enter your registered email to receive password reset link</p>
          </div>
          <div className="heading-password">
            <p>Email</p>
            <input
              className="input"
              type="email"
              required="true"
              value={emailValid}
              onChange={(e) => {
                setEmailValid(e.target.value);
                setEmailError("");
              }}
            />
          </div>
          <div style={{ marginLeft: "20px", marginTop: "-7px", color: "red" }}>
            {emailError}
          </div>

          <div>
            <button
              className="sign-btn"
              onClick={() => {
                // validateEmail();
                {
                  !emailValid
                    ? setEmailError("Please Enter Input Fields")
                    : forgotpassword();
                }
                
              }}
              // disabled={!emailValid}
              type="button"
            >
              {" "}
              Submit
            </button>
          </div>
          <p className="login-account" onClick={handleRedirectLogin}>
            Log in to your account
          </p>
        </div>
      </div>

      <div style={{ height: "50px" }}></div>
    </div>
  );
}
