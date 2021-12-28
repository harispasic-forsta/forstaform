import React, { useState } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { app } from './config/firebase'


function App() {

  const onChange = (e) => {
    const file = e.targett.files[0];
    const storageRef = app.storage().ref()
    const fileRef = storageRef.child(file.name)
    fileRef.put(file).then(() => {
      console.log('Upload a file')
    })
  }
  return (
    <div className="App">
      <header className="App-header">
      <h1 style={{color:'#000',  }}>Additional theme options</h1>
      <Container>
      <Form>
      <Row>
      <Col>
      <Form.Group controlId='formURL'>
      <Form.Label style={{color:'#000', display:'flex', justifyContent: 'left', marginTop:20}}>
      URL
      </Form.Label>
      <Form.Text className='text-muted' >
      Dapresy server where this should be implemented
      </Form.Text>
        <Form.Control type='url' style={{height:48}}/>
        </Form.Group>
        </Col>
      <Col>
      <Form.Group controlId='formProject'>
      <Form.Label style={{color:'#000', display:'flex', justifyContent: 'left', marginTop:20}}>
        Project
        </Form.Label>
      <Form.Text className='text-muted'>
        Project name/code/ID where this should be imlemented
        </Form.Text>
        <Form.Control type='project' style={{height:48}}/>
        </Form.Group>
      </Col>
      </Row>
      </Form>
      <Form>
      <Row>
      <Col>
      <Form.Group controlId='formReport'>
      <Form.Label style={{color:'#000', display:'flex', justifyContent: 'left', marginTop:20}}>
      Report
      </Form.Label>
      <Form.Text className='text-muted'>
      If code applies to specific report, please specify report name/id
      </Form.Text>
      <Form.Control type='report' style={{height:48}} />
      </Form.Group>
    </Col>
    <Col>
    <Form.Group controlId='formSlide'>
    <Form.Label style={{color:'#000', display:'flex', justifyContent: 'left', marginTop:20}}>
    Slide
    </Form.Label>
    <Form.Text className='text-muted'>
    If code applies to specific slides, please specify
    </Form.Text>
    <Form.Control type='slide' style={{height:48}}/>
    </Form.Group>
    </Col>
  </Row>
  </Form>
  <Form>
      <Row>
      <Col>
      <Form.Group controlId='formSubject'>
      <Form.Label style={{color:'#000', display:'flex', justifyContent: 'left', marginTop:20}}>
      Subject
      </Form.Label>
      <Form.Text className='text-muted'>
      Brief description of your request
      </Form.Text>
        <Form.Control type='subject' style={{height:48}}/>
        </Form.Group>
        </Col>
        </Row>
        </Form>
        <Form>
        <Row>
        <Col>
        <Form.Group controlId='formRequest'>
        <Form.Label style={{color:'#000', display:'flex', justifyContent: 'left', marginTop:20}}>
        Request
        </Form.Label>
        <Form.Text className='text-muted'>
        Please fill in all details of your request, you may also attach a pdf/doc etc with full details
        </Form.Text>
          <Form.Control type='request' style={{height:98}} />
          </Form.Group>
          </Col>
          </Row>
          </Form>
          <Form>
          <Row>
          <Col>
          <Form.Group controlId='formAttachments'>
          <Form.Label style={{color:'#000', display:'flex', justifyContent: 'left', marginTop:20}}>
          Attachments
          </Form.Label>
          <Form.Text className='text-muted'>
          Max 10 files and 10 mb per file
          </Form.Text>
          <input type='file' onChange={onChange} />
            <Form.Control type='attachments' style={{height:120}} />
            </Form.Group>
            </Col>
            </Row>
            </Form>
          <div class='text-center'>
      <Button class="btn btn-primary btn-sx" type="submit" style={{marginTop:20}}>Submit</Button>
      </div>
      </Container>
      </header>
    </div>
  );
}

export default App;
