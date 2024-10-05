import { Alert, Table } from "antd";
import { AdminHeader } from "../AdminHeader";
import { TableActionBtn } from "../common/TableActionBtn";
import { useDispatch, useSelector } from "react-redux";
import { selectAccount } from "../../../redux/features/accounts/accounts.slice";
import { useEffect, useState } from "react";
import { getAllAdmins } from "../../../redux/features/accounts/accounts.service";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    render: (text, record) => <p>{record.firstName + " " + record.lastName}</p>,
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
  {
    title: "Role",
    dataIndex: "role",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    align: "right",
    render: (text, record) => (
      <TableActionBtn id={record.id} to={`/admin/accounts/edit/${record.id}`} />
    ),
  },
];

export const AccountsAdmin = () => {
  const { items, isLoading, isError } = useSelector(selectAccount);
  const dispatch = useDispatch();

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  useEffect(() => {
    dispatch(getAllAdmins());
  }, [dispatch]);

  if (isError) return <Alert type="error" message={isError} />;

  return (
    <>
      <AdminHeader
        page_title="Admin Accounts"
        base_title="Admin"
        base_href="/admin/accounts"
      />

      <Table
        columns={columns}
        rowKey="_id"
        dataSource={items}
        loading={isLoading}
        rowSelection={rowSelection}
      />
    </>
  );
};
