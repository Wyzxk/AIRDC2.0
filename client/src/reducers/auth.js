import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  isAuthenticate: null,
  isStaff: null,
  user: null,
  loading: false,
  cart: null,
  cartCounter: null,
};

export const userLoaded = createAsyncThunk(
  "auth/userLoaded",
  async (_, { dispatch }) => {
    setTimeout(async () => {
      // if (localStorage.getItem("access") === null) {
      //   dispatch(userLoaded.rejected());
      // }

      if (localStorage.getItem("access")) {
        try {
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
          dispatch(checkStaff(res.data.id));
        } catch (err) {
          dispatch(userLoaded.rejected(err));
        }
      } else {
        dispatch(userLoaded.rejected());
      }
    }, 1);
  }
);
export const checkStaff = createAsyncThunk("auth/checkStaff", async (id) => {
  if (localStorage.getItem("access")) {
    try {
      const res = await axios.get("http://127.0.0.1:8000/auth/checkStaff/", {
        params: {
          id: id,
        },
        headers: {
          Authorization: `JWT ${localStorage.getItem("access")}`,
        },
      });
      console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
});
export const login = createAsyncThunk(
  "auth/loadUser",
  async (formData, { dispatch }) => {
    const config = {
      headers: { "Content-type": "application/json" },
    };
    const res = await axios.post(
      "http://127.0.0.1:8000/auth/jwt/create",
      formData,
      config
    );
    if (res.data) {
      dispatch(userLoaded());
      dispatch(checkAuthenticated());
    }

    return res.data;
  }
);

export const checkAuthenticated = createAsyncThunk(
  "auth/checkAuthenticated",
  async (_, { dispatch }) => {
    if (localStorage.getItem("access") === null) {
      dispatch(checkAuthenticated.rejected());
    }
    setTimeout(async () => {
      if (localStorage.getItem("access") != null) {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        };
        const body = JSON.stringify({
          token: localStorage.getItem("access"),
        });
        try {
          const res = await axios.post(
            "http://127.0.0.1:8000/auth/jwt/verify",
            body,
            config
          );
          if (res.data.code !== "token_not_valid") {
            dispatch(checkAuthenticated.fulfilled());
          }
        } catch (err) {
          dispatch(checkAuthenticated.rejected(err));
        }
      } else {
        dispatch(checkAuthenticated.rejected());
      }
    }, 400);
  }
);

export const reset_password = createAsyncThunk(
  "auth/reset_password",
  async (formData, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/auth/users/reset_password/",
        formData,
        config
      );
      // Retorna los datos exitosos si la solicitud es exitosa
      return res.data;
    } catch (err) {
      // Retorna el error usando rejectWithValue para que Redux lo maneje
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const reset_password_confirm = createAsyncThunk(
  "auth/reset_password_confirm",
  async (formData, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/auth/users/reset_password_confirm/",
        formData,
        config
      );

      // Retorna los datos exitosos si la solicitud es exitosa
      return res.data;
    } catch (err) {
      console.log(err);
      // Retorna el error usando rejectWithValue para que Redux lo maneje
      return rejectWithValue(err.response.data);
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (formData, { rejectWithValue }) => {
    const config = {
      headers: { "Content-type": "application/json" },
    };
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/auth/users/",
        formData,
        config
      );
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const verify = createAsyncThunk(
  "auth/verify",
  async (token, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/auth/users/activation/",
        token,
        config
      );
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getCart = createAsyncThunk("auth/getCart", async (id) => {
  if (localStorage.getItem("access")) {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/getCart/", {
        params: {
          id: id,
        },
        headers: {
          Authorization: `JWT ${localStorage.getItem("access")}`,
        },
      });
      console.log(res.data);
      return res.data;
    } catch (error) {
      return error.data;
    }
  }
});

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.loading = false;
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      state.access = null;
      state.refresh = null;
      state.isAuthenticate = false;
      state.user = false;
      state.cart = false;
      state.isStaff = false;
    },
    changeCounter(state) {
      state.cartCounter = state.cartCounter + 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { access, refresh } = action.payload;
        localStorage.setItem("access", access);
        localStorage.setItem("refresh", refresh);
        state.access = access;
        state.refresh = refresh;
        state.loading = false;
        state.error = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        state.access = null;
        state.refresh = null;
        state.isAuthenticate = false;
        state.user = null;
        if (action.error.message === "Request failed with status code 401") {
          state.error = "Los datos ingresados son incorrectos";
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(userLoaded.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(userLoaded.rejected, (state) => {
        state.user = null;
      })
      .addCase(checkStaff.fulfilled, (state, action) => {
        state.isStaff = action.payload;
      })
      .addCase(checkStaff.rejected, (state) => {
        state.isStaff = false;
      })
      .addCase(checkAuthenticated.pending, (state) => {
        state.isAuthenticate = undefined;
      })
      .addCase(checkAuthenticated.fulfilled, (state) => {
        state.isAuthenticate = true;
      })
      .addCase(checkAuthenticated.rejected, (state) => {
        state.isAuthenticate = false;
      })
      .addCase(reset_password.pending, (state) => {
        state.reset_passwordLoading = true;
      })
      .addCase(reset_password.fulfilled, (state) => {
        state.reset_passwordLoading = false;
        state.reset_passwordFalse = false;
        state.reset_passwordTrue = true;
      })
      .addCase(reset_password.rejected, (state) => {
        state.reset_passwordLoading = false;
        state.reset_passwordFalse = true;
        state.reset_passwordTrue = false;
      })
      .addCase(reset_password_confirm.pending, (state) => {
        state.reset_password_confirmStateLoading;
        state.reset_password_confirmStateTrue = false;
        state.reset_password_confirmStateFalse = false;
      })
      .addCase(reset_password_confirm.fulfilled, (state) => {
        state.reset_password_confirmStateTrue = true;
        state.reset_password_confirmStateFalse = false;
      })
      .addCase(reset_password_confirm.rejected, (state) => {
        state.reset_password_confirmStateTrue = false;
        state.reset_password_confirmStateFalse = true;
      })
      .addCase(signup.pending, (state, action) => {
        state.signupStateLoad = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.signupStateLoad = false;
        state.signupState = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.signupStateLoad = false;
        state.signupState = action.payload;
      })
      .addCase(verify.pending, (state, action) => {
        state.verifyLoading = true;
      })
      .addCase(verify.rejected, (state, action) => {
        state.verifyLoading = false;
        state.verifyStateRejected = true;
      })
      .addCase(verify.fulfilled, (state, action) => {
        state.verifyLoading = false;
        state.verifyState = true;
      })
      .addCase(getCart.pending, (state, action) => {
        state.cart = null;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.cart = false;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      });
  },
});

export const { logout, changeCounter } = auth.actions;
export default auth.reducer;
