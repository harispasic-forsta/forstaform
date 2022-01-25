import React, { useState, useRef } from "react";
import { Form, Card, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./SignUp.css";

export default function UpdateProfile() {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const userNameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }

    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <Card className="signup">
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
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
              />
            </Form.Group>
            <Form.Group id="email">
              <Form.Control
                type="email"
                className="inner-text"
                placeholder="Email"
                required
                ref={emailRef}
                defaultValue={currentUser.email}
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
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Control
                type="password"
                className="inner-text"
                placeholder="Leave blank to keep the same"
                name="password"
                ref={passwordRef}
              />
            </Form.Group>
            <Form.Group id="password-confirmation">
              <Form.Control
                type="password"
                placeholder="Leave blank to keep the same"
                className="inner-text"
                name="passwordConfirmation"
                ref={passwordConfirmationRef}
              />
            </Form.Group>
            <Button type="submit" className="signup-btn" disabled={loading}>
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="signup-link">
        <Link to="/" className="login-link">
          Cancel
        </Link>
      </div>
    </>
  );
}
