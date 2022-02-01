import { signInWithEmailAndPassword } from "firebase/auth";
import React, {useState} from "react";
import { Form, Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import './Login.css'



export default function Login() { 

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  let navigate = useNavigate();

  const login = async () => {
    try { 
      const user = await signInWithEmailAndPassword(
        auth, loginEmail, loginPassword
      )
      navigate('/dashboard')
      console.log(user)
       } catch (error) {
    console.log(error.message)
       }
  }

  return (
    <>
      <Card className="login">
        <Card.Body>
          <h2 className="login-body">Log In</h2>
          <Form>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" className="inner-text" placeholder="Email" required                 onChange={(e) => {
                setLoginEmail(e.target.value);
              }}/>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" className="inner-text" placeholder="Password" required                 onChange={(e) => {
                setLoginPassword(e.target.value);
              }} />
            </Form.Group>
            <Button onClick={login} className="login-btn" type="button">
              Log In
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="login-link" >
        <Link to="/forgot-password" className="forgotpwbtn">Forgot password?</Link>  <Link to="/signup" className="signupbtn">Sign Up</Link>
      </div>
    </>
  );
}