import React, {Component, useContext} from 'react';
import firebase from '../util/Firebase';
import "../App.css"
import { AuthContext } from "../util/Auth";

import TextInput from "./form/textInput";
import SelectBox from "./form/selectBox";
import RadioButton from "./form/radiobutton";
import TimePickers from "./form/timePickers";
import RadioHorizontal from "./form/radioHorizontal";
import { Link, BrowserRouter as Router, withRouter, Redirect } from 'react-router-dom';

import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography'

const queryString = require('query-string');

class Template extends Component {
    state = {
      questions: [],
      main_title: '',
      gateway: '',
      answers: {},
      shortAnswers: {},
      showAnswers: false,
      response: {},
      period: null,
      locked: false,
      files: [],
      showFileUpload: false,
      snackbar: false,
      uploadSuccsess: false
    }

    static contextType = AuthContext
  
    componentDidMount() {
        this.downloadData()
    }

    downloadData = () => {
        let urlString = queryString.parse(window.location.search, {decode: false})
        console.log(this.props.data)
        this.setState({
          questions: this.props.data.questions,
          main_title: this.props.data.main_title,
          period: this.props.data.period
      })
      if (urlString.response) {
        this.initResponse(this.props.data, urlString)
      }
      if (this.props.data.period) {
        this.timeManager(this.props.data)
      }
    }
  
    uploadData = () => {
      try {
        let rootRef = firebase.firestore().collection("responses")
        let userRef = rootRef.doc(this.context.currentUser.uid)
        userRef.set({email: this.context.currentUser.email})
        let answersRef = userRef.collection("answers")
        answersRef.add(
          {
            answers: this.state.answers,
            form_name: this.state.main_title,
            form_url: this.props.url,
            date: new Date()
          }
        ).then(doc => {
          this.setState({snackbar: true, uploadSuccsess: true})
        })
        .catch(error => {
          this.setState({showAnswers: true})
          console.log(error)
        })
        console.log("data uploaded")
      }
      catch (err) {
        alert(err)
        this.setState({showAnswers: true})
      }
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

    initResponse = (data, urlString) => {
      let decodedResponse = decodeURI(urlString.response)
      let response = JSON.parse(decodedResponse)
      this.setState({response: response})
      for (const [key, value] of Object.entries(response)) {
        let id = null
        if (key === Object.keys(response)[0]) {
          this.returnAnswer(value, key)
        }
        if (data.questions[key].type === 'input') {
          this.returnAnswer(value, key)
        }
        else if (data.questions[key].type === 'time') {
          this.returnAnswer(value, key, value)
        }
        else if (data.questions[key].type === 'multiradio') {
          for (const [nestedKey, nestedValue] of Object.entries(value)) {
            let id = data.questions[key].answer.indexOf(nestedValue)
            let idArr = {...this.state.shortAnswers[key]}
            idArr[nestedKey] = id
            this.returnAnswer(value, key, idArr)
          }
        }
        else {
          id = data.questions[key].answer.indexOf(value)
          this.returnAnswer(value, key, id)
        }
      }
    }
  
    returnAnswer = (answer, index, id = null) => {
      let answers = {...this.state.answers}
      answers[index] = answer
      this.setState({answers: answers})

      let shortAnswers = {...this.state.shortAnswers}
      shortAnswers[index] = id
      this.setState({shortAnswers: shortAnswers})
    }

    handleCloseSnackbar = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      this.setState({snackbar: false})
    };

    handleRedirect = () => {
      return <Redirect to={"/ElectionsMonitoringForms/files"} />
    }
    
  
    render () {
      let questionList = this.state.questions.map((el, i) => {
        const r = this.state.response

        if (el.type === 'input') {
          return <TextInput key={i} index={i} title={el.title} response={r[i]} returnAnswer={this.returnAnswer} locked={this.state.locked} />
        }
        else if (el.type === 'select') {
          return <SelectBox key={i} index={i} title={el.title} response={r[i]} answers={el.answer} returnAnswer={this.returnAnswer} locked={this.state.locked} />
        }
        else if (el.type === 'radio') {
          return <RadioButton key={i} index={i} title={el.title} response={r[i]} answers={el.answer} returnAnswer={this.returnAnswer} locked={this.state.locked} />
        }
        else if (el.type === 'time') {
          return <TimePickers key={i} index={i} title={el.title} response={r[i]} returnAnswer={this.returnAnswer} locked={this.state.locked} />
        }
        else if (el.type === 'multiradio') {
          return <RadioHorizontal key={i} index={i} title={el.title} response={r[i]} subquestion={el.subquestion} answers={el.answer} returnAnswer={this.returnAnswer} locked={this.state.locked} />
        }
        else {
          return null
        }
      })
  
      return (
        <div>
          <Typography variant="h4" style={{padding: 20}} align="center">{this.state.main_title}</Typography>
          {this.state.period ? 
          <div>
            <p>Начало: {this.state.period.start}</p>
            <p>Конец: {this.state.period.finish}</p>
          </div> : null}
          {/* {this.state.showFileUpload ? <Redirect to={"/ElectionsMonitoringForms/files"} /> : null} */}
          {this.state.showFileUpload ? <this.handleRedirect /> : null}
          <div>
            {questionList}
            <div style={{paddingTop: 20, paddingBottom: 20, textAlign: "center"}}>
              <Button variant="outlined" style={{borderWidth: 2, borderColor: "#003366", color: '#003366', margin: 10}} disabled={this.state.locked ? true : false} onClick={this.uploadData}>Отправить</Button>
              {this.state.uploadSuccsess ? <Button variant="outlined" style={{borderWidth: 2, borderColor: "red", color: 'red', margin: 10}} disabled={this.state.locked ? true : false} onClick={() => this.setState({showFileUpload: true})}>Перейти к загрузке файлов</Button> : null }
            </div>
          </div>
          {this.state.showAnswers ? <p style={{textAlign: "left"}}>Короткий ответ: {JSON.stringify(this.state.shortAnswers)}</p> : null}
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={this.state.snackbar}
            autoHideDuration={6000}
            onClose={this.handleCloseSnackbar}
            message="Ваш ответ принят"
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

  export default withRouter(Template)