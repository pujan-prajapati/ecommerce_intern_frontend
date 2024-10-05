import { createSlice } from "@reduxjs/toolkit";
import { getAllAdmins, getAllUsers } from "./accounts.service";

const initialState = {
  items: [],
  isLoading: false,
  isError: false,
  isSuccess: true,
  errorMsg: "",
};

export const AccountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get all admins
    builder
      .addCase(getAllAdmins.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getAllAdmins.rejected, (state, action) => {
        state.isError = action.error.message;
        state.isLoading = false;
        state.isSuccess = false;
      })
      .addCase(getAllAdmins.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
        state.items = action.payload;
      });

    //get all users
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isError = action.error.message;
        state.isLoading = false;
        state.isSuccess = false;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
        state.items = action.payload;
      });
  },
});

export default AccountsSlice.reducer;
export const selectAccount = (state) => state.accounts;
