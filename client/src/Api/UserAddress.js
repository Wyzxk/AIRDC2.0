import axios from "axios";

// Creating an instance of axios with base URL for user address API
const UserAddress = axios.create({
  baseURL: "http://127.0.0.1:8000/auth/userAddress/",
});

// Function to insert user address into the database
export const insertUserAddress = (data) => {
  // Making a POST request to the server with the provided data
  return UserAddress.post("/", data, {
    // Setting authorization header with JWT token retrieved from local storage
    headers: {
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  });
};

// Function to get user's address from the server
export const getUserAddress = (user) => {
  // Making a GET request to the server with user parameter
  return UserAddress.get("/", {
    params: {
      user: user,
    },
    // Setting authorization header with JWT token retrieved from local storage
    headers: {
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  });
};

export const editUserAddress = (data) => {
  // Making a POST request to the server with the provided data
  return UserAddress.put("/", data, {
    // Setting authorization header with JWT token retrieved from local storage
    headers: {
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  });
};
