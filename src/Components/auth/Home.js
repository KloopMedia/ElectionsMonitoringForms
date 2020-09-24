import React, { useEffect, useState, useContext } from "react";
import firebase from "../../util/Firebase.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";
import Template from './../Template'
import FileUploader from './../FileUploader'
import History from './../History'
import { AuthContext } from "../../util/Auth.js";
import { Grid } from "@material-ui/core";


const queryString = require('query-string');


const Home = () => {
  const [forms, setForms] = useState([])
  const [numbers, setNumbers] = useState({})
  const [formData, setData] = useState(null)
  const { currentUser } = useContext(AuthContext);
  
  useEffect(() => {
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
      {formData ? <div>
      <Router>
          <div>
            <nav>
              <ul>
              <li>
                <Link to={"/ElectionsMonitoringForms/" + window.location.search}>На главную</Link>
              </li>
              <br />
                {forms.map((el, i) => {
                  return timeManager(formData[i]) ? null : <Grid key={i} container>
                    <li>
                      <Link to={"/ElectionsMonitoringForms" + el.path + window.location.search}>{el.label}</Link>
                      <p>Отправлено {numbers[formData[i].main_title]} {numbers[formData[i].main_title] < 5 && numbers[formData[i].main_title] > 0 ? 'файла' : 'файлов'}</p>
                    </li>
                  </Grid>
                })}
                <br/>
                <li>
                  <Link to={"/ElectionsMonitoringForms/files" + window.location.search}>Форма для отправки файлов</Link>
                </li>
                <li>
                  <Link to={"/ElectionsMonitoringForms/history" + window.location.search}>История</Link>
                </li>
              </ul>
            </nav>

            <Switch>
              {forms.map((el, i) => (
                <Route key={i} path={"/ElectionsMonitoringForms" + el.path}>
                  {() => <Template url={el.url} path={el.path} data={formData[i]} />}
                </Route>
                ))}
                <Route exact path="/ElectionsMonitoringForms/files/:id" component={withRouter(FileUploader)} />
                <Route exact path="/ElectionsMonitoringForms/history" component={withRouter(History)} />
            </Switch>
          </div>
        </Router>
        </div> : null}
    </>
  );
};

export default Home;
