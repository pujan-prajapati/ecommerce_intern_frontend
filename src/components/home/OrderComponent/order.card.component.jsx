import { useEffect } from "react";
import { selectOrder } from "../../../redux/features/orders/order.slice";
import { useSelector, useDispatch } from "react-redux";
import { getUserOrders } from "../../../redux/features/orders/order.service";
import { Alert, Pagination, Spin, Tag } from "antd";
import { Link } from "react-router-dom";

export const OrderCard = () => {
  const { orders, isLoading, currentPage, totalPages, totalCount, errorMsg } =
    useSelector(selectOrder);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserOrders({ page: currentPage, limit: 10 }));
  }, [dispatch, currentPage]);

  if (isLoading) return <Spin />;

  if (errorMsg) return <Alert message={errorMsg} type="error" showIcon />;

  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {!orders ? (
          <Alert
            message="No Orders Yet"
            type="info"
            showIcon
            className="text-center"
          />
        ) : (
          orders.map((order) => (
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
          ))
        )}
      </section>

      {totalPages > 1 && (
        <div className="text-center mt-4">
          <Pagination
            current={currentPage}
            total={totalCount}
            pageSize={10}
            onChange={(page) => dispatch(getUserOrders({ page, limit: 10 }))}
            showSizeChanger={false}
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} of ${total} items`
            }
          />
        </div>
      )}
    </>
  );
};
