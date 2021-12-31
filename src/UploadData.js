import React, {useState} from 'react';
import { app } from './config/firebase'

function UploadData() {
const [url , setUrl] = useState();
const [project , setProject] = useState();
const [report , setReport] = useState();
const [slide , setSlide] = useState();
const [subject , setSubject] = useState();
const [request , setRequest] = useState();


	
// Push Function
const Push = () => {
	app.ref("user").set({
	url : url,
	project : project,
    report : report,
    slide : slide,
    subject : subject,
    request : request,
	}).catch(alert);
}

return (
	<div className="uploadData" style={{marginTop : 250}}>
	<center>
	<input placeholder="Enter your url" value={url}
	onChange={(e) => setUrl(e.target.value)}/>
	<input placeholder="Enter your project" value={project}
	onChange={(e) => setProject(e.target.value)}/>
    <input placeholder="Enter your report" value={report}
	onChange={(e) => setReport(e.target.value)}/>
	<input placeholder="Enter your slide" value={slide}
	onChange={(e) => setSlide(e.target.value)}/>
    <input placeholder="Enter your subject" value={subject}
	onChange={(e) => setSubject(e.target.value)}/>
	<input placeholder="Enter your request" value={request}
	onChange={(e) => setRequest(e.target.value)}/>
	<button onClick={Push}>Submit</button>
	</center>
	</div>
);
}

export default UploadData;


