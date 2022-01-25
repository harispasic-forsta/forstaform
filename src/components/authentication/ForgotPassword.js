import React, { useState, useRef } from "react";
import { Form, Card, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./ForgotPassword.css";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }

    setLoading(false);
  }

  return (
    <>
      <Card className="forgot-password">
        <Card.Body>
          <h2 className="forgot-password-body">Password Reset</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Control
                type="email"
                className="inner-text"
                placeholder="Email"
                required
                ref={emailRef}
              />
            </Form.Group>
            <div className="resetpw-btns">
              <Button className="reset-btn" type="submit" disabled={loading}>
                Reset Password
              </Button>
            </div>
            
              <Link to="/" className="login-link">
                Log In
              </Link>
          </Form>
        </Card.Body>
      </Card>
      <div>
        Need an account?{" "}
        <Link className="forgotpw-signup-link" to="/signup">
          Sign Up
        </Link>
      </div>
    </>
  );
}
