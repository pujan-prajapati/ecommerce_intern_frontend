import { Button, Layout, Menu } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import {
  FaHamburger,
  FaBoxes,
  FaShoppingBag,
  FaClipboardCheck,
} from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";

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
            className="bg-transparent"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: 1,
                icon: <FaClipboardCheck />,
                label: <Link to={"/admin"}>Dashboard</Link>,
              },
              {
                key: 2,
                icon: <FaShoppingBag />,
                label: <Link to={"/admin/products"}>Products</Link>,
              },
              {
                key: 3,
                icon: <FaBoxes />,
                label: <Link to={"/admin/category"}>Category</Link>,
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header className="bg-gray-200 ">
            <Button type="primary" onClick={() => setCollapsed(!collapsed)}>
              <FaHamburger />
            </Button>
          </Header>
          <Content className="px-10 py-5 bg-gray-200 m-5 rounded-lg">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
