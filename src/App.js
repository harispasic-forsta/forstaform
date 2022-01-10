import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form, FormGroup } from "react-bootstrap";
import TextField from "@confirmit/react-text-field";
import Select from "@confirmit/react-select";
import firebase from "./config/firebase";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs} from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";

function App() {
  const [url, setUrl] = useState("");
  const [project, setProject] = useState("");
  const [report, setReport] = useState("");
  const [slide, setSlide] = useState("");
  const [subject, setSubject] = useState("");
  const [request, setRequest] = useState("");
  const [tagsLabel, setTagsLabel] = useState("");
  const [tagName, setTagName] = useState("");
  const [loadAllTagNames, setLoadAllTagNames] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [multipleSelectValue, setMultipleSelectValue] = useState([]);
  const [skipUrlValidation, setSkipUrlValidation] = useState(true);
  const [skipSubjectValidation, setSkipSubjectValidation] = useState(true);
  const [skipRequestValidation, setSkipRequestValidation] = useState(true);
  const [skipProjectValidation, setSkipProjectValidation] = useState(true);
  const [skipTagName, setSkipTagName] = useState(true);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [disableSave, setDisableSave] = useState(true);
  const [show, setShow] = useState(false);

  const storage = getStorage();
 
  /* Solution for loading tags Start*/
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    console.log('useEffect called. Line 39.');
    loadAllTagsFromDatabase();
  }, []);

  async function loadAllTagsFromDatabase(){
    console.log('loadAllTagsFromDatabase function called.')
    try{
      let allTagsFromDB= []
      const db = getFirestore();
      console.log('connecting and getting the collection Tags...');
      const querySnapshot = await getDocs(collection(db, "Tags"));
      querySnapshot.forEach((doc) => {
        console.log('tag found in database, adding the tag to list');
        console.log(doc.data());
        allTagsFromDB.push(doc.data())
      })

      console.log('setting the list in our variable allTags');
      setAllTags(allTagsFromDB)

      console.log('Now allTags has following values : ');
      console.log(allTagsFromDB);
    } catch (e) {
      console.error("Error loading document: ", e);
    }
  }
  /* Solution for loading tags End*/

  async function SaveNameTag() {
    console.log();

    try {
      let tagData = {
        TagName: tagName,
      };

      const db = getFirestore();
      const responseData = await addDoc(collection(db, "Tags"), tagData);
      console.log("Document written with ID: ", responseData.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const saveTagNames = (e) => {
    let tagName = [];
    attachments.forEach((element) => {
      let uniqueName = parseInt(Math.random() * 100000) + element.name;
      tagName.push(uniqueName);
      const storageRef = ref(storage, uniqueName);
      uploadBytes(storageRef, element).then((snapshot) => {
        console.log("Upload done");
        console.log(snapshot);
      });
    });
    SaveNameTag(tagName);
  };

  async function SaveFormData(fileNames) {
    console.log(fileNames);

    try {
      let orderData = {
        Attachmments: fileNames,
        Project: project,
        Report: report,
        Request: request,
        Slide: slide,
        Subject: subject,
        URL: url,
        Tags: tagsLabel,
      };

      const db = getFirestore();
      const responseData = await addDoc(collection(db, "Orders"), orderData);
      console.log("Document written with ID: ", responseData.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  //uploading files to saveformdata with uniquename and id
  const uploadFiles = (e) => {
    let fileNames = [];
    attachments.forEach((element) => {
      let uniqueName = parseInt(Math.random() * 100000) + element.name;
      fileNames.push(uniqueName);
      const storageRef = ref(storage, uniqueName);
      uploadBytes(storageRef, element).then((snapshot) => {
        console.log("Upload done");
        console.log(snapshot);
      });
    });
    SaveFormData(fileNames);
  };

  const onAttachmentChange = (e) => {
    setAttachments(Array.from(e.target.files));
  };

  async function submitFormData() {
    if (checkRequiredFields()) {
      console.log("Show error messages");
    } else {
      uploadFiles();
    }
    //if(validationFailed ()) return neka error poruka
  }
  const checkRequiredFields = () => {
    let hasErrors = true;
    if (
      project.length > 0 &&
      url.length > 0 &&
      subject.length > 0 &&
      request.length > 0
    ) {
      setDisableSubmit(false);
      console.log("enableButton");
      hasErrors = false;
    } else {
      setDisableSubmit(true);
    }
    return hasErrors;
  };

  useEffect(() => {
    checkRequiredFields();
  }, [project, url, subject, request]);

  async function submitAddedTags() {
    if (checkAddedTags()) {
      console.log("Show error messages");
    } else {
      saveTagNames();
    }
  }

  const checkAddedTags = () => {
    let hasErrors = true;
    if (tagName.length > 0) {
      setDisableSave(false);
      console.log("enableSave");
      hasErrors = false;
    } else {
      setDisableSave(true);
    }
    return hasErrors;
  };

  useEffect(() => {
    checkAddedTags();
  }, [tagName]);
  

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
                type="url"
                id="url"
                label="URL"
                name="URL"
                required
                className="URL-input-field"
                helperText={
                  url.length > 0 || skipUrlValidation ? "" : "Please enter URL"
                }
                onChange={(newValue) => {
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
                required
                className="Project-input-field"
                helperText={
                  project.length > 0 || skipProjectValidation
                    ? ""
                    : "Please enter project"
                }
                onChange={(newValue) => {
                  setProject(newValue);
                  setSkipProjectValidation(false);
                }}
                placeholder="Enter project name/code/ID"
                showClear={true}
                value={project}
                error={
                  project.length > 0 || skipProjectValidation ? false : true
                }
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
                type="text"
                min="1"
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
                required
                className="Subject-input-field"
                helperText={
                  subject.length > 0 || skipSubjectValidation
                    ? ""
                    : "Please enter subject"
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
                required
                className="Request-input-field"
                helperText={
                  request.length > 0 || skipRequestValidation
                    ? ""
                    : "Please enter request"
                }
                onChange={(newValue) => {
                  setRequest(newValue);
                  setSkipRequestValidation(false);
                }}
                placeholder="request"
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
                onChange={onAttachmentChange}
              />
            </Form.Group>
            <Select
              value={multipleSelectValue}
              isMulti={true}
              isSearchable={true}
              isClearable={true}
              label="Tags"
              className="tags-Label"
              id="tagLabel"
              name="tagsLabel"
              placeholder="Select tag"
              onChange={(newValue) => {
                setTagsLabel(newValue);
                setMultipleSelectValue();
              }}
              showClear={true}
              value={tagsLabel}
            >
              <Select.Option value="1">Navbar</Select.Option>
              <Select.Option value="2">Home</Select.Option>
              <Select.Option value="3">Sign in</Select.Option>
              <Select.Option value="4">Register</Select.Option>
              <Select.Option value="5">Contact</Select.Option>
              <Select.Option value="6">Services</Select.Option>
            </Select>
            {show ? (
              <TextField
                id="tagName"
                label="Tag Name"
                name="tagName"
                className="enter-tag-field"
                helperText={tagName.length > 0 || skipTagName ? "" : ""}
                onChange={(newValue) => {
                  setTagName(newValue);
                  setSkipTagName(false);
                }}
                value={tagName}
                showClear={true}
              />
            ) : null}
            {show ? (
              <div>
                <button
                  type="save"
                  className="btn btn-primary btn-sx btn-save"
                  id="saveTag"
                  onClick={submitAddedTags}
                  disabled={disableSave}
                >
                  Save tag
                </button>
              </div>
            ) : null}
            <div className="btn-newTag-wapper">
              <button
                type="submit"
                className="btn btn-primary btn-sx btn-add"
                id="NewTags"
                onClick={() => setShow(!show)}
              >
                + New tag
              </button>
            </div>
          </Col>
        </Row>
        <div className="btn-submit-wrapper">
          <button
            type="submit"
            className="btn btn-primary btn-sx btn-submit"
            onClick={submitFormData}
            id="submit"
            disabled={disableSubmit}
          >
            Submit
          </button>
        </div>
        {submitFormData ? (
          <div className="success-message">Submitted successfully</div>
        ) : null}
      </Container>
    </header>
  );
}

export default App;
