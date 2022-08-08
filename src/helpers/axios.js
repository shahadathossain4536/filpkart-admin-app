import { authConstants } from "../actions/constants";
import store from "../store";
const { default: axios } = require("axios");
const { api } = require("../urlConfig");

const token = window.localStorage.getItem("token");
const axiosIntance = axios.create({
  baseURL: api,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

axiosIntance.interceptors.request.use((req) => {
  const { auth } = store.getState();
  if (auth.token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});
axiosIntance.interceptors.request.use(
  (res) => {
    return res;
  },
  (error) => {
    console.log(error.response);
    const { status } = error.response;
    if (status === 500) {
      localStorage.clear();
      store.dispatch({ type: authConstants.LOGOUT_SUCCESS });
    }
    return Promise.reject(error);
  }
);

export default axiosIntance;
