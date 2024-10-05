import { useParams } from "react-router-dom";
import { AdminHeader } from "../AdminHeader";
import { CategoryProductForm } from "./category-product-form.component";
import { useForm } from "antd/es/form/Form";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../redux/features/products/product.service";

export const CategoryProductCreate = () => {
  const { name } = useParams();
  const dispatch = useDispatch();

  const [form] = useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
    dispatch(addProduct(values));
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    form.resetFields();
  };

  return (
    <>
      <AdminHeader
        page_title={`Create Category Product`}
        base_title={`Category`}
      />

      <CategoryProductForm
        onFinish={onFinish}
        form={form}
        onFinishFailed={onFinishFailed}
      />
    </>
  );
};
