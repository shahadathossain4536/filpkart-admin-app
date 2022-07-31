import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Layout } from "../../components/Layout";
import "./style.css";
/**
 * @author
 * @function Home
 **/

export const Home = (props) => {
  return (
    <Layout>
      <Container fluid>
        <Row>
          <Col className="sidebar" md={2}>
            Side bar
          </Col>
          <Col style={{ marginLeft: "auto" }} md={10}>
            Container
          </Col>
        </Row>
      </Container>

      {/* <div className="text-center ">
        <h1 className="  py-5 ">Welcome to Admin Dashboard</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
          quaerat minus qui excepturi rerum aperiam architecto tempora, voluptas
          nostrum odit blanditiis perferendis ipsam officia consectetur
          explicabo exercitationem autem! Odit, eum.
        </p>
      </div> */}
    </Layout>
  );
};
