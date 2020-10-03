import React, { useContext, useEffect, useState, useRef } from 'react';
import firebase from '../util/Firebase';
import "../App.css"
import { AuthContext } from "../util/Auth";
import { useParams } from 'react-router-dom';
import FirebaseFileUploader from './FirebaseFileUploader'

import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography'
import { Button, Grid } from '@material-ui/core';


const FileUploader = (props) => {
  const [data, setData] = useState([])
  const [fullAnswers, setAnswers] = useState({})
  const [locked, setLocked] = useState(false)
  const [snackbar, setSnackbar] = useState(false)
  const [inputs, setInputs] = useState([])
  const [formId, setId] = useState(null)
  const [formAnswer, setFormAnswer] = useState(null)
  const [userData, setUserData] = useState(null)
  const [pollingStation, setPollingStation] = useState(null)

  const { currentUser } = useContext(AuthContext);
  let { id } = useParams();

  let fileInputs = []

  useEffect(() => {
    loadAttachmentQuestions()
  }, [])

  useEffect(() => {
    if (currentUser) {
      let rootRef = firebase.firestore().collection('users')
      let userRef = rootRef.doc(currentUser.uid)
      userRef.get().then(doc => setUserData(doc.data()))
    }
  }, [])

  const loadAttachmentQuestions = () => {
    let rootRef = firebase.firestore().collection('responses')
    let userRef = rootRef.doc(currentUser.uid)
    let answersRef = userRef.collection("answers")
    if (id) {
      answersRef.doc(id).get().then(doc => {
        setAnswers(doc.data().answers)
        setId(doc.id)
        if (doc.data().identifier === "form_mobile") {
          console.log("UIK NUMBER", doc.data().answers[0])
          if (doc.data().answers[0]) {
            setPollingStation(doc.data().answers[0])
          }
          else {
            setPollingStation("")
          }
        }
        downloadData(doc.data())
        setFormAnswer(doc.data())
      })
    }
    else {
      answersRef.orderBy("date", "desc").limit(1).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc.id, " => ", doc.data());
          if (doc && doc.exists) {
            setAnswers(doc.data().answers)
            setId(doc.id)
            if (doc.data().identifier === "form_mobile") {
              console.log("UIK NUMBER", doc.data().answers[0])
              if (doc.data().answers[0]) {
                setPollingStation(doc.data().answers[0])
              }
              else {
                setPollingStation("")
              }
            }
            downloadData(doc.data())
            setFormAnswer(doc.data())
          }
        });
      })
    }
  }

  const downloadData = (fd) => {
    fetch(fd.form_url)
    .then((response) => {
      return response.json();
    })
    .then((d) => {
      setData(d)
      if (d.period) {
        timeManager(d)
      }
      renderFiles(d, fd.answers)
      setInputs(fileInputs)
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

  const renderFiles = (d, a) => {
    d.questions.forEach((question, i) => {
      if (question.attachMaterials) {
        if(question.type === 'multiradio') {
          if (a[i]) {
            let keys = Object.keys(a[i])
            keys.forEach(key => {
              if (a[i][key].toString() === question.subquestion[key].on) {
                fileInputs.push({title: question.subquestion[key].q, index: i, subindex: key})
              }
            })
          }
        }
        else {
          fileInputs.push({title: question.title, index: i})
        }
      }
    })
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar(false)
  };


  const uploadFilesData = async (filename, url, index, subindex, textInput ) => {
    let polling_station = ""
    if (userData.polling_station) {
      polling_station = userData.polling_station
    }
    
    if (data.identifier === 'form_mobile') {
      polling_station = pollingStation
    }
    let district = ""
      if (userData.district) {
        district = userData.district
    }

    let rootRef = firebase.firestore().collection("responses")
    let userRef = rootRef.doc(currentUser.uid)
    let filesRef = userRef.collection("files")
    console.log("Файл отправлен")
    if (filename && url) {
      filesRef.add(
        {
          public_url: url,
          filename: filename,
          answer_number: index,
          answer_id: formId,
          answer_subnumber: subindex,
          form_name: data.main_title,
          date: new Date(),
          identifier: data.identifier,
          user_id: currentUser.uid,
          user_email: currentUser.email,
          form_url: formAnswer.form_url,
          polling_station: polling_station,
          district: district
        }
      )
    }

    if (textInput) {
      filesRef.add(
        {
          public_url: textInput,
          answer_number: index,
          answer_id: formId,
          answer_subnumber: subindex,
          form_name: data.main_title,
          date: new Date(),
          identifier: data.identifier,
          user_id: currentUser.uid,
          user_email: currentUser.email,
          form_url: formAnswer.form_url,
          polling_station: polling_station,
          district: district
        }
      )
    }
  };


  const uploadsRef = useRef([]);

  useEffect(() => {
    uploadsRef.current = uploadsRef.current.slice(0, inputs.length);
  }, [inputs]);

  const upload = () => {
    uploadsRef.current.forEach(ref => ref.startUpload())
  }
  
  return (
    <div>
      <br />
      <Typography variant="h4" align="center">{data.main_title}</Typography>
      {inputs.map((el, i) => {
        let title = el.title
        let index = el.index.toString()
        let subindex = el.subindex ? el.subindex.toString() : null
        return (
          <FirebaseFileUploader
            ref={el => uploadsRef.current[i] = el}
            key={i}
            title={title} 
            index={index} 
            subindex={subindex}
            uploadFilesData={uploadFilesData} 
          />
        )
      })}
      {Array.isArray(inputs) && inputs.length ? <div>
        <Grid container justify="center" style={{paddingTop: 20, paddingBottom: 20}}>
          <Button variant="contained" onClick={upload}>Отправить</Button>
        </Grid>
      </div> : <Typography variant="h6" align="center">К этой форме нельзя приложить файл</Typography>
      }

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        message="Ваши файлы успешно отправлены"
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

  export default FileUploader