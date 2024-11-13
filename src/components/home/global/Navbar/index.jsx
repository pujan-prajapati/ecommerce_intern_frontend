import { Link, NavLink, useNavigate } from "react-router-dom";
import { Wrapper } from "../wrapper";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { Avatar, Badge, Button, Drawer, Dropdown, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../../../../redux/features/auth/auth.slice";
import { logoutUser } from "../../../../redux/features/auth/auth.service";
import { getLocalStore, notify } from "../../../../helpers";
import { useEffect, useState } from "react";
import { CartList } from "../../CartComponent/CartList.component";
import { getCart } from "../../../../redux/features/cart/cart.service";
import { selectCart } from "../../../../redux/features/cart/cart.slice";

export const Navbar = () => {
  const token = getLocalStore("accessToken");

  const { items: user } = useSelector(selectAuth);
  const { items: cartItems } = useSelector(selectCart);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      dispatch(getCart());
    }
  }, [dispatch, token]);

  const showDrawer = () => {
    dispatch(getCart());
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    notify("Logged Out Successfully");
    navigate("/login");
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

  const handleSearch = () => {
    if (searchValue.trim()) {
      navigate(`/products?search=${searchValue}`);
    }
  };

  return (
    <>
      <nav className="shadow-sm">
        <Wrapper className="flex justify-between items-center">
          <Link to="/" className="logo text-3xl">
            LOGO.
          </Link>

          <div>
            <Input
              className="!shadow-none !border-inherit w-[500px] rounded-r-none"
              prefix={<FaSearch />}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onPressEnter={handleSearch}
            />
            <Button
              type="primary"
              className="rounded-l-none shadow-none bg-green-600 hover:!bg-green-500"
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>

          <div className="nav-links flex gap-8 items-center">
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={"/contact"}>Contact</NavLink>
            <Badge
              count={(token && cartItems?.length) || 0}
              size="small"
              color="green"
              onClick={showDrawer}
              className="cursor-pointer"
            >
              <FaShoppingCart />
            </Badge>
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
              <div className="flex gap-2">
                <Link to={"/login"}>
                  <Button
                    type="primary"
                    className="bg-orange-500 hover:!bg-orange-600"
                  >
                    Login
                  </Button>
                </Link>
                <Link to={"/register"}>
                  <Button className="border-orange-500 hover:!border-orange-500 hover:!bg-orange-500 hover:!text-white">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </Wrapper>
      </nav>
    </>
  );
};
