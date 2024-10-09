import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError, notify } from "../../../helpers";
import { httpDelete, httpGet, httpPost, httpPut } from "../../../axios";

//create product
export const createProduct = createAsyncThunk(
  "createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      for (const key in productData) {
        formData.append(key, productData[key]);
      }
      const response = await httpPost("products", formData, true);

      notify("Product created successfully");

      return response.data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

//get all products
export const getAllProducts = createAsyncThunk(
  "getAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await httpGet("products");
      return response.data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

//get product by id
export const getProductById = createAsyncThunk(
  "getProductById",
  async (productID, { rejectWithValue }) => {
    try {
      const response = await httpGet(`products/${productID}`);
      return response.data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

//delete product
export const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async (productID, { rejectWithValue }) => {
    try {
      const response = await httpDelete(`products/${productID}`, true);
      return response.data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

//update product
export const updateProduct = createAsyncThunk(
  "updateProduct",
  async ({ productID, productData }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      for (const key in productData) {
        formData.append(key, productData[key]);
      }

      const response = await httpPut(`products/${productID}`, formData, true);
      return response.data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);
