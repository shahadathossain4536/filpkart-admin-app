import axios from "../helpers/axios";

export const addProduct = (from) => {
  return async (dispatch) => {
    const res = await axios.post("product/cerate", from);
    console.log(res);
  };
};
