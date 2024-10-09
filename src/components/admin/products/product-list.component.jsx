import { AdminHeader } from "../AdminHeader";
import { Button, Table } from "antd";
import { TableActionBtn } from "../common/TableActionBtn";
import { TableImage } from "../common/TableImage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  deleteProduct,
  getAllProducts,
} from "../../../redux/features/products/product.service";
import { selectProduct } from "../../../redux/features/products/product.slice";
import Swal from "sweetalert2";

const columns = [
  {
    title: "Product Image",
    dataIndex: "productImg",
    render: (text, record) => (
      <TableImage src={record.productImg} alt={record.title} />
    ),
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.localeCompare(b.title),
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    sorter: (a, b) => a.quantity - b.quantity,
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (text) => (
      <p>{text === "in_stock" ? "In Stock" : "Out of Stock"}</p>
    ),
  },
  {
    title: "Price",
    dataIndex: "price",
    render: (text) => <p>$ {text}</p>,
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Actions",
    dataIndex: "actions",
    align: "right",
    render: (text, record) => (
      <TableActionBtn
        to={`/admin/products/edit/${record._id}`}
        action={deleteProduct}
        afterAction={getAllProducts}
        id={record._id}
      />
    ),
  },
];

export const ProductList = () => {
  const { items } = useSelector(selectProduct);
  const dispatch = useDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

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
          text: "Please wait while we delete the user.",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        for (const id of selectedRowKeys) {
          await dispatch(deleteProduct(id));
          dispatch(deleteProduct());
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

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <>
      <AdminHeader
        page_title="Products List"
        base_title="Products"
        base_href="/admin/products"
      />

      <div className="flex justify-end mb-2">
        <Button
          danger
          type="primary"
          disabled={!selectedRowKeys.length}
          onClick={handleDeleteSelected}
        >
          Deleted Selected
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={items}
        rowKey="_id"
        rowSelection={rowSelection}
      />
    </>
  );
};
