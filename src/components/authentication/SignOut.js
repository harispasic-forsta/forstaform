import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

import React, { useState } from "react";
import { Form, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import "./SignOut.css";

export default function SignOut() {
  const [user, setUser] = useState({});

  let navigate = useNavigate();

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const signout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <>
      <Card className="login">
        <Card.Body>
          <Form>
            <h4> User Logged In: </h4>
            {user?.email}
            <Button className="signout-btn" onClick={signout}> Sign Out </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
