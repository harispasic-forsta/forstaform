import firebase from 'firebase/compat/app'
import { initializeApp } from "firebase/app"
import "firebase/storage"
import "firebase/database"

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

export default {firebase, app};