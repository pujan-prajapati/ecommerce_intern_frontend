/* eslint-disable react/prop-types */
import { Button, Form, Input, InputNumber, Select, Spin, Upload } from "antd";
import { AdminHeader } from "../AdminHeader/admin-header";
import { FaUpload } from "react-icons/fa";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectProduct } from "../../../redux/features/products/product.slice";

export const ProductForm = ({ onSubmit }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const { isLoading } = useSelector(selectProduct);

  const onFinish = (values) => {
    const productData = {
      ...values,
      productImg: fileList[0]?.originFileObj,
    };

    onSubmit(productData);
  };

  if (isLoading)
    return (
      <div className="h-screen flex justify-center items-center">
        <Spin />
        <p className="ml-2">uploading...</p>
      </div>
    );

  return (
    <>
      <AdminHeader
        page_title={"Create Product"}
        base_title={"Products"}
        base_href="/admin/products"
      />

      <Form
        form={form}
        onFinish={onFinish}
        labelCol={{ span: 4 }}
        labelAlign="left"
      >
        {/* title */}
        <Form.Item
          label="Product Title"
          name="title"
          rules={[{ required: true, message: "Please enter product title" }]}
        >
          <Input placeholder="Enter product title" />
        </Form.Item>

        {/* price */}
        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please enter product price" }]}
        >
          <InputNumber prefix="$" />
        </Form.Item>

        {/* quantity */}
        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[{ required: true, message: "Please enter product quantity" }]}
        >
          <InputNumber />
        </Form.Item>

        {/* description */}
        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: true, message: "Please enter product description" },
          ]}
        >
          <Input.TextArea placeholder="Enter product description" />
        </Form.Item>

        {/* status */}
        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please select status" }]}
        >
          <Select placeholder="Select product status">
            <Select.Option value="in_stock">In Stock</Select.Option>
            <Select.Option value="out_of_stock">Out of Stock</Select.Option>
          </Select>
        </Form.Item>

        {/* product image */}
        <Form.Item
          label="Product Image"
          name="productImg"
          rules={[
            {
              required: true,
              message: "Please upload product image",
            },
          ]}
        >
          <Upload
            beforeUpload={() => false}
            listType="picture"
            accept="image/*"
            fileList={fileList}
            onChange={({ fileList }) => setFileList(fileList)}
          >
            <Button icon={<FaUpload />}>Upload Image</Button>
          </Upload>
        </Form.Item>

        {/* submit button */}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
