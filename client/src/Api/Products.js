import axios from "axios";

const productsApi = axios.create({
  baseURL: "http://127.0.0.1:8000/api/product/",
});

export const getAllProducts = () => productsApi.get("/");
