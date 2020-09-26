import React, { useContext, useEffect, useState} from 'react';
import firebase from '../util/Firebase';
import "../App.css"
import { AuthContext } from "../util/Auth";
import { useParams } from 'react-router-dom';

import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography'
import { Button, Grid } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'


const FileUploader = (props) => {
  const [data, setData] = useState([])
  const [fullAnswers, setAnswers] = useState({})
  const [locked, setLocked] = useState(false)
  const [snackbar, setSnackbar] = useState(false)
  const [noAttachments, setNo] = useState(true)
  const [inputs, setInputs] = useState([])
  const [formId, setId] = useState(null)
  const [spinner, setSpinner] = useState(false)
  const [progress, setProgress] = useState(0)

  const { currentUser } = useContext(AuthContext);
  let { id } = useParams();

  let files = {}
  let filesData = {}
  // let progress = 0
  let fileInputs = []

  useEffect(() => {
    loadAttachmentQuestions()
  }, [])

  const loadAttachmentQuestions = () => {
    let rootRef = firebase.firestore().collection('responses')
    let userRef = rootRef.doc(currentUser.uid)
    let answersRef = userRef.collection("answers")
    if (id) {
      answersRef.doc(id).get().then(doc => {
        setAnswers(doc.data().answers)
        setId(doc.id)
        downloadData(doc.data())
      })
    }
    else {
      answersRef.orderBy("date", "desc").limit(1).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc.id, " => ", doc.data());
          if (doc && doc.exists) {
            setAnswers(doc.data().answers)
            setId(doc.id)
            downloadData(doc.data())
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
      console.log(d)
      setData(d)
      if (d.period) {
        timeManager(d)
      }
      renderFiles(d, fd.answers)
      console.log(fullAnswers)
      setInputs(fileInputs)
      console.log(fileInputs)
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
            console.log("ANS", a)
            let keys = Object.keys(a[i])
            keys.forEach(key => {
              console.log(key)
              if (a[i][key] === question.subquestion[key].on) {
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
    setSnackbar(true)
  };

  const handleFileChange = (event, index, subindex, i) => {
    files[i] = {file: event.target.files, index: index, subindex: subindex}
  }

  const handleURLChange = (event, index, subindex, i) => {
    filesData[i] = {url: event.target.value, index: index, subindex: subindex}
  }

  const uploadFiles = () => {
    const storageRef = firebase.storage().ref().child(currentUser.uid);
    let filesCount = 0
    setProgress(0)
    setSpinner(true)
    Object.values(files).forEach(f => {
      Array.from(f.file).forEach(sf => filesCount += 1)
    })
    Object.values(filesData).forEach(f => filesCount += 1)
    let increment = 1 / filesCount * 100
    console.log("COUNT", filesCount)
    let allFiles = Object.values(files).concat(Object.values(filesData))
    allFiles.forEach((value, i) => {
      if (value.file) {
        Array.from(value.file).forEach(file => {
          const fileRef = storageRef.child(file.name)
          const task = fileRef.put(file)
          task
          .then(snapshot => snapshot.ref.getDownloadURL())
          .then((url) => {
            let rootRef = firebase.firestore().collection("responses")
            let userRef = rootRef.doc(currentUser.uid)
            setSnackbar(true)
            let filesRef = userRef.collection("files")
            console.log("Файл отправлен")
            filesRef.add(
              {
                filepath: url,
                answer_number: value.index,
                answer_id: formId,
                answer_subnumber: value.subindex,
                form_name: data.main_title,
                date: new Date()
              }
            ).then(() => setSpinner(false)).catch(error => alert(error))
          })
          .catch(console.error);
        })
      }
    
      if (value.url) {
        let rootRef = firebase.firestore().collection("responses")
        let userRef = rootRef.doc(currentUser.uid)
        setSnackbar(true)
        let filesRef = userRef.collection("files")
        console.log("Файл отправлен")
        filesRef.add(
          {
            filepath: value.url,
            answer_number: value.index,
            answer_id: formId,
            answer_subnumber: value.subindex,
            form_name: data.main_title,
            date: new Date()
          }
        ).then(() => setSpinner(false)).catch(error => alert(error))
      }
    }
    )
  }

  const increaseProgress = (value) => {
    let p = progress
    setProgress(p + value)
  }

  const LinearProgressWithLabel = (props) => {
    return (
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={1}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2" color="textSecondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

  // const handleFinish = () => {
  //   setSpinner(false)
  //   setSnackbar(true)
  //   console.log(progress)
  // }
  
  return (
    <div>
      <br />
      <Typography variant="h4" align="center">{data.main_title}</Typography>
      {inputs.map((el, i) => {
        let title = el.title
        let index = el.index.toString()
        let subindex = el.subindex ? el.subindex.toString() : null
        return (
          <div key={subindex ? index + '.' + subindex : index} style={{padding: 20}}>
            <Typography variant="body1" style={{fontSize: 16, fontWeight: 'bolder'}}>{title}</Typography>
            <Grid container display="flex" style={{paddingTop: 10, paddingLeft: 20}}>
              <Typography variant="body1" style={{paddingRight: 20}}>выберите файлы</Typography>
              <input disabled={locked} type="file" name="filefield" multiple="multiple" onChange={(e) => handleFileChange(e, index, subindex, i)} />
            </Grid>
            <Grid container style={{paddingTop: 10, paddingLeft: 20}}>
              <Typography variant="body1" style={{paddingRight: 20}}>или введите URL</Typography>
              <input type="text" size="40" onChange={(e) => handleURLChange(e, index, subindex, i)}/>
            </Grid>
          </div>
        )
      })}
      {Array.isArray(inputs) && inputs.length ? <div>
        <Grid container justify="center" style={{paddingTop: 20, paddingBottom: 20}}>
          <Button variant="contained" onClick={uploadFiles}>Отправить</Button>
        </Grid>
        
        <Grid container justify="center">
          {spinner ? <CircularProgress /> : null}
        </Grid>
        {/* <LinearProgressWithLabel value={progress} /> */}
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