import { createAsyncThunk } from "@reduxjs/toolkit";
import { httpPost } from "../../../axios";

export const addToWishlist = createAsyncThunk(
  "addToWishlist",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await httpPost("/wishlist", { productId }, true);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllWishlist = createAsyncThunk(
  "getAllWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const response = await httpPost("/wishlist", null, true);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  "removeFromWishlist",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await httpPost(`/wishlist/${productId}`, {}, true);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);