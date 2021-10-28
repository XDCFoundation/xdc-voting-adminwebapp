import React, { useState } from "react";
import { Column, Row } from "simple-flexbox";
import { Button } from "@material-ui/core";
import CustomInput from "../../common/components/CustomInput";
import { history } from "../../managers/history";
import "../../assets/styles/custom.css";
import DemoForm from "./DemoForm";
import utility from "../../utility";
import Utils from "../../utility";
import { ChangePassword } from "../../services";
import LoginForm from "../login/loginComponent";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { sessionManager } from "../../managers/sessionManager";
// import "../../assets/styles/images";

export default function LoginChange(props) {
  const [allowVoting, setallowVoting] = React.useState("");
  const [proposal, setProposal] = React.useState("");
  const [addressInput, setAddressInput] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [isError, setIsError] = React.useState("");

  const handleCancel = () => {
    history.push("/dashboard");
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    history.push("/");
  };
  //   const handleLogout = () => {
  //     props.dispatch({ type: reduxEvent.LOGGED_OUT, data: null });
  //     sessionManager.removeDataFromLocalStorage("userInfo");
  //     sessionManager.removeDataFromLocalStorage("isLoggedIn");
  //     window.location.href="/";

  //     // history.push("/");
  //   };
  const handleChangePassword = () => {
    history.push("/change-password");
  };

  const dashboardRedirect = () => {
    history.push("/dashboard");
  };

  const checkValidationPassword = (e) => {
    if (
      (allowVoting != proposal) |
      ((allowVoting.length <= 8) | (addressInput.length <= 8))
    ) {
      setIsError("Password should match and have minimum 8 characters");
    } else {
      history.push("/dashboard");
    }
  };

  let userInfo = localStorage.getItem("userInfo");
  userInfo = JSON.parse(userInfo);
  // "userId": "auth0|611c92b7f01e430069bd2c15"
  const updatepassword = async () => {
    let userInfo = sessionManager.getDataFromLocalStorage("userInfo");
    userInfo = JSON.parse(userInfo);
    console.log(userInfo, "localdata");
    const reqObj = {
      email: userInfo.email,
      userId: userInfo.sub,
      oldPassword: addressInput,
      password: allowVoting,
      password: proposal,
    };

    let [error, totalAccounts] = await Utils.parseResponse(
      ChangePassword.changepassword(reqObj)
    );
    let pass = sessionManager.getDataFromLocalStorage("requestBody");
    pass = JSON.parse(pass);

    console.log(pass, "password saved");
    if (
      (allowVoting != proposal) |
      (pass.password != addressInput) |
      ((allowVoting.length <= 8) | (addressInput.length <= 8))
    ) {
      setIsError("Password should match and have minimum 8 characters");
    } else {
      history.push("/dashboard");
      utility.apiSuccessToast("password changed successfully");
    }

    //         if (error || !totalAccounts)
    //         {
    //             setIsError("wrong email");
    // console.log(error,"changepassword------------------?")
    //         }

    //         else{
    //             utility.apiSuccessToast("password changed successfully");
    //         }
  };

  return (
    <div>
      <div className="header">
        <div className="div1">
          <span>
            <img
              className="header-logo"
              onClick={dashboardRedirect}
              src={require("../../assets/styles/images/XDC-Icon-Logo.svg")}
            ></img>
          </span>

          <span className="voting-para">
            <p>Voting Address Manager</p>
          </span>
          <span className="profile-icon">
            {/* <img className="profile-logo" src={require("../../assets/styles/images/Profile-Logo.svg")} ></img> */}
            <div>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <img
                  className="profile-logo"
                  src={require("../../assets/styles/images/Profile-Logo.svg")}
                ></img>
              </Button>
              <Menu
                id="simple-menu-item"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={handleChangePassword}
                  className="menu-heading"
                  style={{ backgroundColor: "white" }}
                >
                  Change Password{" "}
                </MenuItem>
                <hr className="menu-line" />
                <MenuItem
                  onClick={() => {
                    handleLogout();
                  }}
                  className="menu-heading"
                  style={{ backgroundColor: "white" }}
                >
                  Log out
                </MenuItem>
              </Menu>
            </div>
          </span>
        </div>
      </div>

      <div className="change-div">
        <div className="change-password">
          <p>Change Password</p>
        </div>
        <div className="heading-change">
          <p>Current Password</p>
          <input
            className="input"
            type="password"
            required="true"
            value={addressInput}
            onChange={(e) => {
              {
                setAddressInput(e.target.value);
                setIsError("");
              }
            }}
            style={{
              fontSize: "38px",
              fontWeight: "bolder",
              paddingBottom: "10px",
            }}
          />
        </div>
        <div className="heading-change">
          <p>New Password</p>
          <input
            className="input"
            value={allowVoting}
            type="password"
            required="true"
            onChange={(e) => {
              {
                setallowVoting(e.target.value);
                setIsError("");
              }
            }}
            style={{
              fontSize: "38px",
              fontWeight: "bolder",
              paddingBottom: "10px",
            }}
          />
        </div>
        <div className="heading-change">
          <p>Confirm Password</p>
          <input
            className="input"
            type="password"
            value={proposal}
            required="true"
            onChange={(e) => {
              {
                setProposal(e.target.value);
                setIsError("");
              }
            }}
            style={{
              fontSize: "38px",
              fontWeight: "bolder",
              paddingBottom: "10px",
            }}
          />
        </div>

        <div style={{ marginLeft: "17px", color: "red" }}> {isError}</div>
        <div>
          <button
            className="sign-btn-update"
            //  onClick={utility.isPasswordValid}
            onClick={() => {
              setallowVoting("");
              setAddressInput("");
              setProposal("");
              // checkValidationPassword();
              updatepassword();

              {
                !allowVoting || !proposal || !addressInput
                  ? setIsError(
                      "Password should match and have minimum 8 characters"
                    )
                  : updatepassword();
              }
            }}
            // disabled={!allowVoting || !proposal || !addressInput}

            type="button"
          >
            {" "}
            Update Password
          </button>
          <button className="cnlbtn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
      <div style={{ height: "50px" }}></div>
    </div>
  );
}
