import React, { useState, useRef } from "react";
import { Form, Card, Button, Alert } from "react-bootstrap";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./SignUp.css";

export default function SignUp() {
  const [signupFirstName, setSignupFirstName] = useState("");
  const [signupLastName, setSignupLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupAdress, setSignupAdress] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        passwordConfirmationRef.current.value
      ).then((result) => {
        console.log(result.user.uid)
        saveUserData(result.user.uid);

      })
      navigate("/dashboard");
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  }

  async function saveUserData(userUid) {
    console.log(userUid);
 
    try {
      let userData = {
        FirstName: signupFirstName,
        LastName: signupLastName,
        Email: signupEmail,
        Adress: signupAdress,
      };

      const db = getFirestore();
      await setDoc(doc(db, "Users", userUid), userData);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

  }

  return (
    <>
      <Card className="signup">
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form id="signup-form" onSubmit={handleSubmit}>
            <Form.Group id="first-name">
              <Form.Control
                type="text"
                name="firstName"
                className="inner-text"
                placeholder="First Name"
                required
                value={signupFirstName}
                onChange={(e) => {
                  setSignupFirstName(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group id="last-name">
              <Form.Control
                type="text"
                name="lastName"
                className="inner-text"
                placeholder="Last Name"
                required
                value={signupLastName}
                onChange={(e) => {
                  setSignupLastName(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group id="email">
              <Form.Control
                type="email"
                className="inner-text"
                placeholder="Email"
                required
                ref={emailRef}
                onChange={(e) => {
                  setSignupEmail(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group id="Adress">
              <Form.Control
                type="text"
                className="inner-text"
                placeholder="Adress"
                name="Adress"
                required
                value={signupAdress}
                onChange={(e) => {
                  setSignupAdress(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Control
                type="password"
                className="inner-text"
                placeholder="Password"
                name="password"
                ref={passwordRef}
                required
              />
            </Form.Group>
            <Form.Group id="password-confirmation">
              <Form.Control
                type="password"
                placeholder="Password Confirmation"
                className="inner-text"
                name="passwordConfirmation"
                ref={passwordConfirmationRef}
                required
              />
            </Form.Group>
            <Button type="submit" className="signup-btn" disabled={loading}>
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="signup-link">
        Already have an account?
        <Link to="/" className="login-link">
          Log In
        </Link>
      </div>
    </>
  );
}
