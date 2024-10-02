import { useDispatch, useSelector } from "react-redux";
import { AdminHeader } from "../AdminHeader/admin-header";
import { CreateAdminBtn } from "../AdminHeader/create-btn";
import { selectCategory } from "../../../redux/features/category/category.slice";
import { useEffect } from "react";
import {
  deleteCategory,
  fetchCategory,
} from "../../../redux/features/category/category.service";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { FaPen, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

export const CategoryList = () => {
  const category = useSelector(selectCategory);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  return (
    <>
      <section className="flex justify-between items-center">
        <AdminHeader
          page_title="Category List"
          base_title="Category"
          base_href="/admin/category"
        />

        <CreateAdminBtn to="/admin/category/createcategory" />
      </section>

      <section className="flex flex-wrap gap-4">
        {category.items.map((item) => (
          <div className="bg-white p-4 mb-4" key={item.id}>
            <Link to={`/admin/category/${item.category}`}>
              <img src={item.image} className="h-72 w-72" alt={item.name} />
            </Link>

            <div className="flex justify-between mt-2">
              <h2 className="text-2xl text-center font-bold">{item.name}</h2>
              <div className="flex gap-2">
                <Button
                  danger
                  type="primary"
                  onClick={() => {
                    dispatch(deleteCategory(item.id));
                    toast.success("Category Deleted Successfully");
                  }}
                >
                  <FaTrash />
                </Button>
                <Link to={`/admin/category/edit/${item.id}`}>
                  <Button type="primary">
                    <FaPen />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};
