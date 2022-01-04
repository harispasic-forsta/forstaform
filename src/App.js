import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form, FormGroup } from "react-bootstrap";
import TextField from "@confirmit/react-text-field";

import { initializeApp } from "firebase/app"

import { getFirestore } from "firebase/firestore"
import { collection, addDoc } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyBcUqVmf4TLj_pYxAPMbOR3YyZcTCmZrTQ",
  authDomain: "forstaform.firebaseapp.com",
  databaseURL: "https://forstaform-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "forstaform",
  storageBucket: "forstaform.appspot.com",
  messagingSenderId: "873517026551",
  appId: "1:873517026551:web:b526b754d3f3e2bf81d7f2",
  measurementId: "G-SY6ER4E30B"
};
const app = initializeApp(firebaseConfig);

function App() {
  const [url, setUrl] = useState("");
  const [project, setProject] = useState("");
  const [report, setReport] = useState("");
  const [slide, setSlide] = useState("");
  const [subject, setSubject] = useState("");
  const [request, setRequest] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [skipUrlValidation, setSkipUrlValidation] = useState(true);
  const [skipSubjectValidation, setSkipSubjectValidation] = useState(true);
  const [skipRequestValidation, setSkipRequestValidation] = useState(true);
  /* const [skipAttachmentsValidation, setSkipAttachmentsValidation] = useState(true);*/

  
    const Push = () => {
    uploadFiles()
    app
      .database()
      .ref()
      .set({
        url: url,
        project: project,
        report: report,
        slide: slide,
        subject: subject,
        request: request,
        attachments : "To do add attachments",
      })
      .catch(alert);
  };

  const uploadFiles = (e) => {
    const storageRef = app.storage().ref()
   attachments.forEach(element => {
      const fileRef = storageRef.child(element.name);
      fileRef.put(element).then((data) => {
        console.log(data)
        console.log("To do succes message")
      });
    });
  };

   const onChange = (e) => {
    setAttachments(Array.from(e.target.files))
  }

  /*
  const submitButton = document.getElementById("submit")
  const input = document.getElementById("url") 
  input.addEventListener('keypress', (e) => {
    const value = e.currentTarget.value;
    submitButton.disabled = false;
    if (value === "" ) {
      submitButton.disabled = true;
    } 
  })*/

  async function submitFormData() {
    console.log('TO DO , validacija podataka. Da nisu prazni?');

    //if(validationFailed) return neka error poruka

    try {
      let orderData = {
        Attachmments:'aaapoad1201023123',
        Project:project,
        Report:'Report ID or name',
        Request:'Lorem ipsum',
        Slide:'5',
        Subject:'Please add this CC to someting',
        URL:'www.google.com',
      }
      
      const db = getFirestore();
      const responseData = await addDoc(collection(db, "Orders"), orderData );
      console.log("Document written with ID: ", responseData.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <header className="App">
      <h1 className="title">Additional theme options</h1>
      <Container>
        <Row>
          <Col>
            <FormGroup controlId="formURL">
              <Form.Text className="text-muted">
                Dapresy server where this should be implemented
              </Form.Text>
              <TextField
                id="url"
                label="URL"
                name="URL"
                className="URL-input-field"
                helperText={
                  url.length > 0 || skipUrlValidation ? "" : "URL required"
                }
                onChange={ 
                  (newValue) => {
                  setUrl(newValue);
                  setSkipUrlValidation(false);
                }}
                placeholder="Enter installation URL"
                showClear={true}
                value={url}
                error={url.length > 0 || skipUrlValidation ? false : true}
              />
            </FormGroup>
          </Col>
          <Col>
            <Form.Group controlId="formProject">
              <Form.Text className="text-muted">
                Project name/code/ID where this should be imlemented
              </Form.Text>
              <TextField
                id="project"
                label="Project"
                name="Project"
                className="Project-input-field"
                onChange={(newValue) => {
                  setProject(newValue);
                }}
                placeholder="Enter project name/code/ID"
                showClear={true}
                value={project}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="formReport">
              <Form.Text className="text-muted">
                If code applies to specific report, please specify report
                name/id
              </Form.Text>
              <TextField
                id="report"
                label="Report"
                name="Report"
                className="Report-input-field"
                onChange={(newValue) => {
                  setReport(newValue);
                }}
                placeholder="Enter report name/ID"
                showClear={true}
                value={report}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formSlide">
              <Form.Text className="text-muted">
                If code applies to specific slides, please specify
              </Form.Text>
              <TextField
                id="slide"
                label="Slide"
                name="Slide"
                className="Slide-input-field"
                onChange={(newValue) => {
                  setSlide(newValue);
                }}
                placeholder="Enter slide number"
                showClear={true}
                value={slide}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="formSubject">
              <Form.Text className="text-muted">
                Brief description of your request
              </Form.Text>
              <TextField
                id="subject"
                label="Subject"
                name="Subject"
                className="Subject-input-field"
                helperText={
                  subject.length > 0 || skipSubjectValidation
                    ? ""
                    : "Subject required"
                }
                onChange={(newValue) => {
                  setSubject(newValue);
                  setSkipSubjectValidation(false);
                }}
                placeholder="Enter subject"
                showClear={true}
                value={subject}
                error={
                  subject.length > 0 || skipSubjectValidation ? false : true
                }
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="formRequest">
              <Form.Text className="text-muted">
                Please fill in all details of your request, you may also attach
                a pdf/doc etc with full details
              </Form.Text>
              <TextField
                id="request"
                label="Request"
                name="Request"
                className="Request-input-field"
                helperText={
                  request.length > 0 || skipRequestValidation
                    ? ""
                    : "Request required"
                }
                onChange={(newValue) => {
                  setRequest(newValue);
                  setSkipRequestValidation(false);
                }}
                placeholder="Enter request"
                showClear={true}
                value={request}
                error={
                  request.length > 0 || skipRequestValidation ? false : true
                }
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            
              <Form.Group controlId="formAttachments">
                <Form.Text className="text-muted">
                  Max 10 files and 10 mb per file
                </Form.Text>
                <Form.Control
                  className="attachmentsblock"
                  name="file"
                  type="file"
                  multiple
                  onChange={onChange}
                />
              </Form.Group>
            
          </Col>
        </Row>
        <div className="btn-submit-wrapper">
          <button className="btn btn-primary btn-sx btn-submit" onClick={submitFormData} id="submit" >
            Submit
          </button>
        </div>
      </Container>
    </header>
  );
}

export default App;
