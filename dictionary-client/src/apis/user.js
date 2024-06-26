import axios from "../axios";

export const apiLogin = (data) =>
  axios({
    url: "/users/login",
    method: "post",
    data,
  });
  
export const apiRegister = (data) =>
  axios({
    url: "/register/user",
    method: "post",
    data,
  });
