import React from 'react';
import {app} from './base'

function Upload() {
    const onChange = (e) => {
      const file = e.target.files[0];
      const storageRef = app.storage().ref()
      const fileRef = storageRef.child(file.name)
      fileRef.put(file).then(() => {
        console.log("Uploaded a file")
      })
    }
  
    return (
      <input type="file" onChange={onChange}/>
    );
  }
  
  export default Upload;