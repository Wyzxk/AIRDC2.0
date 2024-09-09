import axios from "axios";

// Creating an instance of Axios for user information API
const urlDelivery = axios.create({
  baseURL: "http://127.0.0.1:8000/api/addDelivery/",
});

// Function to change username
export const addDelivery = (data) => {
  return urlDelivery.post("/", data, {
    headers: {
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  });
};

export const addDeliveryTrue = (data) => {
  return urlDelivery.put("/", data, {
    params: {
      id: data.user,
      transaction: data.transaction,
    },
    headers: {
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  });
};

export const sendDataToRedirect = (data) => {
  return axios.get("http://127.0.0.1:3000/", {
    params: {
      idUser: data.idUser,
      idPedido: data.idPedido,
      status: data.status,
    },
  });
};

export const getIdDeliveryData = (id) => {
  return urlDelivery.get("/", {
    params: {
      id: id,
    },
    headers: {
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  });
};
export const updateDelivery = (data) => {
  return urlDelivery.put("/", data, {
    headers: {
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  });
};
