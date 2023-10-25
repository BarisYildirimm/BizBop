import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import FormContainer from "../components/FormContainer";

const LoginScreen = () => {
  return (
    <FormContainer>
      <h1>Sign In</h1>

      <Form onSubmit={""}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={""}
            onChange={(e) => ""}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={""}
            onChange={(e) => ""}
          ></Form.Control>
        </Form.Group>

        <Button disabled={""} type="submit" variant="primary">
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New User? <Link to={""}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
