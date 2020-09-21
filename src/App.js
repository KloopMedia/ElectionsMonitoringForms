import React, {Component} from 'react';
import "./App.css"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter, Redirect 
} from "react-router-dom";

import Home from "./Components/auth/Home";
import Login from "./Components/auth/Login";
import SignUp from "./Components/auth/SignUp";
import PrivateRoute from "./util/PrivateRoute";
import FileUploader from './Components/FileUploader'

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { AuthContext } from "./util/Auth";
import firebase from './util/Firebase';
import { Button, Link } from '@material-ui/core';

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
      title: {
        fontColor: 'blue'
      }
  },
  appbar: {
    background: 'transparent', 
    boxShadow: 'none'
  },
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  toolbar: {
    padding: 0
  }
});

class App extends Component {
  static contextType = AuthContext

  handleTitleClick = () => {
    return <Redirect to="/ElectionsMonitoringForms/" />
  }

  render () {
    const { classes } = this.props;
    let email = ""
    if (this.context.currentUser && this.context.currentUser.email) {
      email = this.context.currentUser.email
    }
    return (
      <div>
        <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Typography variant="h4" className={classes.title} style={{color: '#003366'}} onClick={this.handleTitleClick}>
            kl<span style={{color: 'red'}}>oo</span>p
          </Typography>
          <Typography variant="body1" style={{color: '#003366'}}>
            {email}
          </Typography>
          {this.context.currentUser 
          ? <Button style={{marginLeft: 10, color: '#003366', fontSize: 12}} size="small" variant="outlined" color="#003366" onClick={() => firebase.auth().signOut()}>
              выход
          </Button>
          : null
          }
        </Toolbar>
      </AppBar>
      <Grid container justify="center">
      <div className={classes.app}>
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
        </div>
        </Grid>
        </div>
    );
  }
}


export default withStyles(styles, { withTheme: true })(App);
