import React, { useState } from "react";
import { Input } from "../Input";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
/**
 * @author
 * @function NewModal
 **/

const NewModal = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    const form = new FormData();

    setShow(false);
  };
  const handleShow = () => setShow(true);
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={props.handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewModal;
