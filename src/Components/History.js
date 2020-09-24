import React, { useEffect, useState, useContext } from "react";
import firebase from "../util/Firebase.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";
import Template from './Template'
import { AuthContext } from "../util/Auth";
import { Grid, Typography, Button } from "@material-ui/core";


const queryString = require('query-string');


const History = () => {
  const [forms, setForms] = useState([])
  const [numbers, setNumbers] = useState({})
  const [formData, setData] = useState(null)
  const { currentUser } = useContext(AuthContext);
  
  useEffect(() => {
    let rootRef = firebase.firestore().collection('responses')
		let userRef = rootRef.doc(currentUser.uid)
		let answersRef = userRef.collection("answers")
		answersRef.orderBy("date", "desc").get().then(querySnapshot => {
			let data = []
			console.log(querySnapshot)
			querySnapshot.forEach(doc => {
				console.log(doc.id)
				if (doc && doc.exists) {
					data.push(doc.data())
				}
			});
			setData(data)
		})
  },[])



  return (
    <>
		<Typography variant="h4" align="center">История</Typography>
      {formData ? formData.map(form => {
				let d = new Date({...form.date}.seconds * 1000)
				let date = [
							d.getDate().toString().length < 2 ? '0' + d.getDate() : d.getDate(),
							(d.getMonth()+1).toString().length < 2 ? '0' + (d.getMonth()+1) : (d.getMonth()+1),
							d.getFullYear()].join('/')+' '+
              [d.getHours().toString().length < 2 ? '0' + d.getHours() : d.getHours(),
               d.getMinutes().toString().length < 2 ? '0' + d.getMinutes() : d.getMinutes(),
               d.getSeconds().toString().length < 2 ? '0' + d.getSeconds() : d.getSeconds()].join(':').toString();
			return (
				<Grid container component="link" style={{margin: 20}}>
				<Button variant="outlined" fullWidth>
					<Typography style={{flexGrow: 1, paddingRight: 20}}>{form.form_name}</Typography>
					<Typography>{date}</Typography>
				</Button>
				</Grid>
			)}) : 
			<Typography variant="h6" align="center" style={{marginTop: 20}}>Пусто</Typography>}

    </>
  );
};

export default History;
