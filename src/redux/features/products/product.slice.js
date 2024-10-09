import { createSlice } from "@reduxjs/toolkit";
import {
  updateProduct,
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
} from "./product.service";

const initialState = {
  items: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMsg: "",
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //create a product
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.items.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMsg = action.payload || "Failed to create product";
      });

    //update a product
    builder
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updatedItem = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.items = state.items.map((item) =>
          item._id === updatedItem._id ? updatedItem : item
        );
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMsg = action.payload || "Failed to update product";
      });

    //delete a product
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.items = state.items.filter(
          (item) => item._id !== action.payload._id
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMsg = action.payload || "Failed to delete product";
      });

    //get all product
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.items = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMsg = action.payload || "Failed to get all product";
      });

    //get product by id
    builder
      .addCase(getProductById.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.items = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMsg = action.payload || "Failed to get product";
      });
  },
});

export default productSlice.reducer;
export const selectProduct = (state) => state.products;
