import { Route, Routes } from "react-router-dom";
import { AdminLayout } from "../layout/admin";
import { LoginPage } from "../pages/auth/LoginPage";
import { Dashboard, Products, Category } from "../pages/admin";

import {
  ProductList,
  ProductCreate,
  ProductEdit,
  CategoryList,
  CategoryCreate,
  CategoryTable,
  CategoryEdit,
} from "../components/admin";

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

          <Route path="category" element={<Category />}>
            <Route index element={<CategoryList />} />
            <Route path="createcategory" element={<CategoryCreate />} />
            <Route path="edit/:id" element={<CategoryEdit />} />
            <Route path=":category" element={<CategoryTable />} />
          </Route>
        </Route>

        {/* page not found */}
        <Route path="*" element={<>Page Not Found</>} />
      </Routes>
    </>
  );
};
