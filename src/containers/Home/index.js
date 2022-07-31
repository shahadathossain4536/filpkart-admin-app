import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
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
            <ul>
              <li>
                <NavLink to={"/"}>Home</NavLink>
              </li>
              <li>
                <NavLink to={"/products"}>Products</NavLink>
              </li>
              <li>
                <NavLink to={"/orders"}>Orders</NavLink>
              </li>
            </ul>
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
