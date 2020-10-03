import React, {useState, useEffect, useContext} from 'react';
import firebase from '../util/Firebase';
import "../App.css"
import { AuthContext } from "../util/Auth";

import TextInput from "./form/textInput";
import SelectBox from "./form/selectBox";
import RadioButton from "./form/radiobutton";
import TimePickers from "./form/timePickers";
import RadioHorizontal from "./form/radioHorizontal";
import { withRouter, useParams, Redirect } from 'react-router-dom';

import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import AssignmentIcon from '@material-ui/icons/Assignment';
import Tooltip from '@material-ui/core/Tooltip'

const queryString = require('query-string');

const Template = (props) => {

    const [data, setData] = useState([])
    const [fullAnswers, setFull] = useState({})
    const [shortAnswers, setShort] = useState({})
    const [response, setResponse] = useState({})
    const [locked, setLocked] = useState(false)
    const [snackbar, setSnackbar] = useState(false)
    const [showFileUpload, setFileUpload] = useState(false)
    const [uploadSuccsess, setSuccess] = useState(false)
    const [showAnswers, setShowAnswers] = useState(false)
    const [ready, setReady] = useState(false)
    const [formData, setForm] = useState(null)
    const [message, setMessage] = useState(null)
    const [connection, setConnection] = useState(true)
    const [userData, setUserData] = useState(null)

    const { currentUser } = useContext(AuthContext);
    let { form } = useParams();
  
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
            data.forEach(d => {
              if (d.path === '/' + form) {
                setForm(d)
                fetch(d.url).then(r => r.json()).then(f => {
                  setData(f)
                  setReady(true)
                  if (urlString.response) {
                    initResponse(f, urlString)
                  }
                  if (f.period) {
                    timeManager(f)
                  }
                  console.log(f)
                })
              }
            })
          });
      } else {
        console.log("ERROR: no url detected")
      }
    },[])

    useEffect(() => {
      if (currentUser) {
        let rootRef = firebase.firestore().collection('users')
        let userRef = rootRef.doc(currentUser.uid)
        userRef.get().then(doc => setUserData(doc.data()))
      }
    }, [])

    const checkOnlineStatus = async () => {
      try {
        let district = ""
        if (props.user.district) {
          district = props.user.district
        }
        let polling_station = ""
        if (props.user.polling_station) {
          polling_station = props.user.polling_station
        }
        setMessage({
          answers: shortAnswers, 
          form_name: data.main_title, 
          form_url: formData.url, 
          identifier: data.identifier, 
          user_id: currentUser.uid, 
          user_email: currentUser.email,
          polling_station: polling_station,
          district: district
        })
        const online = await fetch("https://raw.githubusercontent.com/KloopMedia/ElectionsMonitoringFormsConfig/master/config.json", {cache: "no-store"})
        .then(r => {
          uploadData()
          console.log('internet')
        })
        .catch(err => {
          setShowAnswers(true)
          console.log('no internet')
        })
        return online.status >= 200 && online.status < 300; // either true or false
      } catch (err) {
        // setShowAnswers(true)
        return false; // definitely offline
      }
    };
  
    const uploadData = async () => {
      try {
        
        let district = ""
        if (userData.district) {
          district = userData.district
        }
        let polling_station = ""
        if (userData.polling_station) {
          polling_station = userData.polling_station
        }
        let geolocation = ""
        if ("geolocation" in navigator) {
          await getLocation()
          .then(position => geolocation = position)
          .catch(error => geolocation = error)
        } else {
          geolocation = "Not Available"
        }

        console.log(geolocation)

        let rootRef = firebase.firestore().collection("responses")
        let userRef = rootRef.doc(currentUser.uid)
        let answersRef = userRef.collection("answers")
        answersRef.add(
          {
            answers: shortAnswers,
            identifier: data.identifier,
            form_name: data.main_title,
            form_url: formData.url,
            date: new Date(),
            user_id: currentUser.uid,
            user_email: currentUser.email,
            polling_station: polling_station,
            district: district,
            geolocation: geolocation
          }
        ).then(doc => {
          setSnackbar(true)
          setSuccess(true)
        })
        .catch(error => {
          setShowAnswers(true)
          console.log(error)
        })
        console.log("data uploaded")
      }
      catch (err) {
        alert(err)
        setShowAnswers(true)
      }
    }

    const getLocation = () => {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          position => {
            resolve({
              timestamp: position.timestamp, 
              latitude : position.coords.latitude, 
              longitude : position.coords.longitude
            })
          },
          error => {
            reject(error.message)
          }
        );
      });
    }

    const timeManager = (data) => {
      let now = new Date();
      let start = new Date(data.period.start);
      let finish = new Date(data.period.finish)

      if (start > now && data.period.before.nofill) {
        setLocked(true)
      }
      else if (start < now && now < finish && data.period.in.nofill) {
        setLocked(true)
      }
      else if (now > finish && data.period.after.nofill) {
        setLocked(true)
      }
      else {
        setLocked(false)
      }
      console.log("LOCKED ", locked)
    }

    const initResponse = (data, urlString) => {
      let decodedResponse = decodeURI(urlString.response)
      let response = JSON.parse(decodedResponse)
      setResponse(response)
      for (const [key, value] of Object.entries(response)) {
        let id = null
        if (key === Object.keys(response)[0]) {
          returnAnswer(value, key)
        }
        if (data.questions[key].type === 'input') {
          returnAnswer(value, key)
        }
        else if (data.questions[key].type === 'time') {
          returnAnswer(value, key, value)
        }
        else if (data.questions[key].type === 'multiradio') {
          for (const [nestedKey, nestedValue] of Object.entries(value)) {
            let id = data.questions[key].answer.indexOf(nestedValue)
            let idArr = {...shortAnswers[key]}
            idArr[nestedKey] = id
            returnAnswer(value, key, idArr)
          }
        }
        else {
          id = data.questions[key].answer.indexOf(value)
          returnAnswer(value, key, id)
        }
      }
    }
  
    const returnAnswer = (answer, index, id = null) => {
      let answers = {...fullAnswers}
      answers[index] = answer
      setFull(answers)

      let short = {...shortAnswers}
      short[index] = id
      setShort(short)
    }

    const handleCloseSnackbar = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setSnackbar(false)
    };

    const HandleRedirect = () => {
      return <Redirect to={"/files"} />
    }
    
    let questionList = ready ? data.questions.map((el, i) => {
      const r = response

      if (el.type === 'input') {
        return <TextInput key={i} index={i} title={el.title} response={r[i]} returnAnswer={returnAnswer} locked={locked} />
      }
      else if (el.type === 'select') {
        return <SelectBox key={i} index={i} title={el.title} response={r[i]} answers={el.answer} returnAnswer={returnAnswer} locked={locked} />
      }
      else if (el.type === 'radio') {
        return <RadioButton key={i} index={i} title={el.title} response={r[i]} answers={el.answer} returnAnswer={returnAnswer} locked={locked} />
      }
      else if (el.type === 'time') {
        return <TimePickers key={i} index={i} title={el.title} response={r[i]} returnAnswer={returnAnswer} locked={locked} />
      }
      else if (el.type === 'multiradio') {
        return <RadioHorizontal key={i} index={i} title={el.title} response={r[i]} subquestion={el.subquestion} answers={el.answer} returnAnswer={returnAnswer} locked={locked} />
      }
      else {
        return null
      }
    }) : null
  
    return (
      <div>
        <Typography variant="h4" style={{padding: 20}} align="center">{data.main_title}</Typography>
        {data.period ? 
        <div>
          <p>Начало: {data.period.start}</p>
          <p>Конец: {data.period.finish}</p>
        </div> : null}
        {showFileUpload ? <Redirect to={"/files"} /> : null}
        {/* {showFileUpload ? <HandleRedirect /> : null} */}
        <div>
          {questionList}
          {showAnswers ? 
          <div style={{paddingTop: 30, paddingBottom: 20}}>
            <Typography variant="h5" align="center">Нет интернет соединения:</Typography>
            <Typography variant="h6" align="center">Отправьте текст ниже (вместе с фигурными скобками)</Typography>
            <Box border={3} borderRadius={16} borderColor="primary.main" style={{borderStyle: "dashed", position: 'relative'}}>
              <Box position="absolute" top={0} right={0}>
                <Tooltip title="Скопировать в буфер обмена">
                  <IconButton aria-label="copy" size="small" onClick={() => {navigator.clipboard.writeText(JSON.stringify(message))}}>
                    <AssignmentIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <Typography variant="body1" fullwidth style={{textAlign: "left", overflowWrap: "anywhere", padding: 10}}>{JSON.stringify(message)}</Typography>
            </Box>
          </div>
        : null}
          <div style={{paddingTop: 20, paddingBottom: 20, textAlign: "center"}}>
            <Button variant="outlined" style={{borderWidth: 2, borderColor: "#003366", color: '#003366', margin: 10}} disabled={locked ? true : false} onClick={checkOnlineStatus}>Отправить</Button>
            {uploadSuccsess ? <Button variant="outlined" style={{borderWidth: 2, borderColor: "red", color: 'red', margin: 10}} disabled={locked ? true : false} onClick={() => setFileUpload(true)}>Перейти к загрузке файлов</Button> : null }
          </div>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={snackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message="Ваш ответ принят"
          action={
            <React.Fragment>
              <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </div>
    );
  }

  export default withRouter(Template)