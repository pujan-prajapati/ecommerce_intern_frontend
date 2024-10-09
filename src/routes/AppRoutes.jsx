import { Navigate, Route, Routes } from "react-router-dom";
import { Dashboard, Products, Accounts } from "../pages/admin";

import {
  ProductList,
  ProductCreate,
  ProductEdit,
  AccountsAdmin,
  AccountsUser,
  AdminAccountsEdit,
  UserAccountsEdit,
} from "../components/admin";
import { HomeLayout, AdminLayout } from "../layout";
import { Contact, Home } from "../pages/home";
import { RegisterPage, LoginPage } from "../pages/auth";

import { AdminPrivateRoute } from "./PrivateRoutes";

export const AppRoutes = () => {
  const token = localStorage.getItem("token");

  return (
    <>
      <Routes>
        {/* auth */}
        <Route
          path="/login"
          element={token ? <Navigate to={"/"} /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={token ? <Navigate to={"/"} /> : <RegisterPage />}
        />

        {/* home layout  */}
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* admin layout */}
        <Route
          path="/admin/*"
          element={<AdminPrivateRoute component={<AdminLayout />} />}
        >
          <Route index element={<Dashboard />} />

          <Route path="accounts" element={<Accounts />}>
            <Route index element={<AccountsAdmin />} />
            <Route path="users" element={<AccountsUser />} />
            <Route path="users/edit/:id" element={<UserAccountsEdit />} />
            <Route path="edit/:id" element={<AdminAccountsEdit />} />
          </Route>

          <Route path="products" element={<Products />}>
            <Route index element={<ProductList />} />
            <Route path="createproducts" element={<ProductCreate />} />
            <Route path="edit/:id" element={<ProductEdit />} />
          </Route>
        </Route>

        {/* page not found */}
        <Route path="*" element={<>Page Not Found</>} />
      </Routes>
    </>
  );
};
