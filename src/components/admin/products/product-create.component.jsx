import { useDispatch } from "react-redux";
import { ProductForm } from "./product-form.component";
import { addProduct } from "../../../redux/features/products/product.service";
import { AdminHeader } from "../AdminHeader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ProductCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnFinish = (formData) => {
    dispatch(addProduct(formData));
    toast.success("Product Created Successfully");
    navigate("/admin/products");
  };

  return (
    <>
      <AdminHeader
        page_title="Create Product"
        base_title="Products"
        base_href="/admin/products"
      />
      <ProductForm onFinish={handleOnFinish} />
    </>
  );
};
