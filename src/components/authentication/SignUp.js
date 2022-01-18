import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Form, Card, Button } from "react-bootstrap";
import { auth } from "../../config/firebase";

export default function SignUp() {
  const [signupFirstName, setSignupFirstName] = useState("");
  const [signupLastName, setSignupLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupUserName, setSignupUserName] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupPasswordConfirmation, setSignupPasswordConfirmation] =
    useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const signup = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        signupFirstName,
        signupLastName,
        signupEmail,
        signupUserName,
        signupPassword,
        signupPasswordConfirmation
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          <Form>
            <Form.Group id="first-name">
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                className="inner-text"
                placeholder="First name"
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
                className="inner-text"
                placeholder="Last name"
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
            <Form.Group id="username">
              <Form.Label>User name</Form.Label>
              <Form.Control
                type="text"
                className="inner-text"
                placeholder="User name"
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
                required
                onChange={(e) => {
                  setSignupPasswordConfirmation(e.target.value);
                }}
              />
            </Form.Group>
            <Button
              onClick={signup}
              className="w-100"
              type="submit"
              style={{ marginTop: "10px" }}
            >
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? Log In
      </div>

      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          <Form>
            <Form.Group id="email">
              <Form.Label>User name</Form.Label>
              <Form.Control
                type="email"
                className="inner-text"
                placeholder="Email"
                required
                onChange={(e) => {
                  setLoginEmail(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                className="inner-text"
                placeholder="Password"
                required
                onChange={(e) => {
                  setLoginPassword(e.target.value);
                }}
              />
            </Form.Group>
            <Button
              onClick={login}
              className="w-100"
              type="submit"
              style={{ marginTop: "10px" }}
            >
              Log In
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">Forgot password? Sign Up</div>

      <Card>
        <Card.Body>
          <Form>
            <h4>User Logged In:</h4>
            <Button
              className="w-100"
              type="submit"
              style={{ marginTop: "10px" }}
            >
              Sign Out
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
