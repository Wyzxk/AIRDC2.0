import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  isAuthenticate: false,
  user: null,
  loading: false,
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
        } catch (err) {
          dispatch(userLoaded.rejected(err));
        }
      } else {
        dispatch(userLoaded.rejected());
      }
    }, 1);
  }
);

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
  async (formData) => {
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
    } catch (err) {
      console.log("Error response:", err.response);
    }
  }
);

export const reset_password_confirm = createAsyncThunk(
  "auth/reset_password_confirm",
  async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(
      "http://127.0.0.1:8000/auth/users/reset_password_confirm/",
      formData,
      config
    );
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (formData, { dispatch }) => {
    const config = {
      headers: { "Content-type": "application/json" },
    };
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/auth/users/",
        formData,
        config
      );
      const data = {
        username: formData.email,
        password: formData.password,
      };
      dispatch(login(data));
      return res.data;
    } catch (err) {
      console.log(err);
      console.log(formData);
    }
  }
);

export const verify = createAsyncThunk("auth/verify", async (token) => {
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
    console.log(err);
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
      state.user = null;
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
          state.error = "Acceso denegado";
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
      .addCase(checkAuthenticated.pending, (state) => {
        state.isAuthenticate = undefined;
      })
      .addCase(checkAuthenticated.fulfilled, (state) => {
        state.isAuthenticate = true;
      })
      .addCase(checkAuthenticated.rejected, (state) => {
        state.isAuthenticate = false;
      })
      .addCase(reset_password.fulfilled, (state) => {
        state.reset_password = true;
      })
      .addCase(reset_password.rejected, (state) => {
        state.reset_password = false;
      })
      .addCase(reset_password_confirm.fulfilled, (state) => {
        state.reset_password_confirm = true;
      })
      .addCase(reset_password_confirm.rejected, (state) => {
        state.reset_password_confirm = false;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.signup = true;
      })
      .addCase(signup.rejected, (state) => {
        state.signup = false;
      });
  },
});

export const { logout } = auth.actions;
export default auth.reducer;
