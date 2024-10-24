import { useParams } from "react-router-dom";
import { Wrapper } from "../../../components/home";
import { useDispatch, useSelector } from "react-redux";
import { selectOrder } from "../../../redux/features/orders/order.slice";
import { useEffect } from "react";
import {
  cancelOrder,
  getOrderById,
} from "../../../redux/features/orders/order.service";
import { Button, Spin, Tag } from "antd";
import { notify } from "../../../helpers";

export const OrderDetails = () => {
  const { id } = useParams();
  const { order, isLoading } = useSelector(selectOrder);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderById(id));
  }, [dispatch, id]);

  const handleCancelOrder = async () => {
    try {
      await dispatch(cancelOrder({ orderID: id }));
      notify("Order Cancelled Successfully");
      dispatch(getOrderById(id));
    } catch (error) {
      notify(error, "error");
    }
  };

  if (isLoading)
    return (
      <div className="h-screen flex justify-center items-center">
        <Spin />
      </div>
    );

  return (
    <>
      <Wrapper className={"mt-10"}>
        {order && (
          <div className=" flex justify-center items-center gap-10">
            <img
              src={order.product.productDetails.image}
              alt={order.product.productDetails.name}
            />

            <div className="max-w-xl space-y-5 font-semibold">
              <h1 className="text-3xl">{order.product.productDetails.name}</h1>
              <p className="text-lg">Quantity : {order.product.quantity}</p>
              <p className="text-red-500 text-xl">
                Price : $ {order.product.price}
              </p>
              <Tag
                color={
                  order.status === "pending"
                    ? "blue"
                    : order.status === "processing"
                    ? "yellow"
                    : order.status === "shipped"
                    ? "cyan"
                    : order.status === "delivered"
                    ? "green"
                    : "red"
                }
              >
                {order.status}
              </Tag>

              <p className="uppercase">
                Payment Method : {order.paymentMethod}
              </p>
              <div>
                <h2>Location : </h2>
                <p>Country : {order.location.country}</p>
                <p>City : {order.location.city}</p>
                <p>Address : {order.location.address}</p>
              </div>

              <p>Name : {order.firstName + " " + order.lastName}</p>
              <Button type="primary" danger onClick={handleCancelOrder}>
                Cancel Order
              </Button>
            </div>
          </div>
        )}
      </Wrapper>
    </>
  );
};
