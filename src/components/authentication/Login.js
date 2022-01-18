import React from "react";
import { Form, Card, Button } from "react-bootstrap";



export default function Login() { 

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          <Form>
            <Form.Group id="username">
              <Form.Label>User name</Form.Label>
              <Form.Control type="text" className="inner-text" placeholder="User name" required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" className="inner-text" placeholder="Password" required />
            </Form.Group>
            <Button className="w-100" type="submit" style={{marginTop:"10px"}}>
              Log In
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Forgot password? Sign Up
      </div>
    </>
  );
}