import React, { useEffect, useState, useContext } from "react";
import firebase from "../../util/Firebase.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
  useRouteMatch
} from "react-router-dom";
import Template from './../Template'
import FileUploader from './../FileUploader'
import History from './../History'
import { AuthContext } from "../../util/Auth.js";
import { Grid, Typography } from "@material-ui/core";


const queryString = require('query-string');


const Home = (props) => {
  const [forms, setForms] = useState([])
  const [numbers, setNumbers] = useState({})
  const [formData, setData] = useState(null)
  const [role, setRole] = useState(null)

  const { currentUser } = useContext(AuthContext);
  let { path, url } = useRouteMatch();
  
  useEffect(() => {
    let rootRef = firebase.firestore().collection('users')
    let userRef = rootRef.doc(currentUser.uid)
    userRef.get().then(doc => setRole(doc.data().role))
    let urlString = queryString.parse(window.location.search)
    console.log(urlString)
		if (urlString.url) {
			fetch(urlString.url)
				.then((response) => {
					console.log("RESPONSE", response)
					return response.json();
				})
				.then((data) => {
					console.log("DATA", data);
          setForms(data)
          let formData = data.map(async d => await fetch(d.url).then(r => r.json()).then(form => form))
          Promise.all(formData).then(arr => {
            setData(arr)
            loadNumberOfFiles(arr)
          })
				});
		} else {
			console.log("ERROR: no url detected")
		}
  },[])

  const loadNumberOfFiles = (d) => {
    let rootRef = firebase.firestore().collection('responses')
    let userRef = rootRef.doc(currentUser.uid)
    let filesRef = userRef.collection("files")
    filesRef.get().then(querySnapshot => {
      let files = {}
      d.forEach(form => files[form.main_title] = 0)
      querySnapshot.forEach(doc => {
        if (doc && doc.exists) {
          let data = doc.data()
          d.forEach(form => {
            if (data.form_name === form.main_title) {
              files[form.main_title] += 1
            }
          })
        }
      });
      setNumbers(files)
    })
  }

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
    <>
    <br />
     {formData && role ? <div>
      {forms.map((el, i) => {
        console.log(el.role, role)
        return timeManager(formData[i]) ? null : role === el.role || el.role === 'all' ?
          <Grid key={i} container display="flex" alignItems="center" >
            <li></li>
            <Link to={url + el.path + window.location.search} style={{flexGrow: 1}}>{el.label}</Link>
            <p>Отправлено файлов: {numbers[formData[i].main_title]}</p>
          </Grid> : null
      })}
      <br/>
      
      <Switch>
        <Route exact path={path}>
          <History />
        </Route>
        <Route path={path + "/:form"}>
          <Template />
        </Route>
      </Switch>
      </div> : null}
            
    </>
  );
};

export default Home;
