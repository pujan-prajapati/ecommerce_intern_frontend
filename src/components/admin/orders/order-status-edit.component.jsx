import { Button, Form, Select } from "antd";
import { AdminHeader } from "../AdminHeader";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAllOrders,
  updateOrderStatus,
} from "../../../redux/features/orders/order.service";
import { notify } from "../../../helpers";

export const OrderStatusEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const onFinish = async (values) => {
    try {
      await dispatch(updateOrderStatus({ orderID: id, formData: values }));
      notify("Order Status Updated Successfully");
      await dispatch(getAllOrders());
      navigate("/admin/orders");
    } catch (error) {
      notify(error, "error");
    }
  };

  return (
    <>
      <AdminHeader
        base_href={"/admin/orders"}
        base_title={"Orders"}
        page_title={"Order Status Edit"}
      />

      <Form onFinish={onFinish} labelCol={{ span: 4 }} labelAlign="left">
        <Form.Item label="Status" name={"status"}>
          <Select
            placeholder="Select Status"
            options={[
              { value: "pending", label: "Pending" },
              { value: "processing", label: "Processing" },
              { value: "shipped", label: "Shipped" },
              { value: "delivered", label: "Delivered" },
              { value: "cancelled", label: "Cancelled" },
            ]}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4 }}>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
