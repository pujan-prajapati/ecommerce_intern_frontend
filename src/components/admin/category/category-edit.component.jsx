import { useDispatch, useSelector } from "react-redux";
import { AdminHeader } from "../AdminHeader";
import { CategoryForm } from "./category-form.component";
import {
  selectCategory,
  selectSelectedCategory,
} from "../../../redux/features/category/category.slice";
import { useEffect } from "react";
import {
  fetchCategoryById,
  updateCategory,
} from "../../../redux/features/category/category.service";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Spin } from "antd";

export const CategoryEdit = () => {
  const { id } = useParams();
  const selectedCateory = useSelector(selectSelectedCategory);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector(selectCategory);

  useEffect(() => {
    dispatch(fetchCategoryById(id));
  }, [dispatch, id]);

  const onFinish = (formData) => {
    try {
      dispatch(updateCategory({ categoryID: id, formData }));
      toast.success("Category Updated Successfully");
      navigate("/admin/category");
    } catch (error) {
      toast.error("Failed to update category : ", error.message);
    }
  };

  if (isLoading) return <Spin />;

  return (
    <>
      <AdminHeader
        page_title="Edit Category"
        base_title="Category"
        base_href="/admin/category"
      />

      <CategoryForm initialValues={selectedCateory} onFinish={onFinish} />
    </>
  );
};
