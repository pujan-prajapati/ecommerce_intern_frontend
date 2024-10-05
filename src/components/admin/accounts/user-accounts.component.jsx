import { Alert, Table } from "antd";
import { AdminHeader } from "../AdminHeader";
import { TableActionBtn } from "../common/TableActionBtn";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAccount } from "../../../redux/features/accounts/accounts.slice";
import { getAllUsers } from "../../../redux/features/accounts/accounts.service";

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

export const AccountsUser = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { items, isLoading, isError } = useSelector(selectAccount);
  const dispatch = useDispatch();

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <>
      <AdminHeader
        page_title="User Accounts"
        base_title="Users"
        base_href="/admin/accounts/users"
      />

      {isError ? (
        <Alert type="error" message={isError} />
      ) : (
        <Table
          columns={columns}
          rowKey="_id"
          rowSelection={rowSelection}
          dataSource={items}
          loading={isLoading}
        />
      )}
    </>
  );
};
