import axios from "axios";

// Create an instance of axios with a baseURL pointing to the API endpoint for sending email messages
const productsApi = axios.create({
  baseURL: "http://127.0.0.1:8000/api/contact/", // Base URL for the API
});

// Configuration object specifying headers for the HTTP request
const config = {
  headers: { "Content-type": "application/json" }, // Content-type header set to JSON
};

// Define a function named sendEmailMessage that takes data as a parameter
// This function sends a POST request to the specified endpoint ("/") using the productsApi instance and the provided data
export const sendEmailMessage = (data) => productsApi.post("/", data, config);
