import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { main_URL } from "../../../constant/constant";

export const registerUser = createAsyncThunk(
  "registeruser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${main_URL}/users/registerUser`,
        formData
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || "Server Error");
      } else {
        return rejectWithValue("Network Error. Please try again.");
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  "loginuser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${main_URL}/users/loginUser`,
        formData
      );
      if (response.data) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
      }
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || "Server Error");
      } else {
        return rejectWithValue("Network Error. Please try again.");
      }
    }
  }
);
