import React from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthHeader } from "../AuthHeader";

export const LoginComponent = () => {
  const navigate = useNavigate();

  const handleFormFinish = (values) => {
    console.log(values);
    navigate("/admin");
    toast.success("Login Success");
  };

  const handleFormFailed = (errorInfo) => {
    console.log("Error : ", errorInfo);
    toast.error("Fill all fields");
  };

  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center">
        <AuthHeader title="Login" />
        <Form
          onFinish={handleFormFinish}
          onFinishFailed={handleFormFailed}
          wrapperCol={{ span: 16 }}
          labelCol={{ span: 4 }}
          className="max-w-[600px] w-full"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Email is required",
              },
              {
                type: "email",
                message: "Must be valid email",
              },
            ]}
          >
            <Input placeholder="Email..." />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Password is required",
              },
              {
                min: 6,
                message: "Must be atleast 6 characters",
              },
            ]}
          >
            <Input.Password placeholder="******" />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              span: 16,
              offset: 4,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
