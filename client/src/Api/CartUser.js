import axios from "axios";

// Creating an instance of Axios for user information API
const urlCart = axios.create({
  baseURL: "http://127.0.0.1:8000/api/getCart/",
});

export const getCart = (id) => {
  return urlCart.post("/", id);
};
