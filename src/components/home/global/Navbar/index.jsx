import { Link, NavLink } from "react-router-dom";
import { Wrapper } from "../wrapper";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { Avatar, Button, Drawer, Dropdown, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../../../../redux/features/auth/auth.slice";
import { logoutUser } from "../../../../redux/features/auth/auth.service";
import { notify } from "../../../../helpers";
import { useState } from "react";
import { CartList } from "../../CartComponent/CartList.component";
import { getCart } from "../../../../redux/features/cart/cart.service";

export const Navbar = () => {
  const { items: user } = useSelector(selectAuth);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const showDrawer = async () => {
    await dispatch(getCart());
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    notify("Logged Out Successfully");
  };

  const items = [
    { key: 1, label: <NavLink to="/orders">Orders</NavLink> },
    { key: 2, label: <NavLink to="/wishlist">Wishlist</NavLink> },
    ...(user && user.role === "admin"
      ? [{ key: 3, label: <NavLink to="/admin">Dashboard</NavLink> }]
      : []),
    {
      key: 4,
      label: <p onClick={handleLogout}>Logout</p>,
    },
  ];

  return (
    <>
      <nav className="bg-gray-100">
        <Wrapper className="flex justify-between items-center">
          <a href="/" className="text-3xl font-bold">
            LOGO.
          </a>
          <div>
            <Input className="w-[500px] rounded-r-none" prefix={<FaSearch />} />
            <Button type="primary" className="rounded-l-none">
              Search
            </Button>
          </div>

          <div className="flex gap-5 items-center">
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={"/contact"}>Contact</NavLink>
            <Button to={"/cart"} onClick={showDrawer}>
              <FaShoppingCart />
            </Button>
            <Drawer onClose={onClose} width={500} title="Cart" open={open}>
              <CartList />
            </Drawer>

            {user ? (
              <Dropdown
                menu={{
                  items,
                }}
                trigger={["click"]}
              >
                <Avatar
                  src={user.avatar ? user.avatar : null}
                  icon={!user.avatar && <FaUser />}
                  style={{ cursor: "pointer" }}
                />
              </Dropdown>
            ) : (
              <>
                <Link to={"/login"}>
                  <Button type="primary">Login</Button>
                </Link>
                <Link to={"/register"}>
                  <Button type="primary">Register</Button>
                </Link>
              </>
            )}
          </div>
        </Wrapper>
      </nav>
    </>
  );
};
