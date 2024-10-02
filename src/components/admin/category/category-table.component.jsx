/* eslint-disable react/prop-types */
import { Alert, Button, Spin, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { selectProduct } from "../../../redux/features/products/product.slice";
import { useEffect } from "react";
import {
  deleteProduct,
  getProductByCategory,
} from "../../../redux/features/products/product.service";
import { Link, useParams } from "react-router-dom";
import { AdminHeader } from "../AdminHeader";
import { FaPen, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const columns = (dispatch) => [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "Image",
    dataIndex: "image",
    render: (text, record) => (
      <img
        src={record.image}
        alt={record.name}
        style={{ width: "50px", height: "50px" }}
      />
    ),
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Price",
    dataIndex: "price",
    render: (text) => <p>$ {text}</p>,
  },
  {
    title: "Actions",
    dataIndex: "actions",
    align: "right",
    render: (text, record) => (
      <div className="space-x-3">
        <Button
          danger
          type="primary"
          onClick={() => {
            dispatch(deleteProduct(record.id));
            toast.success("Item Deleted Successfully");
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

export const CategoryTable = () => {
  const { category } = useParams();
  const { isLoading, items, isError } = useSelector(selectProduct);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductByCategory(category));
  }, [dispatch, category]);

  if (isLoading) return <Spin size="large" />;
  if (isError)
    return <Alert message="Error" description={isError} type="error" />;

  return (
    <>
      <AdminHeader
        page_title={`${category}`}
        base_title="Category"
        base_href="/admin/category"
      />
      <Table
        columns={columns(dispatch)}
        dataSource={items}
        loading={isLoading}
        rowKey="id"
      />
    </>
  );
};
