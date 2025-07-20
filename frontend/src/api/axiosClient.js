import axios from "axios";

const axiosClient = (token) => axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`
  }
});

export default axiosClient;
