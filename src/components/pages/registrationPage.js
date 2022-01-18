import React from "react";
import "../../App.css";
import SignUp from "../authentication/SignUp";
import { Container } from "react-bootstrap";

export default function RegistrationPage() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <SignUp />
      </div>
    </Container>
  );
}
