/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ component }) => {
  let token = localStorage.getItem("token") || "";

  if (token) {
    return component;
  }

  return <Navigate to={"/login"} />;
};

export const AdminPrivateRoute = ({ component }) => {
  let token = localStorage.getItem("token");
  let role = localStorage.getItem("role");

  if (token && role === "admin") {
    return component;
  } else {
    return <Navigate to={"/"} />;
  }
};
