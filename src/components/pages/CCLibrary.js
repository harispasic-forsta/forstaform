import React from "react";
import { Container } from "react-bootstrap";



import '../../App.css'
import './CCLibrary.css'




export default function CCLibrary() { 
    return (
      
      <>
      <Container className="CC-Table">
      <h2 className="CC-Library-title">CC Library</h2>
      <table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">URL</th>
      <th scope="col">Project</th>
      <th scope="col">Report</th>
      <th scope="col">Slide</th>
      <th scope="col">Subject</th>
      <th scope="col">Request</th>
      <th scope="col">Tag</th>
      <th scope="col">Attachmment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
</Container>
      </>
      
    );
  }