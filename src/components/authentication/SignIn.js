import { Form, Card, Button, Alert } from "react-bootstrap";
import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./SignIn.css";

export default function SignIn() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signin } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await signin(emailRef.current.value, passwordRef.current.value);
      navigate("/dashboard");
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  }

  return (
    <>
      <Card className="login">
        <Card.Body>
          <h2 className="login-body">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" className="email-box">
              <Form.Control
                type="email"
                className="inner-text"
                placeholder="Email"
                required
                ref={emailRef}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Control
                type="password"
                className="inner-text"
                placeholder="Password"
                required
                ref={passwordRef}
              />
            </Form.Group>
            <Button className="login-btn" type="submit" disabled={loading}>
              Log In
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="login-link">
        <Link to="/forgot-password" className="forgotpwbtn">
          Forgot password?
        </Link>
        <Link to="/signup" className="signupbtn">
          Sign Up
        </Link>
      </div>
    </>
  );
}
