const { default: axios } = require("axios");
const { api } = require("../urlConfig");

const token = window.localStorage.getItem("token");
const axiosIntance = axios.create({
  baseURL: api,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

export default axiosIntance;
