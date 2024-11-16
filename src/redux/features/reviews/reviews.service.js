import { createAsyncThunk } from "@reduxjs/toolkit";
import { httpGet, httpPost } from "../../../axios";

export const addReview = createAsyncThunk(
  "addReview",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await httpPost("/review", formData, true);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getReviews = createAsyncThunk(
  "getReviews",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await httpGet(`/review/${productId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
