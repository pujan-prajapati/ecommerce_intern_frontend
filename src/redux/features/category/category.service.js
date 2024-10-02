import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_URL } from "../../../constant/constant";

export const addCategory = createAsyncThunk(
  "category/addcategory",
  async (formData) => {
    try {
      const response = await axios.post(`${base_URL}/category`, formData);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const fetchCategory = createAsyncThunk(
  "category/fetchcategory",
  async () => {
    try {
      const response = await axios.get(`${base_URL}/category`);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deletecategory",
  async (categoryID) => {
    try {
      await axios.delete(`${base_URL}/category/${categoryID}`);
      return categoryID;
    } catch (error) {
      return error;
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/upatecategory",
  async ({ categoryID, formData }) => {
    try {
      const response = await axios.put(
        `${base_URL}/category/${categoryID}`,
        formData
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const fetchCategoryById = createAsyncThunk(
  "category/fetchcategorybyid",
  async (categoryID) => {
    try {
      const response = await axios.get(`${base_URL}/category/${categoryID}`);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
