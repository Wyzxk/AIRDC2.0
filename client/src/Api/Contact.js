import axios from "axios";

const productsApi = axios.create({
  baseURL: "http://127.0.0.1:8000/api/contact/",
});

const config = {
  headers: { "Content-type": "application/json" },
};

export const sendEmailMessage = (data) => productsApi.post("/", data, config);
