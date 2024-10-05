/* eslint-disable react/prop-types */
import { Button, Form, Input, InputNumber } from "antd";

export const CategoryProductForm = ({ onFinish, onFinishFailed, form }) => {
  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        labelCol={{ span: 4 }}
        labelAlign="left"
      >
        <Form.Item
          label="Category Product Name"
          name="name"
          rules={[
            { required: true, message: "Please input category product name!" },
          ]}
        >
          <Input placeholder="category product name" />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[
            { required: true, message: "Please input category product price!" },
          ]}
        >
          <InputNumber prefix="$" type="number" />
        </Form.Item>

        <Form.Item
          label="Image"
          name="image"
          rules={[
            { required: true, message: "Please input category product image!" },
          ]}
        >
          <Input placeholder="category product image" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
