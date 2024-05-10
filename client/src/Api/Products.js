import axios from "axios";

// Create an instance of axios with a baseURL pointing to the API endpoint for retrieving all products
const productsApi = axios.create({
  baseURL: "http://127.0.0.1:8000/api/product/", // Base URL for the API
});

// Define a function named getAllProducts
// This function sends a GET request to the specified endpoint ("/") using the productsApi instance
// This request retrieves all products from the API
export const getAllProducts = () => productsApi.get("/");

export const getAllProductsClient = () =>
  productsApi.get("http://127.0.0.1:8000/api/getProductClient/");

export const getIdProducts = (id) => {
  return productsApi.get("/", {
    params: {
      id: id,
    },
  });
};
