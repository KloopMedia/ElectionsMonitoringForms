import React, { useContext, useState, useEffect } from 'react';
import "./App.css"

import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  withRouter, Redirect,
  useRouteMatch
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
import { Button } from '@material-ui/core';

const queryString = require('query-string');

const useStyles = makeStyles(theme => ({
  app: {
    padding: '10px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '70%',
    },
    [theme.breakpoints.up('md')]: {
      width: '55%',
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
  const [userData, setUserData] = useState(null)
  const [forms, setForms] = useState([])
  const [numbers, setNumbers] = useState({})
  const [formData, setData] = useState(null)
  const [role, setRole] = useState(null)
  const [isMain, setMain] =useState(true)

  const { currentUser } = useContext(AuthContext);
  const classes = useStyles();


  useEffect(() => {
    if (currentUser) {
      let rootRef = firebase.firestore().collection('users')
      let userRef = rootRef.doc(currentUser.uid)
      userRef.get().then(doc => setUserData(doc.data()))
    }
  }, [])

  useEffect(() => {
    const getData = async () => {
      let rootRef = firebase.firestore().collection('users')
      let userRef = rootRef.doc(currentUser.uid)
      userRef.get().then(doc => doc.data().role ? setRole(doc.data().role) : setRole("independent"))
      let urlString = queryString.parse(window.location.search)
      if (urlString.url) {
        fetch(urlString.url)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setForms(data)
            let formData = data.map(async d => await fetch(d.url).then(r => r.json()).then(form => form))
            Promise.all(formData).then(arr => {
              setData(arr)
              // loadNumberOfFiles(arr)
            })
          });
      } else {
        console.log("ERROR: no url detected")
      }
    }
      
    if (currentUser) {
      getData()
    }
  }, [])

  const timeManager = (data) => {
    let now = new Date();
    let start = new Date(data.period.start);
    let finish = new Date(data.period.finish)

    if (start > now && data.period.before.nofill) {
      return true
    }
    else if (start < now && now < finish && data.period.in.nofill) {
      return true
    }
    else if (now > finish && data.period.after.nofill) {
      return true
    }
    else {
      return false
    }
  }

  return (
    <div>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Grid style={{ flexGrow: 1 }}>
            <img src="https://kloop.kg/wp-content/uploads/2017/01/kloop_transparent_site.png" alt="Kloop.kg - Новости Кыргызстана" style={{ width: 150, height: 'auto' }} />
          </Grid>
          {currentUser
            ? <Button style={{ borderColor: "#003366", color: '#003366', marginLeft: 10, fontSize: 12 }} size="small" variant="outlined" onClick={() => firebase.auth().signOut()}>
              выход
        </Button>
            : null
          }
        </Toolbar>
      </AppBar>
      <Grid container justify="center">
        <div className={classes.app}>
          {currentUser && userData ? <div>
          <Typography variant="body1" style={{ color: '#003366', paddingLeft: 5, paddingRight: 5 }}>
            Почта: {currentUser.email ? currentUser.email : "отсутсвует"}
          </Typography>
          <Typography variant="body1" style={{ color: '#003366', paddingLeft: 5, paddingRight: 5 }}>
            Район: {userData.district ? userData.district : "отсутсвует"}
          </Typography>
          <Typography variant="body1" style={{ color: '#003366', paddingLeft: 5, paddingRight: 5 }}>
            № УИК: {userData.polling_station ? userData.polling_station : "отсутсвует"}
          </Typography>
          <Typography variant="body1" style={{ color: '#003366', paddingLeft: 5, paddingRight: 5 }}>
            Роль: {userData.role ? userData.role : "отсутсвует"}
          </Typography>
          </div> : null}
          <Router>
            <div>
              {currentUser ?
                <nav>
                  <ul>
                    <li style={{ padding: 5 }}>
                      <Link style={{ textDecoration: 'none' }} to={"/form"} onClick={() => setMain(true)}>На главную / Башкы бетке</Link>
                    </li>
                    <li style={{ padding: 5 }}>
                      <Link style={{ textDecoration: 'none' }} to={"/files"} onClick={() => setMain(false)}>Форма для отправки файлов / Файл жөнөтүү үчүн форма</Link>
                    </li>
                    {isMain && formData && role ? <div>
                    {forms.map((el, i) => {
                      return  timeManager(formData[i]) ? null : role === el.role || el.role === 'all' || role === 'moderator' ?
                        <li key={i} style={{ padding: 5 }}>
                          <Link style={{ textDecoration: 'none' }} to={'/form' + el.path} onClick={() => setMain(false)}>{el.label}</Link>
                        </li> : null
                    })}
                    </div> : null}
          </ul>
        </nav> : <Redirect to={"/login"} />}

          <Switch>
              <PrivateRoute exact path={"/form"} component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={SignUp} />
              <Route path={"/form/:form"}>
                <Template />
              </Route>
              <Route exact path="/files" component={withRouter(FileUploader)} />
              <Route path="/files/:id" component={withRouter(FileUploader)} />
            </Switch>
        </div>
      </Router>
      </div>
    </Grid>
    </div >
  );
}


export default App;
