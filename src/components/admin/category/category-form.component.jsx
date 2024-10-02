/* eslint-disable react/prop-types */
import { Button, Form, Input, Select } from "antd";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const CategoryForm = ({ onFinish, initialValues }) => {
  const [form] = Form.useForm();

  const handleOnFinish = (values) => {
    onFinish(values);
    form.resetFields();
  };

  const handleOnFinishFailed = (errorInfo) => {
    console.log("Form Error : ", errorInfo);
    toast.error("Fill All Fields");
  };

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  return (
    <>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        labelAlign="left"
        onFinish={handleOnFinish}
        onFinishFailed={handleOnFinishFailed}
        initialValues={initialValues}
      >
        {/* name  */}
        <Form.Item
          label="Category Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Category name is required!",
            },
          ]}
        >
          <Input placeholder="Category name..." />
        </Form.Item>

        {/* category */}
        <Form.Item
          label="Product Category"
          name="category"
          rules={[{ required: true, message: "Please input category!" }]}
        >
          <Select
            placeholder="Select Category"
            options={[
              { value: "Shoes", label: "Shoes" },
              { value: "Bag", label: "Bag" },
              { value: "Cosmetics", label: "Cosmetics" },
              { value: "T-shirt", label: "T-shirt" },
              { value: "Stationary", label: "Stationary" },
            ]}
          />
        </Form.Item>

        {/* image  */}
        <Form.Item
          label="Category Image"
          name="image"
          rules={[
            {
              required: true,
              message: "Category image is required!",
            },
          ]}
        >
          <Input placeholder="Image Url..." />
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
