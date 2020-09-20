import React, {Component, useContext} from 'react';
import firebase from '../util/Firebase';
import "../App.css"
import { AuthContext } from "../util/Auth";

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
      fileInputs: []
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

    uploadFiles = (event, index, subindex = null) => {
      const storageRef = firebase.storage().ref().child(this.context.currentUser.uid);

      const files = event.target.files
      Array.from(files).forEach(file => {
        const fileRef = storageRef.child(file.name)
        const task = fileRef.put(file)
        task
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then((url) => {
          let rootRef = firebase.firestore().collection("responses")
          let userRef = rootRef.doc(this.context.currentUser.uid)
          let filesRef = userRef.collection("files")
          filesRef.add(
            {
              filepath: url,
              answer_number: index,
              answer_id: this.state.id,
              answer_subnumber: subindex
            }
          ).catch(error => alert(error))
        })
        .catch(console.error);
      })
    }

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
    
  
    render () {
      return (
        <div>
          <h1 className="text-align-center">{this.state.main_title}</h1>
          {this.fileInputs.map(el => {
            let title = el.title
            let index = el.index.toString()
            let subindex = el.subindex ? el.subindex.toString() : null
            return (
              <div key={subindex ? index + '.' + subindex : index}>
                <h5>{title}</h5>
                <input disabled={this.state.locked} type="file" name="filefield" multiple="multiple" onChange={(e) => this.uploadFiles(e, index, subindex)} />
              </div>
            )
          })}
          {this.state.showAnswers ? <p style={{textAlign: "left"}}>Full answers: {JSON.stringify(this.state.answers)}</p> : null}
          {this.state.showAnswers ? <p style={{textAlign: "left"}}>Short answers: {JSON.stringify(this.state.shortAnswers)}</p> : null}
        </div>
      );
    }
  }

  export default FileUploader