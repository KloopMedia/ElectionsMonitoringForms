import React, {Component} from 'react';
import "./App.css"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter 
} from "react-router-dom";

import Home from "./Components/auth/Home";
import Login from "./Components/auth/Login";
import SignUp from "./Components/auth/SignUp";
import { AuthProvider } from "./util/Auth";
import PrivateRoute from "./util/PrivateRoute";
import FileUploader from './Components/FileUploader'

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  app: {
      padding: '10px',
      [theme.breakpoints.down('sm')]: {
          width: '100%',
        },
      [theme.breakpoints.up('sm')]: {
      width: '70%',
      },
      [theme.breakpoints.up('md')]: {
      width: '50%',
      },
  }
});

class App extends Component {

  render () {
    const { classes } = this.props;
    return (
      
      <Grid container justify="center">
      <div className={classes.app}>
      <AuthProvider>
         <Router>
          <div>
            {/* <nav>
              <li>
                  <Link to={"/?url" + window.location.search}>Home</Link>
              </li>
            </nav> */}

              <PrivateRoute exact path={"/ElectionsMonitoringForms/"} component={Home} />
              <Route exact path="/ElectionsMonitoringForms/login" component={Login} />
              <Route exact path="/ElectionsMonitoringForms/signup" component={SignUp} />
              <Route exact path="/ElectionsMonitoringForms/files" component={withRouter(FileUploader)} />
          </div>
        </Router>
        </AuthProvider>
        </div>
        </Grid>
    );
  }
}


export default withStyles(styles, { withTheme: true })(App);
