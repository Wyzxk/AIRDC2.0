import axios from "axios";

// Creating an instance of Axios for user information API
const urlCategory = axios.create({
  baseURL: "http://127.0.0.1:8000/api/category/",
});

// Function to change username
export const getCategory = () => {
  return urlCategory.get("/");
};

// Function to change username
export const addCategory = (data) => {
  return urlCategory.post("/", data, {
    headers: {
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  });
};

// Function to get user information
export const getIdCategory = (id) => {
  return urlCategory.get("/", {
    params: {
      id: id,
    },
    headers: {
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  });
};

// Function to update user information
export const putCategory = (data) => {
  return urlCategory.put("/", data, {
    headers: {
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  });
};

export const deleteCategory = (data) => {
  return axios.post("http://127.0.0.1:8000/api/deleteCategory/", data, {
    headers: {
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  });
};

export const getCategoryAct = (data) => {
  return urlCategory.get("/", {
    params: {
      status: data,
    },
  });
};
