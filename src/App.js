import React, {useContext, useState, useEffect} from 'react';
import "./App.css"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter, Redirect 
} from "react-router-dom";

import Home from "./Components/auth/Home";
import Login from "./Components/auth/Login";
import SignUp from "./Components/auth/SignUp";
import PrivateRoute from "./util/PrivateRoute";
import LastFileUploader from './Components/LastFileUploader'
import FileUploader from './Components/FileUploader'
import Template from './Components/Template'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { AuthContext } from "./util/Auth";
import firebase from './util/Firebase';
import { Button} from '@material-ui/core';


const useStyles = makeStyles( theme => ({
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
}));

const App = () => {
  const { currentUser } = useContext(AuthContext);
  const classes = useStyles();

  let email = ""
  if (currentUser && currentUser.email) {
    email = currentUser.email
  }

  return (
    <div>
      <AppBar position="static" className={classes.appbar}>
      <Toolbar>
        <Grid style={{flexGrow: 1}}>
          <img src="https://kloop.kg/wp-content/uploads/2017/01/kloop_transparent_site.png" alt="Kloop.kg - Новости Кыргызстана" style={{width: '180px', height: 'auto'}}/>
        </Grid>
        <Typography variant="body1" style={{color: '#003366'}}>
          {email}
        </Typography>
        {currentUser 
        ? <Button style={{marginLeft: 10, fontSize: 12}} size="small" variant="outlined" color="#003366" onClick={() => firebase.auth().signOut()}>
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
        {currentUser ? 
        <nav>
          <ul>
            <li>
              <Link to={"/ElectionsMonitoringForms/form" + window.location.search}>На главную</Link>
            </li>
            <li>
              <Link to={"/ElectionsMonitoringForms/files" + window.location.search}>Форма для отправки файлов</Link>
            </li>
          </ul>
        </nav> : <Redirect to={"/ElectionsMonitoringForms/login" + window.location.search} />}
          <Switch>
            <PrivateRoute exact path={"/ElectionsMonitoringForms/form"} component={Home} />
            <Route path="/ElectionsMonitoringForms/login" component={Login} />
            <Route path="/ElectionsMonitoringForms/signup" component={SignUp} />
            <Route path={"/ElectionsMonitoringForms/form/:form"}>
              <Template />
            </Route>
            <Route exact path="/ElectionsMonitoringForms/files" component={withRouter(FileUploader)} />
            <Route path="/ElectionsMonitoringForms/files/:id" component={withRouter(FileUploader)} />
          </Switch>
        </div>
      </Router>
      </div>
    </Grid>
    </div>
  );
}


export default App;
