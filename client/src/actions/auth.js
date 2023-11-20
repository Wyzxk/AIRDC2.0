import { createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import {
  login_fail,
  login_succes,
  user_loaded_fail,
  user_loaded_success,
} from "../reducers/auth";
import axios from "axios";

export const load_user = createAsyncThunk("auth/loadUser", async () => {
  const dispatch = useDispatch();

  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/users/me/`,
        body,
        config
      );
      dispatch(user_loaded_success(res.data));
      dispatch(load_user());
    } catch (err) {
      dispatch(user_loaded_fail());
    }
  } else {
    dispatch(user_loaded_fail());
  }
});

export const login = createAsyncThunk("auth/login", async (email, password) => {
  const config = {
    headers: { "Content-type": "application/json" },
  };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/jwt/create/`,
      body,
      config
    );
    dispatch(login_succes(res.data));
  } catch (err) {
    dispatch(login_fail());
  }
});
