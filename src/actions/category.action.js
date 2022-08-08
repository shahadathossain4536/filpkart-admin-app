import axios from "../helpers/axios";
import { categoryConstants } from "./constants";

export const getAllCategory = () => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.GET_ALL_CATEGORIES_REQUEST });
    const res = await axios.get("category/getCategory");
    console.log(res);

    if (res.status === 200) {
      const { categoryList } = res.data;
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
        payload: { categories: categoryList },
      });
    } else {
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const addCategory = (form) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.ADD_NEW_CATEGORIES_REQUEST });

    try {
      const res = await axios.post("/category/cerate", form);
      if (res.status === 201) {
        dispatch({
          type: categoryConstants.ADD_NEW_CATEGORIES_SUCCESS,
          payload: { category: res.data.category },
        });
      } else {
        dispatch({
          type: categoryConstants.ADD_NEW_CATEGORIES_FAILURE,
          payload: res.data.error,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const updateCategories = (form) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.ADD_NEW_CATEGORIES_REQUEST });
    const res = await axios.post("/category/update", form);
    if (res.status === 201) {
      return true;
      console.log(res);
    } else {
      console.log(res);
    }
  };
};
export const deleteCategories = (ids) => {
  return async (dispatch) => {
    const res = await axios.post("/category/delete", {
      payload: {
        ids,
      },
    });
    if (res.status == 201) {
      return true;
    } else {
      return false;
    }
  };
};
