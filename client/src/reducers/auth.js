import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  access: localStorage.removeItem("access"),
  refresh: localStorage.removeItem("refresh"),
  isAuthenticate: null,
  user: null,
  loading: false,
};

export const userLoaded = createAsyncThunk(
  "auth/userLoaded",
  async (_, { dispatch }) => {
    setTimeout(async () => {
      try {
        if (localStorage.getItem("access")) {
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `JWT ${localStorage.getItem("access")}`,
              Accept: "application/json",
            },
          };

          const res = await axios.get(
            "http://127.0.0.1:8000/auth/users/me/",
            config
          );
          dispatch(userLoaded.fulfilled(res.data));
        }
      } catch (err) {
        dispatch(userLoaded.rejected(err));
      }
    }, 1000);
  }
);

export const login = createAsyncThunk(
  "auth/loadUser",
  async (formData, { dispatch }) => {
    const config = {
      headers: { "Content-type": "application/json" },
    };
    // const body = JSON.stringify({ email, password });
    const res = await axios.post(
      "http://127.0.0.1:8000/auth/jwt/create",
      formData,
      config
    );
    if (res.data) {
      dispatch(userLoaded());
    }

    return res.data;
  }
);

const auth = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { access, refresh } = action.payload;
        localStorage.setItem("access", access);
        localStorage.setItem("refresh", refresh);
        state.isAuthenticate = true;
        state.access = access;
        state.refresh = refresh;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        state.access = null;
        state.refresh = null;
        state.isAuthenticate = false;
        state.user = null;
        console.log(action.error.message);
        if (action.error.message === "Request failed with status code 401") {
          state.error = "Acceso denegado";
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(userLoaded.fulfilled, (state, action) => {
        state.user = action.payload;
        console.log(action.payload);
        console.log("hola");
      });
  },
});

export const {
  login_succes,
  login_fail,
  user_loaded_success,
  user_loaded_fail,
} = auth.actions;
export default auth.reducer;
