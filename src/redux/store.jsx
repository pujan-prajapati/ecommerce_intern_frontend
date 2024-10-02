import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./features/products/product.slice";
import CategoryReducer from "./features/category/category.slice";

export const store = configureStore({
  reducer: {
    products: ProductReducer,
    category: CategoryReducer,
  },
});
