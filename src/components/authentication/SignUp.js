import React, { useState, useRef } from "react";
import { Form, Card, Button, Alert } from "react-bootstrap";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./SignUp.css";

export default function SignUp() {
  const [signupFirstName, setSignupFirstName] = useState("");
  const [signupLastName, setSignupLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupUserName, setSignupUserName] = useState("");
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const userNameRef = useRef();
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
        firstNameRef.current.value,
        lastNameRef.current.value,
        userNameRef.current.value,
        passwordRef.current.value,
        passwordConfirmationRef.current.value
      );
      saveUserData();
      navigate("/dashboard");
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  }

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
                ref={firstNameRef}
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
                ref={lastNameRef}
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
            <Form.Group id="user-name">
              <Form.Control
                type="text"
                className="inner-text"
                placeholder="User Name"
                name="userName"
                ref={userNameRef}
                required
                onChange={(e) => {
                  setSignupUserName(e.target.value);
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
