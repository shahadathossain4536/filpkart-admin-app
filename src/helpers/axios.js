const { default: axios } = require("axios");
const { api } = require("../urlConfig");

const axiosIntance = axios.create({
  baseURL: api,
});

export default axiosIntance;
