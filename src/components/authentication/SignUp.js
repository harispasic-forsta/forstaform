import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { Form, Card, Button } from "react-bootstrap";
import { auth } from "../../config/firebase";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import './SignUp.css'

export default function SignUp() {
  const [signupFirstName, setSignupFirstName] = useState("");
  const [signupLastName, setSignupLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupUserName, setSignupUserName] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupPasswordConfirmation, setSignupPasswordConfirmation] =
    useState("");
  const [user, setUser] = useState({});
 
    let navigate = useNavigate();

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const signup = async () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
      .then((userCredential) => {

        // Signed in
        const user = userCredential.user;
        console.log("Sign In Success");
        console.log(user);
        saveUserData();
        navigate('/dashboard')
      })
      .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("error code :", errorCode)
    console.log("error msg :", errorMessage)
      });
  
  };

  async function saveUserData() {
    console.log();

    try {
      let userData = {
        FirstName: signupFirstName,
        LastName: signupLastName,
        Email: signupEmail,
        UserName: signupUserName,
      };

      const db = getFirestore();
      const responseData = await addDoc(collection(db, "Users"), userData);
      console.log("Document written with ID: ", responseData.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

  }

 

  return (
    <>
      <Card className="signup" >
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          <Form id="signup-form">
            <Form.Group id="first-name">
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                className="inner-text"
                placeholder="First Name"
                required
                onChange={(e) => {
                  setSignupFirstName(e.target.value);
                }}
              />
            </Form.Group> 
            <Form.Group id="last-name">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                className="inner-text"
                placeholder="Last Name"
                required
                onChange={(e) => {
                  setSignupLastName(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                className="inner-text"
                placeholder="Email"
                required
                onChange={(e) => {
                  setSignupEmail(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group id="user-name">
              <Form.Label>User name</Form.Label>
              <Form.Control
                type="text"
                className="inner-text"
                placeholder="User Name"
                name="userName"
                required
                onChange={(e) => {
                  setSignupUserName(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                className="inner-text"
                placeholder="Password"
                name="password"
                required
                onChange={(e) => {
                  setSignupPassword(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group id="password-confirmation">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password Confirmation"
                className="inner-text"
                name="passwordConfirmation"
                required
                onChange={(e) => {
                  setSignupPasswordConfirmation(e.target.value);
                }}
              />
            </Form.Group>
          <Button
              onClick={signup}
              className="w-100"
              type="button"
              className="signup-btn"
            >
              Sign Up
            </Button> 
          </Form>
        </Card.Body>
      </Card>
      <div className="signup-link" >
        Already have an account?  <Link to="/" className="login-link">Log In</Link>
      </div>
    </>
  );
}
