import { Alert, Button, Table } from "antd";
import { AdminHeader } from "../AdminHeader";
import {
  deleteProduct,
  getProductBySale,
} from "../../../redux/features/products/product.service";
import { toast } from "react-toastify";
import { FaPen, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectProduct } from "../../../redux/features/products/product.slice";
import { useEffect } from "react";

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
        style={{ width: 80, height: 50, objectFit: "contain" }}
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
    render: (text) => <p className="line-through text-red-500">$ {text}</p>,
  },

  {
    title: "Discounted Price",
    dataIndex: "discountprice",
    render: (text, record) => {
      const discountedPrice = record.price - text; // Calculate the discounted price
      return <p>$ {discountedPrice}</p>;
    },
  },

  {
    title: "Sale Name",
    dataIndex: "salename",
  },

  {
    title: "Actions",
    dataIndex: "actions",
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

export const CollectionList = () => {
  const { items, isLoading, isError } = useSelector(selectProduct);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductBySale());
  }, [dispatch]);

  if (isError)
    return <Alert message="Error" description={isError} type="error" />;

  return (
    <>
      <AdminHeader
        page_title="Collection List"
        base_title="Collection"
        base_href="/admin/collection"
      />

      <Table
        columns={columns(dispatch)}
        rowKey="id"
        dataSource={items}
        loading={isLoading}
      />
    </>
  );
};
