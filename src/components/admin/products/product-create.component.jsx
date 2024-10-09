import { useNavigate } from "react-router-dom";
import { createProduct } from "../../../redux/features/products/product.service";
import { ProductForm } from "./product-form.component";
import { useDispatch } from "react-redux";

export const ProductCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    await dispatch(createProduct(values));

    navigate("/admin/products");
  };

  return (
    <>
      <ProductForm onSubmit={handleSubmit} />
    </>
  );
};
