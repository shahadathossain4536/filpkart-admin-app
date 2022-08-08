import React, { useEffect, useState } from "react";
import { Input } from "../../../components/UI/Input";
import Modal from "../../../components/UI/Modal";
import { Col, Row } from "react-bootstrap";

const AddCategoryModal = (props) => {
  const {
    show,
    handleClose,
    modalTitle,
    categoryName,
    setCategoryName,
    parentCategory,
    setParentCategory,
    categoryList,
    handleCategoryImage,
  } = props;
  return (
    <Modal show={show} handleClose={handleClose} modalTitle={modalTitle}>
      <Row>
        <Col>
          {" "}
          <Input
            value={categoryName}
            placeholder={"Category Name"}
            type="text"
            onChange={(e) => setCategoryName(e.target.value)}
            className="form-control-sm"
          />
        </Col>
        <Col>
          {" "}
          <select
            className="form-control form-control-sm"
            value={parentCategory}
            onChange={(e) => setParentCategory(e.target.value)}
          >
            <option value={""}>select category</option>
            {categoryList.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </Col>
      </Row>
      <Row>
        {" "}
        <input
          className="form-control form-control-sm"
          type="file"
          name="categoryImage"
          onClick={handleCategoryImage}
        ></input>
      </Row>
    </Modal>
  );
};

export default AddCategoryModal;
