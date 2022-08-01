import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Header } from "../Header";
import "./style.css";

/**
 * @author
 * @function Layout
 **/

export const Layout = (props) => {
  return (
    <>
      <Header />
      {props.sidebar ? (
        <Container fluid>
          <Row>
            <Col className="sidebar" md={2}>
              <ul>
                <li>
                  <NavLink className="nav-link" to={"/"}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink className="nav-link" to={"/products"}>
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink className="nav-link" to={"/category"}>
                    Category
                  </NavLink>
                </li>
                <li>
                  <NavLink className="nav-link" to={"/orders"}>
                    Orders
                  </NavLink>
                </li>
              </ul>
            </Col>
            <Col style={{ marginLeft: "auto", paddingTop: "60px" }} md={10}>
              {props.children}
            </Col>
          </Row>
        </Container>
      ) : (
        props.children
      )}
    </>
  );
};
