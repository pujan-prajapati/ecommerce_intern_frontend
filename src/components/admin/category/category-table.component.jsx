import { useParams } from "react-router-dom";
import { AdminHeader, CreateAdminBtn } from "../AdminHeader";
import { Table } from "antd";
import { TableActionBtn } from "../common/TableActionBtn";
import { TableImage } from "../common/TableImage";

const columns = [
  {
    title: "Image",
    dataIndex: "image",
    render: (text, record) => (
      <TableImage src={record.image} alt={record.name} />
    ),
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Price",
    dataIndex: "price",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    align: "right",
    render: (text, record) => <TableActionBtn id={record.id} />,
  },
];

export const CategoryTable = () => {
  const { name } = useParams();
  return (
    <>
      <AdminHeader
        page_title={`${name}`}
        base_title="Category"
        base_href="/admin/category"
      />

      <Table columns={columns} />
    </>
  );
};
