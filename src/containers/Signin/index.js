import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Layout } from "../../components/Layout";
import { Input } from "../../components/UI/Input";
import { login } from "../../actions";
import { useDispatch } from "react-redux";
/**
 * @author
 * @function Signin
 **/

export const Signin = (props) => {
  const dispatch = useDispatch();

  const userLogin = (e) => {
    e.preventDefault();
    const user = {
      email: "shahadat@gmail.com",
      password: "123456",
    };

    dispatch(login(user));
  };

  return (
    <Layout>
      <Container>
        <Row>
          <Col className="my-5" md={{ span: 6, offset: 3 }}>
            <Form onSubmit={userLogin}>
              <Input
                label="Email"
                placeholder="Email"
                value=""
                type="email"
                onChange={() => {}}
              />

              <Input
                label="Password"
                placeholder="Password"
                value=""
                type="password"
                onChange={() => {}}
              />

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};
