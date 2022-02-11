import React, { useState, useRef, useEffect } from "react";
import { Form, Card, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  getFirestore,
  doc,
  onSnapshot
} from "firebase/firestore";
import "./UpdateProfile.css";

export default function UpdateProfile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [adress, setAdress]= useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const[userData, setUserData] = useState("")
  let navigate = useNavigate();

  useEffect(() => {
    fetchUserData()
    }, []);


async function fetchUserData() {
  const db = getFirestore();
  const docRef = doc(db,'Users', currentUser.uid)
  onSnapshot(docRef, (doc) => {
    let userData= doc.data()
    setUserData(userData)
  })
}


  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (email.current.value) {
      promises.push(updateEmail(email.current.value));
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
      <Card id="update-profile-id" className="update-profile">
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form id="update-profile-form" >
            <Form.Group id="first-name">
              <Form.Control
                type="text"
                name="firstName"
                className="inner-text"
                placeholder="First Name"
                name="firstName"
                required
                value={userData.FirstName}
                onChange={(e) => {
                  setUserData(e.target.value);
                }}              />
            </Form.Group>
            <Form.Group id="last-name">
              <Form.Control
                type="text"
                name="lastName"
                className="inner-text"
                placeholder="Last Name"
                name="lastName"
                required
                value={userData.LastName}
                onChange={(e) => {
                  setUserData(e.target.value)
                }}
              />
            </Form.Group>
            <Form.Group id="email">
              <Form.Control
                type="email"
                className="inner-text"
                placeholder="Email"
                name="email"
                required
                value={userData.Email}
                onChange={(e) => {
                  setUserData(e.target.value)
                }}
              />
            </Form.Group>
            <Form.Group id="adress">
              <Form.Control
                type="text"
                className="inner-text"
                placeholder="Adress"
                name="adress"
                name="adress"
                required
                value={userData.Adress}
                onChange={(e) => {
                  setUserData(e.target.value)
                }}
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
              <Form.Text className="text-pw">Password </Form.Text>
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
            <Form.Text className="text-pw">Repeat Password</Form.Text>
            <Button type="button" onSubmit={handleSubmit} className="update-btn" disabled={loading}>
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="update-link">
        <Link to="/" className="cancel-link">
          Cancel
        </Link>
      </div>
    </>
  );
}
