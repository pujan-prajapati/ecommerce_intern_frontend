import { useDispatch, useSelector } from "react-redux";
import { CreateAdminBtn, AdminHeader } from "../AdminHeader";
import { selectProduct } from "../../../redux/features/products/product.slice";
import { useEffect } from "react";
import { Button, Table } from "antd";
import {
  deleteProduct,
  fetchProduct,
} from "../../../redux/features/products/product.service";
import { FaPen, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const columns = (dispatch) => [
  {
    title: "ID",
    dataIndex: "id",
    width: 120,
  },
  {
    title: "Image",
    dataIndex: "image",
    width: 120,
    render: (text, record) => (
      <img
        src={record.image}
        alt={record.name}
        style={{ width: 50, height: 50 }}
      />
    ),
  },
  {
    title: "Name",
    dataIndex: "name",
    width: 120,
  },
  {
    title: "Price",
    dataIndex: "price",
    width: 120,
    render: (text) => <p>$ {text}</p>,
  },
  {
    title: "Status",
    dataIndex: "status",
    width: 120,
  },

  {
    title: "Actions",
    dataIndex: "actions",
    width: 120,
    render: (text, record) => (
      <div className="space-x-3">
        <Button
          danger
          type="primary"
          onClick={() => {
            dispatch(
              deleteProduct(record.id),
              toast.success("Item Deleted Successfully")
            );
          }}
        >
          <FaTrash />
        </Button>
        <Link to={`/admin/products/edit/${record.id}`}>
          <Button type="primary">
            <FaPen />
          </Button>
        </Link>
      </div>
    ),
  },
];

export const ProductList = () => {
  const products = useSelector(selectProduct);
  const dispatch = useDispatch();

  useEffect(() => {
    if (products.items.length === 0) {
      dispatch(fetchProduct());
    }
  }, [dispatch, products.items.length]);

  return (
    <>
      <div className="flex justify-between">
        <AdminHeader
          page_title="Products List"
          base_title="Products"
          base_href="/admin/products"
        />

        <CreateAdminBtn to="/admin/products/createproducts" />
      </div>

      <Table
        columns={columns(dispatch)}
        dataSource={products.items}
        loading={products.isLoading}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </>
  );
};
