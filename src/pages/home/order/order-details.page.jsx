import { useNavigate, useParams } from "react-router-dom";
import { Wrapper } from "../../../components/home";
import { useDispatch, useSelector } from "react-redux";
import { selectOrder } from "../../../redux/features/orders/order.slice";
import { useEffect } from "react";
import {
  cancelOrder,
  getOrderById,
} from "../../../redux/features/orders/order.service";
import { FaBus, FaDollarSign, FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Button, Spin, Tag } from "antd";
import { notify } from "../../../helpers";

export const OrderDetails = () => {
  const { id } = useParams();
  const { order, isLoading } = useSelector(selectOrder);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getOrderById(id));
  }, [dispatch, id]);

  const orderedDate = order ? new Date(order.createdAt) : null;

  const handleCancelOrder = async () => {
    try {
      await dispatch(cancelOrder({ orderID: id }));
      notify("Order Canceled Successfully");
      navigate("/orders");
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <Spin fullscreen />;

  return (
    <>
      <Wrapper>
        <h4 className="text-lg ">Order ID : {id}</h4>
        <h4 className="text-lg ">
          Ordered Date : {orderedDate?.toLocaleDateString()}
        </h4>

        {/* information */}
        <section className="my-5  flex justify-between bg-gray-100 rounded-lg p-7">
          {/* customer */}
          <div className="flex gap-5">
            <FaUser className="bg-white p-2 w-14 h-14 rounded-full" />
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold">Customer</h3>
              <p>
                <span className="text-gray-500">Name</span>:{" "}
                {order?.user?.firstName + " " + order?.user?.lastName}
              </p>
              <p>
                <span className="text-gray-500">Email</span>:{" "}
                {order?.user?.email}
              </p>
              <p>
                <span className="text-gray-500">Phone</span>:{" "}
                {order?.user?.mobile}
              </p>
            </div>
          </div>

          {/* order info */}
          <div className="flex gap-5">
            <FaCartShopping className="bg-white p-2 w-14 h-14 rounded-full" />
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold">Order Info</h3>
              <p>
                <span className="text-gray-500">Payment Method</span>:{" "}
                {order?.paymentMethod?.toUpperCase()}
              </p>
              <p>
                <span className="text-gray-500">Country</span>:{" "}
                {order?.location?.country}
              </p>
              <p>
                <span className="text-gray-500">Address</span>:{" "}
                {order?.location?.address}, {order?.location?.city}
              </p>
            </div>
          </div>

          {/* Total Price */}
          <div className="flex gap-5">
            <FaDollarSign className="bg-white p-2 w-14 h-14 rounded-full" />
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold">Total Price</h3>
              <p className="text-red-400 text-xl font-semibold">
                $ {order?.totalPrice.toFixed(2)}
              </p>
            </div>
          </div>

          {/* order status */}
          <div className="flex gap-5">
            <FaBus className="bg-white p-2 w-14 h-14 rounded-full" />
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold">Order Status</h3>
              <Tag
                color={
                  order?.status === "pending"
                    ? "yellow"
                    : order?.status === "processing"
                    ? "orange"
                    : order?.status === "shipped"
                    ? "blue"
                    : order?.status === "delivered"
                    ? "green"
                    : "red"
                }
              >
                {order?.status}
              </Tag>

              {order?.status === "shipped" || order?.status === "delivered" ? (
                <p>
                  Order has been {order.status}. So you cannot cancel the order
                </p>
              ) : order?.status === "cancelled" ? (
                <p className="text-red-500">Order has been cancelled</p>
              ) : (
                <Button
                  block
                  danger
                  type="primary"
                  className="!mt-5"
                  onClick={handleCancelOrder}
                >
                  Cancel Order
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* products */}
        <section>
          <h3 className="text-2xl font-semibold mb-5">Ordered Products</h3>
          {order?.product.map((product) => (
            <div className="flex mb-6 gap-4" key={product._id}>
              <img
                src={product.productDetails?.image}
                alt={product.productDetails?.name}
                className="w-32 h-32 object-contain"
              />
              <div>
                <h4 className="max-w-[200px] text-lg font-semibold">
                  {product.productDetails?.name}
                </h4>
                <p>
                  <span className="text-gray-500">Price</span>: ${" "}
                  {product.totalPrice}
                </p>
                <p>
                  <span className="text-gray-500">Quantity</span>:{" "}
                  {product.quantity}
                </p>
              </div>
            </div>
          ))}
        </section>
      </Wrapper>
    </>
  );
};
