import React, { useState } from "react";
import { Form, Card, Button, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./SignOut.css";

export default function SignOut() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  let navigate = useNavigate();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <Card className="signout">
        <Card.Body>
          <h2 className="login-body">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <div className="update-logout-btn">
            <Link to="/update-profile" className="btn btn-primary mt-10">
              Update Profile
            </Link>
            <Button  className="signout-btn" onClick={handleLogout}>
              {" "}
              Log Out{" "}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
