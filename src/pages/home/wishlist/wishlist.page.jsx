import { useDispatch, useSelector } from "react-redux";
import { HomeHeader, Wrapper } from "../../../components/home";
import { selectWishlist } from "../../../redux/features/wishlist/wishlist.slice";
import { useEffect, useState } from "react";
import {
  getAllWishlist,
  removeFromWishlist,
} from "../../../redux/features/wishlist/wishlist.service";
import { Button, Table } from "antd";
import { FaTrash, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const columns = (dispatch) => [
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    render: (text, record) => (
      <img src={text} alt={record.name} className="w-20 h-20 object-contain" />
    ),
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <p className=" text-lg font-semibold">{text}</p>,
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (text) => (
      <p className="text-red-400 text-lg font-semibold">$ {text}</p>
    ),
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    align: "right",
    render: (text, record) => (
      <div className="flex gap-2 justify-end">
        <Button
          type="primary"
          danger
          icon={<FaTrash />}
          onClick={() =>
            dispatch(removeFromWishlist(record._id)).then(() => {
              dispatch(getAllWishlist());
            })
          }
        />
        <Link to={`/products/${record._id}`}>
          <Button type="primary" icon={<FaEye />} />
        </Link>
      </div>
    ),
  },
];

export const WishList = () => {
  const { items } = useSelector(selectWishlist);
  const dispatch = useDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  useEffect(() => {
    dispatch(getAllWishlist());
  }, [dispatch]);

  const handleDeleteSelected = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete them!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleting...",
          text: "Please wait while we delete the admin.",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        for (const id of selectedRowKeys) {
          await dispatch(removeFromWishlist(id));
          dispatch(getAllWishlist());
        }
        setSelectedRowKeys([]);
        Swal.fire({
          title: "Deleted!",
          text: "Selected users have been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <>
      <Wrapper>
        <HomeHeader className={"text-center"} title={"Wishlist"} />

        <div className="mb-4 flex justify-end">
          <Button
            danger
            type="primary"
            hidden={!selectedRowKeys.length}
            onClick={handleDeleteSelected}
          >
            <FaTrash /> Delete Selected
          </Button>
        </div>
        {items.length > 0 ? (
          <Table
            columns={columns(dispatch)}
            dataSource={items}
            rowKey={"_id"}
            rowSelection={rowSelection}
          />
        ) : (
          <p className="text-center text-lg font-semibold">
            Your wishlist is empty.
          </p>
        )}
      </Wrapper>
    </>
  );
};
