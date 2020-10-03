import React, {useContext, useState, forwardRef, useImperativeHandle} from 'react'

import CircularProgress from '@material-ui/core/CircularProgress'
import FileUploader from "react-firebase-file-uploader";
import Typography from '@material-ui/core/Typography'
import { Grid, Box } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import firebase from '../util/Firebase';
import LinearProgressWithLabel from './LinearProgressWithLabel'
import { AuthContext } from "../util/Auth";

const FirebaseFileUploader = forwardRef((props, ref) => {

    const {title, index, subindex} = props
    const { currentUser } = useContext(AuthContext);

    const [filesToUpload, setFilesToUpload] = useState(null)
    const [progress, setProgress] = useState(0)
    const [inputText, setInputText] = useState(null)
    const [isUploading, setUploading] = useState(false)
    const [success, setSuccess] = useState(false)

    let uploader = null;

    const customOnChangeHandler = (event) => {
        let files = event.target.files
        const filesToStore = [];
     
        Array.from(files).forEach(file => filesToStore.push(file));

        setFilesToUpload(filesToStore)
    }

    const handleProgress = (value) => {
        setProgress(value)
    }

    const handleTextChange = (event) => {
        setInputText(event.target.value)
    }

    useImperativeHandle(ref, () => ({

        startUpload() {
            if (filesToUpload) {
                filesToUpload.forEach(file => {
                    console.log(file)
                    uploader.startUpload(file)
                });
                if (inputText) {
                    props.uploadFilesData(null, null, index, subindex, inputText)
                }
            }
            else if (inputText) {
                props.uploadFilesData(null, null, index, subindex, inputText)
                setProgress(100)
                setSuccess(true)
            }
        }
    
    }));


    const handleUploadStart = () => {
        setProgress(0)
        setUploading(true)
        setSuccess(false)
    }

    const handleUploadError = error => {
        setUploading(false)
        alert(error)
        console.error(error);
    };

    const handleUploadSuccess = async filename => {
        const downloadURL = await firebase
          .storage()
          .ref(currentUser.uid)
          .child(filename)
          .getDownloadURL();
     
        setProgress(100)
        setUploading(false)
        setSuccess(true)
        props.uploadFilesData(filename, downloadURL, index, subindex, null)
      };
    
    

    return (
        <div key={subindex ? index + '.' + subindex : index} style={{padding: 20}}>
        <Typography variant="body1" style={{fontSize: 16, fontWeight: 'bolder'}}>{title}</Typography>
        <Grid container display="flex" style={{paddingTop: 10, paddingLeft: 20}}>
          <Typography variant="body1" style={{paddingRight: 20}}>выберите файлы</Typography>
          <FileUploader 
            storageRef={firebase.storage().ref().child(currentUser.uid)} 
            onUploadStart={handleUploadStart}
            onUploadError={handleUploadError}
            onUploadSuccess={handleUploadSuccess}
            onProgress={handleProgress}
            multiple 
            onChange={customOnChangeHandler}
            ref={instance => { uploader = instance }}
          />
        </Grid>
        <Grid container style={{paddingTop: 10, paddingLeft: 20}}>
          <Typography variant="body1" style={{paddingRight: 20}}>или введите URL</Typography>
          <input type="text" size="40" onChange={handleTextChange}/>
        </Grid>
        <Grid style={{paddingTop: 20}}>
            {isUploading ? <CircularProgress /> : null}
            <Grid container display="flex" alignItems="center">
                <Box flexGrow={1} alignItems="center"><LinearProgressWithLabel value={progress} /></Box>
                {success ? <CheckCircleOutlineIcon fontSize="large" style={{ color: 'green' }} /> : null}
            </Grid>
        </Grid>
      </div>
    )
})

export default FirebaseFileUploader