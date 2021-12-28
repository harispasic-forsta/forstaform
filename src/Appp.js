import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { db } from './firebase';


const Contact = () => {
  const [url, setUrl] = useState('')
  const [project, setProject] = useState('')
  const [report, setReport] = useState('')
  const [slide, setSlide] = useState('')
  const [request, setRequest] = useState('')

}

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h1 style={{color: '#000'}}>Additional theme options</h1>
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
        <Form.Control type='url' style={{height:48}} value={url} onChange={(e) => setUrl(e.target.value)}/>
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
        <Form.Control type='project' style={{height:48}} value={project} onChange={(e) => setProjects(e.target.value)}/>
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
      <Form.Control type='report' style={{height:48}} value={report} onChange={(e) => setReport(e.target.value)}/>
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
    <Form.Control type='slide' style={{height:48}}  value={slide} onChange={(e) => setSlide(e.target.value)}/>
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
        <Form.Control type='subject' style={{height:48}}  value={subject} onChange={(e) => setSubject(e.target.value)}/>
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
          <Form.Control type='request' style={{height:98}}  value={request} onChange={(e) => setRequest(e.target.value)}/>
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
