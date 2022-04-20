import React from "react";
import { Router, Route } from "react-router-dom";
import { Redirect, Switch } from "react-router";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { connect } from "react-redux";
import { Login } from "./modules";
import Forgot from "./modules/forgot";
import Email from "./modules/forgot/emailComponent";
import Dashboard from "./modules/dashboard";
import Change from "./modules/dashboard/changePassword";
import { history } from "./managers/history";
import BaseComponent from "./modules/baseComponent";
import { sessionManager } from './managers/sessionManager';


class Routes extends BaseComponent {
    componentDidMount() { }

    render() {
        console.log(this.props.isLoggedIn, "userdetailsssss")
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <Router history={history}>
                    <Switch>
                        <Route exact path={"/admin"} component={Dashboard} />
                        {/* <Route exact path={"/forgot-password"} component={Forgot} />
                        <Route exact path={"/email-sent"} component={Email} /> */}
                        {this.props.isLoggedIn && <>                        
                            <Route exact path={"/dashboard"} component={Dashboard} />
                            <Route exact path={"/change-password"} component={Change} />
                        </>
                        }

                        <Redirect exact from="*" to="/" />
                    </Switch>
                </Router>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = ({ user: { isLoggedIn } }) => ({

    isLoggedIn

})
export default connect(mapStateToProps)(Routes);
