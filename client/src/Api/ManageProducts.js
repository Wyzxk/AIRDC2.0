import axios from "axios";

// Creating an instance of Axios for user information API
const urlProducts = axios.create({
  baseURL: "http://127.0.0.1:8000/api/addProduct/",
});

// Function to change username
export const addProduct = (data) => {
  return urlProducts.post("/", data, {
    headers: {
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  });
};

export const editProduct = (data) => {
  console.log(data);
  return urlProducts.put("/", data, {
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

export const changeStatus = (id) => {
  return axios.post("http://127.0.0.1:8000/api/statusProduct/", id, {
    headers: {
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  });
};
