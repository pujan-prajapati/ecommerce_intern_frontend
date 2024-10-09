import { ProductForm } from "./product-form.component";
import { AdminHeader } from "../AdminHeader";
import { useEffect } from "react";

export const ProductEdit = () => {
  const handleOnFinish = () => {};

  useEffect(() => {});

  return (
    <>
      <AdminHeader
        page_title="Edit Product"
        base_title="Products"
        base_href="/admin/products"
      />

      <ProductForm onFinish={handleOnFinish} />
    </>
  );
};
