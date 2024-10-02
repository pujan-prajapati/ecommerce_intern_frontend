import { useNavigate, useParams } from "react-router-dom";
import { ProductForm } from "./product-form.component";
import { AdminHeader } from "../AdminHeader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getProductById,
  updateProduct,
} from "../../../redux/features/products/product.service";
import {
  selectProduct,
  selectSelectedProduct,
} from "../../../redux/features/products/product.slice";
import { Spin } from "antd";
import { toast } from "react-toastify";

export const ProductEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const productById = useSelector(selectSelectedProduct);
  const { isLoading } = useSelector(selectProduct);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  const handleOnFinish = (formData) => {
    try {
      dispatch(updateProduct({ productID: id, formData }));
      toast.success("Product Updated Successfully");
      navigate("/admin/products");
    } catch (error) {
      toast.error("Failed to update product: " + error.message);
    }
  };

  if (isLoading) {
    return <Spin />;
  }

  return (
    <>
      <AdminHeader
        page_title="Edit Product"
        base_title="Products"
        base_href="/admin/products"
      />

      <ProductForm initialValues={productById} onFinish={handleOnFinish} />
    </>
  );
};
