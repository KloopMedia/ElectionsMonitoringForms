import React, { useEffect, useState, useContext } from "react";
import firebase from "../util/Firebase.js";
import {
  Link
} from "react-router-dom";
import { AuthContext } from "../util/Auth";
import { Grid, Typography } from "@material-ui/core";


const History = () => {
  const [formData, setData] = useState(null)
	const { currentUser } = useContext(AuthContext);
  
  useEffect(() => {
    let rootRef = firebase.firestore().collection('responses')
		let userRef = rootRef.doc(currentUser.uid)
		console.log(currentUser.uid)
		let answersRef = userRef.collection("answers")
		answersRef.orderBy("date", "desc").get().then(querySnapshot => {
			let data = []
			querySnapshot.forEach(doc => {
				if (doc && doc.exists) {
					data.push({id: doc.id, data: doc.data()})
				}
			});
			setData(data)
		})
	},[currentUser])
	
	console.log(formData)

  return (
    <>
		<Typography variant="h4" align="center">История</Typography>
      {formData ? formData.map(form => {
				let d = new Date({...form.data.date}.seconds * 1000)
				let date = [
							d.getDate().toString().length < 2 ? '0' + d.getDate() : d.getDate(),
							(d.getMonth()+1).toString().length < 2 ? '0' + (d.getMonth()+1) : (d.getMonth()+1),
							d.getFullYear()].join('/')+' '+
              [d.getHours().toString().length < 2 ? '0' + d.getHours() : d.getHours(),
               d.getMinutes().toString().length < 2 ? '0' + d.getMinutes() : d.getMinutes(),
               d.getSeconds().toString().length < 2 ? '0' + d.getSeconds() : d.getSeconds()].join(':').toString();
			return (
				<Grid container alignItems="center">
					<Link to={"/ElectionsMonitoringForms/files/" + form.id + window.location.search} style={{flexGrow: 1, paddingRight: 20}}>{form.data.form_name}</Link>
					<p>{date}</p>
				</Grid>
			)}) : 
			<Typography variant="h6" align="center" style={{marginTop: 20}}>Пусто</Typography>}
    </>
  );
};

export default History;
