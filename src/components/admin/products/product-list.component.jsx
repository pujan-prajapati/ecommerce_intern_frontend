import { Alert, Button, Table } from "antd";
import { AdminHeader } from "../AdminHeader";
import { TableActionBtn } from "../common/TableActionBtn";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TableTag } from "../common/TableTag";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";
import {
  deleteProduct,
  getAllProducts,
} from "../../../redux/features/products/product.service";
import { selectProduct } from "../../../redux/features/products/product.slice";

const columns = [
  {
    title: "PRODUCTS",
    dataIndex: "products",
    render: (text, record) => (
      <div className="flex gap-3">
        <img
          src={record.image}
          className="w-14 h-14 rounded-md"
          alt={record.name}
        />
        <div>
          <strong>{record.name}</strong>
          <p>{record.description}</p>
        </div>
      </div>
    ),
  },
  {
    title: "PRODUCT STATUS",
    dataIndex: "status",
    render: (text) => (
      <TableTag
        tagTitle={text}
        tagColor={text === "in_stock" ? "success" : "error"}
      />
    ),
  },
  {
    title: "PRODUCT CATEGORY",
    dataIndex: "category",
    render: (text, record) => <p>{record.category.name}</p>,
  },

  {
    title: "ACTIONS",
    dataIndex: "actions",
    align: "right",
    render: (text, record) => (
      <TableActionBtn
        action={deleteProduct}
        id={record._id}
        afterAction={getAllProducts}
        to={`/admin/products/edit/${record._id}`}
      />
    ),
  },
];

export const ProductList = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const dispatch = useDispatch();
  const { products, isLoading, isError } = useSelector(selectProduct);

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const handleDeleteSelected = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete them!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleting...",
          text: "Please wait while we delete the admin.",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        for (const id of selectedRowKeys) {
          await dispatch(deleteProduct(id));
          dispatch(getAllProducts());
        }
        setSelectedRowKeys([]);
        Swal.fire({
          title: "Deleted!",
          text: "Selected users have been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <>
      <AdminHeader
        page_title={"Product List"}
        base_title={"Product"}
        base_href={"/admin/products"}
      />

      {isError ? (
        <Alert type="error" message={isError} />
      ) : (
        <>
          <div className="mb-4 flex justify-end">
            <Button
              danger
              type="primary"
              disabled={!selectedRowKeys.length}
              onClick={handleDeleteSelected}
            >
              <FaTrash /> Delete Selected
            </Button>
          </div>
          <Table
            columns={columns}
            rowSelection={rowSelection}
            dataSource={products}
            loading={isLoading}
            rowKey="_id"
          />
        </>
      )}
    </>
  );
};
