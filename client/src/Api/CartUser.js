import axios from "axios";

// Creating an instance of Axios for user information API
const urlCartGet = axios.create({
  baseURL: "http://127.0.0.1:8000/api/getCart/",
});

const urlCart = axios.create({
  baseURL: "http://127.0.0.1:8000/api/addToCart/",
});

export const getCart = (id) => {
  return urlCartGet.post("/", id);
};

export const addToCart = (data) => {
  return urlCart.post("/", data, {
    headers: {
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  });
};

export const addQuantityCart = (data) => {
  return axios.post("http://127.0.0.1:8000/api/addQuantityCart/", data, {
    headers: {
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  });
};

export const RemoveQuantityCart = (data) => {
  return axios.post("http://127.0.0.1:8000/api/RemoveQuantityCart/", data, {
    headers: {
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  });
};

export const getTotalCart = () => {
  return axios.get("http://127.0.0.1:8000/api/getTotalCart/", {
    headers: {
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  });
};
// New API endpoint to remove all items from the cart
export const removeAllCart = () => {
  return axios.post(
    "http://127.0.0.1:8000/api/removeAllCart/",
    {},
    {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    }
  );
};
