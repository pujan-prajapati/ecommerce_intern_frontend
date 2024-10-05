import { Button, Layout, Menu } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import {
  FaHamburger,
  FaBoxes,
  FaShoppingBag,
  FaClipboardCheck,
  FaBox,
} from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";

const menuItems = [
  {
    key: "dashboard",
    icon: <FaHamburger />,
    label: <NavLink to="/admin">Dashboard</NavLink>,
  },
  {
    key: "sub1",
    icon: <FaClipboardCheck />,
    label: "Accounts",
    children: [
      {
        key: "admins",
        label: <NavLink to="/admin/accounts">Admins</NavLink>,
      },
      {
        key: "users",
        label: <NavLink to="/admin/accounts/users">Users</NavLink>,
      },
    ],
  },
  {
    key: "products",
    icon: <FaShoppingBag />,
    label: <NavLink to="/admin/products">Products</NavLink>,
  },
  {
    key: "sub2",
    icon: <FaBoxes />,
    label: "Category",
    children: [
      {
        key: "categorylist",
        label: <NavLink to="/admin/category">Category</NavLink>,
      },
      {
        key: "createcategoryproducts",
        label: (
          <NavLink to="/admin/category/createcategoryproduct">
            Create Category Products
          </NavLink>
        ),
      },
    ],
  },
  {
    key: "collection",
    icon: <FaBox />,
    label: <NavLink to="/admin/collection">Collection</NavLink>,
  },
];

export const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div>
      <Layout>
        <Sider
          width={300}
          collapsed={collapsed}
          className="h-screen bg-gray-100"
        >
          <div className="p-3 flex items-center">
            {collapsed ? (
              <h1 className="font-bold text-3xl">LO.</h1>
            ) : (
              <h1 className="font-bold text-3xl">LOGO</h1>
            )}
          </div>
          <Menu
            mode="inline"
            className="bg-transparent admin-menu"
            items={menuItems}
          />
        </Sider>
        <Layout>
          <Header className="bg-gray-200 flex justify-between items-center">
            <Button type="primary" onClick={() => setCollapsed(!collapsed)}>
              <FaHamburger />
            </Button>
            <div>
              <Link
                to={"/"}
                className="bg-blue-600 text-white px-5 py-3 rounded-md hover:text-white hover:bg-blue-500 transition-all duration-100"
              >
                Home
              </Link>
            </div>
          </Header>
          <Content className="px-10 py-5 bg-gray-200 m-5 rounded-lg">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
