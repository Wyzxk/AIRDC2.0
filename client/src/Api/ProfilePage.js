import axios from "axios";

// Creating an instance of Axios for user information API
const apiInfoUser = axios.create({
  baseURL: "http://127.0.0.1:8000/auth/userInfo/",
});

// Function to change username
export const changeUser = (data) => {
  return axios.post("http://127.0.0.1:8000/auth/changeUser/", data, {
    headers: {
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  });
};

// Function to insert user information
export const insertInfo = (data) => {
  return apiInfoUser.post("/", data, {
    headers: {
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  });
};

// Function to get user information
export const getInfo = (user) => {
  return apiInfoUser.get("/", {
    params: {
      user: user,
    },
    headers: {
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  });
};

// Function to update user information
export const putInfo = (data) => {
  return apiInfoUser.put("/", data, {
    headers: {
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  });
};
