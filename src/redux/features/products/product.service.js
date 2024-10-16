import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError } from "../../../helpers";
import { httpDelete, httpGet, httpPost, httpPut } from "../../../axios";

//create product
export const createProduct = createAsyncThunk(
  "createProduct",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await httpPost("products", formData, true);

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

//get products by id
export const getProductById = createAsyncThunk(
  "getProductById",
  async (productID, { rejectWithValue }) => {
    try {
      const response = await httpGet(`/products/${productID}`);
      return response.data[0];
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

//update products
export const updateProduct = createAsyncThunk(
  "updateProduct",
  async ({ productID, formData }, { rejectWithValue }) => {
    try {
      const response = await httpPut(`/products/${productID}`, formData, true);
      return response.data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

//get products by id
export const getProductsByCategory = createAsyncThunk(
  "getProductByCategory",
  async (categoryID, { rejectWithValue }) => {
    try {
      const response = await httpGet(`/products/category/${categoryID}`);
      return response.data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);
