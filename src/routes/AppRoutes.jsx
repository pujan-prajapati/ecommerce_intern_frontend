import { Route, Routes } from "react-router-dom";
import { AdminLayout } from "../layout/admin";
import { LoginPage } from "../pages/auth/LoginPage";
import { Dashboard, Products } from "../pages/admin";

import { ProductList, ProductCreate, ProductEdit } from "../components/admin";

export const AppRoutes = () => {
  return (
    <>
      <Routes>
        {/* auth */}
        <Route path="/login" element={<LoginPage />} />

        {/* admin layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />

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
