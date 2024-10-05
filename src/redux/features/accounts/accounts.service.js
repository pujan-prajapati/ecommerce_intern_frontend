import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { main_URL } from "../../../constant/constant";

export const getAllAdmins = createAsyncThunk(
  "getAllAdmins",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${main_URL}/users/getAllAdmins`);
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || "Server Error");
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${main_URL}/users/getAllUsers`);
      return response.data;
    } catch (error) {
      if (error.respones) {
        return rejectWithValue(error.response.data.message || "Server Error");
      }
      return rejectWithValue("Something went wrong");
    }
  }
);
