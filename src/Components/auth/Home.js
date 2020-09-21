import React, { useEffect, useState, useContext } from "react";
import app from "../../util/Firebase.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";
import Template from './../Template'
import FileUploader from './../FileUploader'
import { AuthContext } from "../../util/Auth.js";


const queryString = require('query-string');


const Home = () => {
  const [forms, setForms] = useState([])
  const [home, setHome] = useState("")
  const [formData, setData] = useState(null)
  const { currentUser } = useContext(AuthContext);
  
  useEffect(() => {
    let urlString = queryString.parse(window.location.search)
    console.log(urlString)
    setHome(urlString.url)
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
          Promise.all(formData).then(arr => setData(arr))
				});
		} else {
			console.log("ERROR: no url detected")
		}
  },[])

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
                  return timeManager(formData[i]) ? null : <div>
                    <li key={i}>
                      <Link to={"/ElectionsMonitoringForms" + el.path + window.location.search}>{el.label}</Link>
                    </li>
                  </div>
                })}
                <br/>
                <li>
                <Link to={"/ElectionsMonitoringForms/files" + window.location.search}>Форма для отправки файлов</Link>
              </li>
              </ul>
            </nav>

            <Switch>
              {forms.map((el, i) => (
                <Route key={i} path={"/ElectionsMonitoringForms" + el.path}>
                  {() => <Template url={el.url} path={el.path} data={formData[i]} />}
                </Route>
                ))}
                <Route exact path="/ElectionsMonitoringForms/files" component={withRouter(FileUploader)} />
            </Switch>
          </div>
        </Router>
        </div> : null}
    </>
  );
};

export default Home;
