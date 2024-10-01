import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./features/products/product.slice";

export const store = configureStore({
  reducer: {
    products: ProductReducer,
  },
});
