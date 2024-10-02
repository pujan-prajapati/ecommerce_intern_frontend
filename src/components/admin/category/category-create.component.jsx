import { useDispatch } from "react-redux";
import { CategoryForm } from "./category-form.component";
import { addCategory } from "../../../redux/features/category/category.service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AdminHeader } from "../AdminHeader";

export const CategoryCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (formData) => {
    dispatch(addCategory(formData));
    toast.success("Category Created Successfully");
    navigate("/admin/category");
  };

  return (
    <>
      <AdminHeader
        page_title="Create Category"
        base_title="Category"
        base_href="/admin/category"
      />
      <CategoryForm onFinish={onFinish} />
    </>
  );
};
