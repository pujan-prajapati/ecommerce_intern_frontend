import { useEffect } from "react";
import { selectOrder } from "../../../redux/features/orders/order.slice";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrders } from "../../../redux/features/orders/order.service";
import { Spin, Tag } from "antd";
import { Link } from "react-router-dom";

export const OrderCard = () => {
  const { orders, isLoading } = useSelector(selectOrder);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  if (isLoading) return <Spin />;

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {orders.map((order) => (
        <Link
          to={`/orders/getorder/${order._id}`}
          key={order._id}
          className="bg-gray-200 hover:shadow-md transistion duration-200"
        >
          <img
            src={order.product.productDetails.image}
            alt={order.product.productDetails.name}
            className="w-full h-52 object-contain bg-gray-50"
          />
          <div className="p-3 font-semibold space-y-2">
            <p>{order.product.productDetails.name}</p>
            <p>Quantity : {order.product.quantity}</p>
            <p className="text-red-500 text-xl">$ {order.product.price}</p>
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
          </div>
        </Link>
      ))}
    </section>
  );
};
