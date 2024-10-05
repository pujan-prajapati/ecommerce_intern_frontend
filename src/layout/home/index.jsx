import { Outlet } from "react-router-dom";
import { Navbar } from "../../components/home";

export const HomeLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
