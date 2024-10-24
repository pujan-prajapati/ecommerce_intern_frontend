import { Button, Table } from "antd";
import { AdminHeader } from "../AdminHeader";
import { useDispatch, useSelector } from "react-redux";
import { selectOrder } from "../../../redux/features/orders/order.slice";
import { useEffect, useState } from "react";
import {
  deleteOrder,
  getAllOrders,
} from "../../../redux/features/orders/order.service";
import { TableTag } from "../common/TableTag";
import { TableActionBtn } from "../common/TableActionBtn";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";

const columns = [
  {
    title: "PRODUCTS",
    dataIndex: "products",
    render: (text, record) => (
      <div className="flex gap-3">
        <img
          src={record.product.productDetails.image}
          className="w-14 h-14 object-contain rounded-md"
          alt={record.product.productDetails.name}
        />
        <div className="max-w-52">
          <strong>{record.product.productDetails.name}</strong>
        </div>
      </div>
    ),
  },
  {
    title: "CUSTOMER",
    dataIndex: "customer",
    render: (text, record) => (
      <p className="font-semibold capitalize">
        {record.firstName + " " + record.lastName}
      </p>
    ),
  },
  {
    title: "CONTACT",
    dataIndex: "phoneNumber",
    render: (text) => <p className="font-semibold ">{text}</p>,
  },
  {
    title: "QUANTITY",
    dataIndex: "quantity",
    render: (text, record) => (
      <p className="text-lg font-semibold">{record.product.quantity}</p>
    ),
  },
  {
    title: "PRICE",
    dataIndex: "price",
    render: (text, record) => (
      <p className="text-lg text-red-500 font-semibold">
        ${record.product.price}
      </p>
    ),
  },

  {
    title: "STATUS",
    dataIndex: "status",
    render: (text) => (
      <TableTag
        tagTitle={text}
        tagColor={
          text === "pending"
            ? "blue"
            : text === "processing"
            ? "yellow"
            : text === "shipped"
            ? "cyan"
            : text === "delivered"
            ? "green"
            : "red"
        }
      />
    ),
  },
  {
    title: "PAYMENT METHOD",
    dataIndex: "paymentMethod",
    render: (text) => (
      <p className="uppercase font-semibold">
        {text === "cod" ? "Cash On Delivery" : text}
      </p>
    ),
  },
  {
    title: "ADDRESS",
    dataIndex: "address",
    render: (text, record) => (
      <>
        <p>{record.location.address}</p>
        <p className="font-semibold">{record.location.city}</p>
      </>
    ),
  },
  {
    title: "ACTIONS",
    dataIndex: "actions",
    align: "right",
    width: 200,
    render: (text, record) => (
      <TableActionBtn
        to={`/admin/orders/edit/${record._id}`}
        id={record._id}
        action={deleteOrder}
        afterAction={getAllOrders}
      />
    ),
  },
];

export const OrderList = () => {
  const { orders, isLoading } = useSelector(selectOrder);
  const dispatch = useDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  useEffect(() => {
    dispatch(getAllOrders());
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
          await dispatch(deleteOrder(id));
          dispatch(getAllOrders());
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
        base_href={"/admin/orders"}
        base_title={"Orders"}
        page_title={"Order List"}
      />

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
        dataSource={orders}
        loading={isLoading}
        rowKey={"_id"}
        rowSelection={rowSelection}
      />
    </>
  );
};
