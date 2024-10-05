import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./features/products/product.slice";
import CategoryReducer from "./features/category/category.slice";
import AuthReducer from "./features/auth/auth.slice";
import accountReducer from "./features/accounts/accounts.slice";

export const store = configureStore({
  reducer: {
    products: ProductReducer,
    category: CategoryReducer,
    auth: AuthReducer,
    accounts: accountReducer,
  },
});
