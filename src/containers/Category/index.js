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

import {
  IoIosAdd,
  IoIosCheckboxOutline,
  IoIosCloudUpload,
  IoIosTrash,
} from "react-icons/io";

import "react-checkbox-tree/lib/react-checkbox-tree.css";
import UpdateCategoriesModal from "./components/UpdateCategoriesModal";
import AddCategoryModal from "./components/AddCategoryModal";
import "./style.css";
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

  useEffect(() => {
    if (!category.loading) {
      setShow(false);
    }
  }, [category.loading]);
  const handleClose = () => {
    const form = new FormData();
    if (categoryName == "") {
      alert("Category name is required");
      setShow(false);
      return;
    }
    form.append("name", categoryName);
    form.append("parentId", parentCategory);
    form.append("categoryImage", categoryImage);
    dispatch(addCategory(form));
    setCategoryName("");
    setParentCategory("");

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
        type: category.type,
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
    dispatch(updateCategories(form));
    expandedArray.forEach((item, index) => {});
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

    if (checkedIdArray.length > 0) {
      dispatch(deleteCategoriesAction(checkedIdArray)).then((result) => {
        if (result) {
          dispatch(getAllCategory());
          setDeleteCategoryModal(false);
        }
      });
    }
    setDeleteCategoryModal(false);
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

  const categoryList = createCategoryList(category.categories);
  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h1>Category</h1>
              {/* <Button variant="primary" className="btn-sm">
                Add
              </Button> */}

              <div className="actionBtnContainer">
                <span>Action: </span>
                <button onClick={handleShow}>
                  {" "}
                  <IoIosAdd /> <span>Add</span>
                </button>
                <button onClick={deleteCategory}>
                  <IoIosTrash /> <span>Delete</span>
                </button>
                <button onClick={updateCategory}>
                  <IoIosCloudUpload /> <span>Edit</span>
                </button>
              </div>
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
              }}
            />
          </Col>
        </Row>
      </Container>

      <AddCategoryModal
        show={show}
        handleClose={() => setShow(false)}
        onSubmit={handleClose}
        modalTitle={"Add New Categories"}
        categoryName={categoryName}
        setCategoryName={setCategoryName}
        parentCategory={parentCategory}
        setParentCategory={setParentCategory}
        categoryList={categoryList}
        handleCategoryImage={handleCategoryImage}
      />

      {/* Edit Categories */}
      <UpdateCategoriesModal
        show={updateCategoryModal}
        handleClose={() => setUpdateCategoryModal(false)}
        onSubmit={updateCategoriesFrom}
        modalTitle={"Update Categories"}
        size="lg"
        expandedArray={expandedArray}
        checkedArray={checkedArray}
        handleCategoryInput={handleCategoryInput}
        categoryList={categoryList}
      />
      {/* {renderAddCategoryModal()} */}

      {renderDeleteCategoryModal()}
    </Layout>
  );
};

export default Category;
