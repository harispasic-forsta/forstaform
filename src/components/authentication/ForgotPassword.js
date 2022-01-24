import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Form, Card, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router";
import "./ForgotPassword.css";

export default function ForgotPassword() {
  const [resetPassword, setResetPassword] = useState("");
  let navigate = useNavigate();

  const forgotPassword = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, resetPassword);
      navigate("/");
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Card className="forgot-password">
        <Card.Body>
          <h2 className="forgot-password-body">Log In</h2>
          <Form>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                className="inner-text"
                placeholder="Email"
                required
              />
            </Form.Group>
            <div className="resetpw-btns">
            <Button
              onClick={forgotPassword}
              className="reset-btn"
              type="button"
              style={{ marginTop: "10px" }}
            >
              Rest password
            </Button>
            <Button
              onClick={forgotPassword}
              className="cancel-btn"
              type="button"
              style={{ marginTop: "10px" }}
            >
              Cancel
            </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
