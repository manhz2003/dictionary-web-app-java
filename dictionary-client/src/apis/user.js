import axios from "axios";
import queryString from "query-string";

const baseURL = "http://localhost:8081/api"; 

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export const apiLogin = (data) => {
  const formData = queryString.stringify(data);
  return axiosInstance.post("/users/login", formData);
};

export default axiosInstance;
