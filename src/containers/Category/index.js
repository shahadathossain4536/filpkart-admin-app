import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  getAllCategory,
  updateCategories,
  deleteCategories as deleteCategoriesAction,
} from "../../actions";
import { Layout } from "../../components/Layout";
import { Input } from "../../components/UI/Input";
import Modal from "../../components/UI/Modal";
import CheckboxTree from "react-checkbox-tree";

import {
  IoCheckboxOutline,
  IoCheckbox,
  IoArrowDownOutline,
  IoArrowForward,
} from "react-icons/io5";

import { IoIosCheckboxOutline } from "react-icons/io";

import "react-checkbox-tree/lib/react-checkbox-tree.css";

/**
 * @author
 * @function Category
 **/

const Category = (props) => {
  const category = useSelector((state) => state.category);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [show, setShow] = useState(false);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => {
    const form = new FormData();

    form.append("name", categoryName);
    form.append("parentId", parentCategory);
    form.append("categoryImage", categoryImage);
    dispatch(addCategory(form));
    setCategoryName("");
    setParentCategory("");

    // const cat = {
    //   categoryName,
    //   parentCategory,
    //   categoryImage,
    // };
    // console.log(cat);
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push({
        label: category.name,
        value: category._id,
        children:
          category.children?.length > 0 && renderCategories(category.children),
      });
    }
    return myCategories;
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
      });
      if (category.children?.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  const updateCategory = () => {
    updateCheckedExpandedCategories();
    setUpdateCategoryModal(true);
  };

  const updateCheckedExpandedCategories = () => {
    const categories = createCategoryList(category.categories);
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId == category.value
        );
        category && checkedArray.push(category);
      });

    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId == category.value
        );
        category && expandedArray.push(category);
      });

    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
    // console.log({ checked, expanded, categories, checkedArray, expandedArray });
  };

  const handleCategoryInput = (key, value, index, type) => {
    if (type == "checked") {
      const updatedCheckedArray = checkedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setCheckedArray(updatedCheckedArray);
    } else if (type == "expanded") {
      const updatedExpandedArray = expandedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setExpandedArray(updatedExpandedArray);
    }
  };
  // () => setUpdateCategoryModal(false)

  const updateCategoriesFrom = () => {
    const form = new FormData();

    expandedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });
    checkedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });
    dispatch(updateCategories(form)).then((result) => {
      if (result) {
        dispatch(getAllCategory());
      }
    });
    expandedArray.forEach((item, index) => {});

    setUpdateCategoryModal(false);
  };
  const renderUpdateCategoriesModal = () => {
    return (
      <Modal
        show={updateCategoryModal}
        handleClose={updateCategoriesFrom}
        modalTitle={"Update Categories"}
        size="lg"
      >
        <Row>
          <Col>
            <h6>Expanded</h6>
          </Col>
        </Row>
        {expandedArray.length > 0 &&
          expandedArray.map((item, index) => (
            <Row>
              <Col>
                <Input
                  value={item.name}
                  placeholder={"Category Name"}
                  onChange={(e) =>
                    handleCategoryInput(
                      "name",
                      e.target.value,
                      index,
                      "expanded"
                    )
                  }
                />
              </Col>

              <Col>
                <select
                  className="form-control"
                  value={item.parentId}
                  onChange={(e) =>
                    handleCategoryInput(
                      "parentId",
                      e.target.value,
                      index,
                      "expanded"
                    )
                  }
                >
                  <option value={""}>select category</option>
                  {createCategoryList(category.categories).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </Col>
              <Col>
                <select className="form-control">
                  <option value="">Select Type</option>
                  <option value="store">Store</option>
                  <option value="product">Product</option>
                  <option value="page">Page</option>
                </select>
              </Col>
            </Row>
          ))}
        <h6>Checked Categories</h6>
        {checkedArray.length > 0 &&
          checkedArray.map((item, index) => (
            <Row>
              <Col>
                <Input
                  value={item.name}
                  placeholder={"Category Name"}
                  onChange={(e) =>
                    handleCategoryInput(
                      "name",
                      e.target.value,
                      index,
                      "checked"
                    )
                  }
                />
              </Col>

              <Col>
                <select
                  className="form-control"
                  value={item.parentId}
                  onChange={(e) =>
                    handleCategoryInput(
                      "parentId",
                      e.target.value,
                      index,
                      "checked"
                    )
                  }
                >
                  <option value={""}>select category</option>
                  {createCategoryList(category.categories).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </Col>
              <Col>
                <select className="form-control">
                  <option value="">Select Type</option>
                  <option value="store">Store</option>
                  <option value="product">Product</option>
                  <option value="page">Page</option>
                </select>
              </Col>
            </Row>
          ))}

        {/* <input
        className="form-control"
        type="file"
        name="categoryImage"
        onClick={handleCategoryImage}
      ></input> */}
      </Modal>
    );
  };

  const renderAddCategoryModal = () => {
    return (
      <Modal
        show={show}
        handleClose={handleClose}
        modalTitle={"Add New Category"}
      >
        <Input
          label="Category Name"
          value={categoryName}
          placeholder={"Category Name"}
          type="text"
          onChange={(e) => setCategoryName(e.target.value)}
        />

        <select
          className="form-control"
          value={parentCategory}
          onChange={(e) => setParentCategory(e.target.value)}
        >
          <option value={""}>select category</option>
          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        <input
          className="form-control"
          type="file"
          name="categoryImage"
          onClick={handleCategoryImage}
        ></input>
      </Modal>
    );
  };

  const deleteCategory = () => {
    updateCheckedExpandedCategories();
    setDeleteCategoryModal(true);
  };

  const deleteCategories = () => {
    const checkedIdArray = checkedArray.map((item, index) => ({
      _id: item.value,
    }));
    const expandedIdCArray = expandedArray.map((item, index) => ({
      _id: item.value,
    }));
    const idsArray = expandedIdCArray.concat(checkedIdArray);
    dispatch(deleteCategoriesAction(idsArray)).then((result) => {
      if (result) {
        dispatch(getAllCategory());
        setDeleteCategoryModal(false);
      }
    });
  };
  const renderDeleteCategoryModal = () => {
    // console.log("delete", checkedArray);
    return (
      <Modal
        modalTitle="Confirm"
        show={deleteCategoryModal}
        handleClose={() => setDeleteCategoryModal(false)}
        button={[
          {
            label: "NO",
            color: "primary",
            onClick: () => {
              alert("no");
            },
          },
          {
            label: "YES",
            color: "danger",
            onClick: deleteCategories,
          },
        ]}
      >
        <h5>Expanded</h5>
        {expandedArray.map((item, index) => (
          <span key={index}>{item.name}</span>
        ))}
        <h5>Checked</h5>
        {checkedArray.map((item, index) => (
          <span key={index}>{item.name}</span>
        ))}
      </Modal>
    );
  };
  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h1>Category</h1>
              <Button variant="primary" onClick={handleShow}>
                Add
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {/* <ul>{renderCategories(category.categories)}</ul> */}

            <CheckboxTree
              nodes={renderCategories(category.categories)}
              checked={checked}
              expanded={expanded}
              onCheck={(checked) => setChecked(checked)}
              onExpand={(expanded) => setExpanded(expanded)}
              icons={{
                check: <IoCheckbox />,
                uncheck: <IoIosCheckboxOutline />,
                halfCheck: <IoIosCheckboxOutline />,
                expandClose: <IoArrowForward />,
                expandOpen: <IoArrowDownOutline />,
                // expandAll: <span className="rct-icon rct-icon-expand-all" />,
                // collapseAll: (
                //   <span className="rct-icon rct-icon-collapse-all" />
                // ),
                // parentClose: (
                //   <span className="rct-icon rct-icon-parent-close" />
                // ),
                // parentOpen: <span className="rct-icon rct-icon-parent-open" />,
                // leaf: <span className="rct-icon rct-icon-leaf" />,
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <button onClick={deleteCategory}>Delete</button>
            <button onClick={updateCategory}>Edit</button>
          </Col>
        </Row>
      </Container>
      {renderAddCategoryModal()}
      {/* Edit Categories */}
      {renderUpdateCategoriesModal()}
      {renderDeleteCategoryModal()}
    </Layout>
  );
};

export default Category;
