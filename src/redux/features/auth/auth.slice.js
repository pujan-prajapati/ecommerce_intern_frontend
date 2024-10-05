import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser } from "./auth.service";

const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;

const role = localStorage.getItem("role") ? localStorage.getItem("role") : null;

const initialState = {
  items: token ? { token, role } : null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMsg: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      window.location.reload();
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    //register
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMsg = "";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMsg = action.payload || "Registration failed";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.items = action.payload;
        state.isError = false;
      });

    //login
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMsg = "";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMsg = action.payload || "Login failed";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.items = action.payload;
        state.isError = false;
      });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
export const selectAuth = (state) => state.auth;
