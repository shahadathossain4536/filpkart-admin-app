import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Layout } from "../../components/Layout";
import { Input } from "../../components/UI/Input";
import { isUserLoggedIn, login } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, useLocation, useNavigate } from "react-router-dom";
/**
 * @author
 * @function Signin
 **/

export const Signin = (props) => {
  const [email, setEamil] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  let navigate = useNavigate();

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, []);

  const userLogin = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };

    dispatch(login(user));
  };

  const token = window.localStorage.getItem("token");

  if (auth.authenticate) {
    return <Navigate to={"/"} />;
  }
  return (
    <Layout>
      <Container>
        <Row>
          <Col className="my-5" md={{ span: 6, offset: 3 }}>
            <Form onSubmit={userLogin}>
              <Input
                label="Email"
                placeholder="Email"
                value={email}
                type="email"
                onChange={(e) => setEamil(e.target.value)}
              />

              <Input
                label="Password"
                placeholder="Password"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
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
