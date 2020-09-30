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
  const [map, setMap] = useState(false)

  const { currentUser } = useContext(AuthContext);
  let { path, url } = useRouteMatch();
  
  useEffect(() => {
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
  },[])

  const loadData = () => {
    let urlString = queryString.parse(window.location.search)
    fetch(urlString.url)
				.then((response) => {
          console.log("RESPONSE", response)
					return response.json();
				})
				.then((data) => {
          console.log("DATA", data)
          setForms(data)
          let formData = data.map(async d => await fetch(d.url).then(r => r.json()).then(form => form))
          Promise.all(formData).then(arr => {
            setData(arr)
            // loadNumberOfFiles(arr)
          })
				});
  }

  // Количество отправленных файлов
  // const loadNumberOfFiles = (d) => {
  //   let rootRef = firebase.firestore().collection('responses')
  //   let userRef = rootRef.doc(currentUser.uid)
  //   let filesRef = userRef.collection("files")
  //   filesRef.get().then(querySnapshot => {
  //     let files = {}
  //     d.forEach(form => files[form.main_title] = 0)
  //     querySnapshot.forEach(doc => {
  //       if (doc && doc.exists) {
  //         let data = doc.data()
  //         d.forEach(form => {
  //           if (data.form_name === form.main_title) {
  //             files[form.main_title] += 1
  //           }
  //         })
  //       }
  //     });
  //     setNumbers(files)
  //   })
  // }

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
    <button onClick={loadData}>Load data test</button>
    <button onClick={() => setMap(!map)}>map</button>
    <br />
     {formData && role ? <div>
     <ul>
      {forms.map((el, i) => {
        return timeManager(formData[i]) ? null : role === el.role || el.role === 'all' || role === 'moderator' ?
          <li key={i} style={{padding: 5}}>
            <Link style={{textDecoration: 'none'}} to={url + el.path}>{el.label}</Link>
          </li> : null
      })}
      </ul>

      {map ? forms.map((el, i) => <p>{el.path}</p>) : null}

      {/* {forms.map((el, i) => {
        return timeManager(formData[i]) ? null : role === el.role || el.role === 'all' || role === 'moderator' ?
          <Grid key={i} container display="flex" alignItems="center" >
            <li></li>
            <Link to={url + el.path + window.location.search} style={{flexGrow: 1}}>{el.label}</Link>
            <p>Отправлено файлов: {numbers[formData[i].main_title]}</p>
          </Grid> : null
      })} */}

      <br/>
      
      <Switch>
        <Route exact path={path}>
          <History />
        </Route>
        {/* <Route path={path + "/:form"}>
          <Template />
        </Route> */}
      </Switch>
      </div> : null}
            
    </>
  );
};

export default Home;
