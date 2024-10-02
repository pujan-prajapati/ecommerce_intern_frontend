import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_URL } from "../../../constant/constant";

export const fetchProduct = createAsyncThunk(
  "products/fetchproducts",
  async () => {
    try {
      const response = await axios.get(`${base_URL}/products`);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const addProduct = createAsyncThunk(
  "products/addproduct",
  async (formData) => {
    try {
      const response = await axios.post(`${base_URL}/products`, formData);

      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteproduct",
  async (productID) => {
    try {
      await axios.delete(`${base_URL}/products/${productID}`);
      return productID;
    } catch (error) {
      return error;
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateproduct",
  async ({ productID, formData }) => {
    try {
      const response = await axios.put(
        `${base_URL}/products/${productID}`,
        formData
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const getProductById = createAsyncThunk(
  "products/getproductbyid",
  async (productID) => {
    try {
      const response = await axios.get(`${base_URL}/products/${productID}`);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const getProductByCategory = createAsyncThunk(
  "products/getproductbycategory",
  async (category) => {
    try {
      const response = await axios.get(
        `${base_URL}/products?category=${category}`
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
