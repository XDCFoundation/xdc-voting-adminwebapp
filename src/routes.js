import React from 'react';
import {Router, Route} from 'react-router-dom';
import {Redirect, Switch} from "react-router";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {connect} from "react-redux";
// import {Forgot} from "./modules";

import {Login} from "./modules";
import Forgot from './modules/forgot';
import Email from './modules/forgot/emailComponent';
import Dashboard from './modules/dashboard/dashboardComponent'
import {history} from "./managers/history";
import BaseComponent from "./modules/baseComponent";

class Routes extends BaseComponent {

    componentDidMount() {

    }

    render() {
        return (

            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <Router history={history}>
                    <Switch>
                        <Route exact path={'/'} component={Login}/>
                        <Route exact path={'/forgot-password'} component={Forgot}/>
                        <Route exact path={'/email-sent'} component={Email}/>
                        <Route exact path={'/dashboard'} component={Dashboard}/>

                        <Redirect exact from='*' to="/"/>
                    </Switch>
                </Router>
            </MuiThemeProvider>);
    }
}

const mapStateToProps = (state) => {
    return {user: state.user}
};
export default connect(mapStateToProps)(Routes);