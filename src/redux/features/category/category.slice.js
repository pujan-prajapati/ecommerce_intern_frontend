import { createSlice } from "@reduxjs/toolkit";
import {
  addCategory,
  fetchCategory,
  deleteCategory,
  updateCategory,
  fetchCategoryById,
} from "./category.service";

const initialState = {
  items: [],
  isLoading: false,
  isError: false,
  selectedCategory: null,
};

export const CategorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // add category
    builder
      .addCase(addCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
      });

    // fetch category
    builder
      .addCase(fetchCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      });

    // delete category
    builder
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter((item) => item.id !== action.payload);
      });

    // update category
    builder
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });

    //get category by id
    builder
      .addCase(fetchCategoryById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedCategory = action.payload;
      });
  },
});

export default CategorySlice.reducer;
export const selectCategory = (state) => state.category;
export const selectSelectedCategory = (state) =>
  state.category.selectedCategory;
