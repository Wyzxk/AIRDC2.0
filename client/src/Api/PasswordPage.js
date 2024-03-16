import axios from "axios";

// Creating an instance of axios with base URL for user address API
const apiChangePassword = axios.create({
  baseURL: "http://127.0.0.1:8000/auth/changePassword/",
});

// Function to insert user address into the database
export const changePassword = (data) => {
  // Making a POST request to the server with the provided data
  return apiChangePassword.post("/", data, {
    // Setting authorization header with JWT token retrieved from local storage
    headers: {
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  });
};
