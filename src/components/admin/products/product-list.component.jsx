import { useDispatch, useSelector } from "react-redux";
import { CreateAdminBtn, AdminHeader } from "../AdminHeader";
import { selectProduct } from "../../../redux/features/products/product.slice";
import { useEffect } from "react";
import { Table } from "antd";
import { fetchProduct } from "../../../redux/features/products/product.service";
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
    render: (text) => <p>$ {text}</p>,
  },

  {
    title: "Actions",
    dataIndex: "actions",
    align: "right",
    render: (text, record) => (
      <TableActionBtn to={`/admin/products/edit/${record.id}`} id={record.id} />
    ),
  },
];

export const ProductList = () => {
  const products = useSelector(selectProduct);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

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
        columns={columns}
        dataSource={products.items}
        loading={products.isLoading}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </>
  );
};
