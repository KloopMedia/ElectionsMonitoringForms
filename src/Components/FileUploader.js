import React, {Component, useContext} from 'react';
import firebase from '../util/Firebase';
import "../App.css"
import { AuthContext } from "../util/Auth";

import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography'
import { Button, Grid } from '@material-ui/core';

const queryString = require('query-string');

class FileUploader extends Component {
    state = {
      questions: [],
      main_title: '',
      answers: {},
      id: "",
      showAnswers: false,
      period: null,
      locked: false,
      showFileUpload: false,
      fileInputs: [],
      snackbar: false,
      uploadSuccsess: false
    }

    static contextType = AuthContext
  
    componentDidMount() {
      this.loadAttachmentQuestions()
    }

    downloadData = (url) => {
        let urlString = queryString.parse(window.location.search, {decode: false})
        if (url) {
          console.log(urlString)
            fetch(url)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data)
                    this.setState({
                        questions: data.questions,
                        main_title: data.main_title,
                        period: data.period
                    })
                    if (data.period) {
                      this.timeManager(data)
                    }
                    this.renderFiles()
                    this.setState({fileInputs: this.fileInputs})
                    console.log(this.fileInputs)
                });
        } else {
            console.log("ERROR: no url detected")
        }
    }

    loadAttachmentQuestions = () => {
      let rootRef = firebase.firestore().collection('responses')
      let userRef = rootRef.doc(this.context.currentUser.uid)
      let answersRef = userRef.collection("answers")
      answersRef.orderBy("date", "desc").limit(1).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc.id, " => ", doc.data());
          if (doc && doc.exists) {
            this.setState({answers: doc.data().answers})
            this.setState({id: doc.id})
            this.downloadData(doc.data().form_url)
          }
        });
      })
      this.setState({showFileUpload: true})
    }

    // uploadFiles = (event, index, subindex = null) => {
    //   const storageRef = firebase.storage().ref().child(this.context.currentUser.uid);

    //   const files = event.target.files
    //   Array.from(files).forEach(file => {
    //     const fileRef = storageRef.child(file.name)
    //     const task = fileRef.put(file)
    //     task
    //     .then(snapshot => snapshot.ref.getDownloadURL())
    //     .then((url) => {
    //       let rootRef = firebase.firestore().collection("responses")
    //       let userRef = rootRef.doc(this.context.currentUser.uid)
    //       let filesRef = userRef.collection("files")
    //       this.setState({snackbar: true})
    //       filesRef.add(
    //         {
    //           filepath: url,
    //           answer_number: index,
    //           answer_id: this.state.id,
    //           answer_subnumber: subindex
    //         }
    //       ).catch(error => alert(error))
    //     })
    //     .catch(console.error);
    //   })
    // }

    timeManager = (data) => {
      let now = new Date();
      let start = new Date(data.period.start);
      let finish = new Date(data.period.finish)

      if (start > now && data.period.before.nofill) {
        this.setState({locked: true})
      }
      else if (start < now && now < finish && data.period.in.nofill) {
        this.setState({locked: true})
      }
      else if (now > finish && data.period.after.nofill) {
        this.setState({locked: true})
      }
      else {
        this.setState({locked: false})
      }
      console.log("LOCKED ", this.state.locked)
    }

    fileInputs = []

    renderFiles = () => {
      this.state.questions.forEach((question, i) => {
        if (question.attachMaterials) {
          if(question.type === 'multiradio') {
            if (this.state.answers[i]) {
              let keys = Object.keys(this.state.answers[i])
              keys.forEach(key => {
                console.log(key)
                if (this.state.answers[i][key] === question.subquestion[key].on) {
                  this.fileInputs.push({title: question.subquestion[key].q, index: i, subindex: key})
                }
              })
            }
          }
          else {
            this.fileInputs.push({title: question.title, index: i})
          }
        }
      })
    }

    handleCloseSnackbar = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      this.setState({snackbar: false})
    };

    files = {}
    filesData = {}

    handleFileChange = (event, index, subindex, i) => {
      this.files[i] = {file: event.target.files, index: index, subindex: subindex}
    }

    handleURLChange = (event, index, subindex, i) => {
      this.filesData[i] = {url: event.target.value, index: index, subindex: subindex}
    }

    uploadFiles = () => {
      const storageRef = firebase.storage().ref().child(this.context.currentUser.uid);

      for (const [key, value] of Object.entries(this.files)) {
        if (value.file) {
          Array.from(value.file).forEach(file => {
            const fileRef = storageRef.child(file.name)
            const task = fileRef.put(file)
            task
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then((url) => {
              let rootRef = firebase.firestore().collection("responses")
              let userRef = rootRef.doc(this.context.currentUser.uid)
              let filesRef = userRef.collection("files")
              this.setState({snackbar: true})
              console.log("Файл отправлен")
              filesRef.add(
                {
                  filepath: url,
                  answer_number: value.index,
                  answer_id: this.state.id,
                  answer_subnumber: value.subindex
                }
              ).catch(error => alert(error))
            })
            .catch(console.error);
          })
        }
      }

      for (const [key, value] of Object.entries(this.filesData)) {
        if (value.url) {
          let rootRef = firebase.firestore().collection("responses")
          let userRef = rootRef.doc(this.context.currentUser.uid)
          let filesRef = userRef.collection("files")
          this.setState({snackbar: true})
          filesRef.add(
            {
              filepath: value.url,
              answer_number: value.index,
              answer_id: this.state.id,
              answer_subnumber: value.subindex
            }
          ).catch(error => alert(error))
        }
      }
    }
    
  
    render () {
      return (
        <div>
          <Typography variant="h4" align="center">{this.state.main_title}</Typography>
          {this.fileInputs.map((el, i) => {
            let title = el.title
            let index = el.index.toString()
            let subindex = el.subindex ? el.subindex.toString() : null
            return (
              <div key={subindex ? index + '.' + subindex : index} style={{padding: 20}}>
                <Typography variant="body1" style={{fontSize: 16, fontWeight: 'bolder'}}>{title}</Typography>
                <Grid container display="flex" style={{paddingTop: 10, paddingLeft: 20}}>
                <Typography variant="body1" style={{paddingRight: 20}}>выберите файлы</Typography>
                <input disabled={this.state.locked} type="file" name="filefield" multiple="multiple" onChange={(e) => this.handleFileChange(e, index, subindex, i)} />
                </Grid>
                <Grid container style={{paddingTop: 10, paddingLeft: 20}}>
                <Typography variant="body1" style={{paddingRight: 20}}>или введите URL</Typography>
                <input type="text" size="40" onChange={(e) => this.handleURLChange(e, index, subindex, i)}/>
                </Grid>
              </div>
            )
          })}

          <Grid container justify="center" style={{paddingTop: 20, paddingBottom: 20}}>
            <Button variant="contained" onClick={this.uploadFiles}>Отправить</Button>
          </Grid>

          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={this.state.snackbar}
            autoHideDuration={5000}
            onClose={this.handleCloseSnackbar}
            message="Ваши файлы успешно отправлены"
            action={
              <React.Fragment>
                <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleCloseSnackbar}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </React.Fragment>
            }
          />
        </div>
      );
    }
  }

  export default FileUploader