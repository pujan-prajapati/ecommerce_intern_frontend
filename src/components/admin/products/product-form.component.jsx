/* eslint-disable react/prop-types */
import { Button, Form, Input, InputNumber } from "antd";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const ProductForm = ({ onFinish, initialValues }) => {
  const [form] = Form.useForm();

  const handleOnFinish = (values) => {
    onFinish(values);
    form.resetFields();
  };

  const handleOnFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    toast.error("Fill all fields");
  };

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  return (
    <>
      <Form
        labelCol={{ span: 4 }}
        form={form}
        labelAlign="left"
        onFinish={handleOnFinish}
        onFinishFailed={handleOnFinishFailed}
        initialValues={initialValues}
      >
        {/* name */}
        <Form.Item
          label="Product Name"
          name="name"
          rules={[{ required: true, message: "Please input product name!" }]}
        >
          <Input placeholder="Product Name..." />
        </Form.Item>

        {/* price */}
        <Form.Item
          label="Product Price"
          name="price"
          rules={[{ required: true, message: "Please input product price!" }]}
        >
          <InputNumber type="number" prefix="$" />
        </Form.Item>

        {/* image */}
        <Form.Item
          label="Product Image"
          name="image"
          rules={[{ required: true, message: "Please provide image!" }]}
        >
          <Input placeholder="Image string..." />
        </Form.Item>

        {/* button */}
        <Form.Item wrapperCol={{ offset: 4 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
