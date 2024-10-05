/* eslint-disable react/prop-types */
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../../redux/features/products/product.service";
import { toast } from "react-toastify";
import { FaPen, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

export const TableActionBtn = (props) => {
  const dispatch = useDispatch();
  return (
    <div className="space-x-3">
      <Button
        danger
        type="primary"
        onClick={() => {
          dispatch(deleteProduct(props.id));
          toast.success("Item Deleted Successfully");
        }}
      >
        <FaTrash />
      </Button>
      <Link to={props.to}>
        <Button type="primary">
          <FaPen />
        </Button>
      </Link>
    </div>
  );
};
