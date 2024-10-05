import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthHeader } from "../AuthHeader";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../redux/features/auth/auth.service";
import { selectAuth } from "../../../redux/features/auth/auth.slice";
import { useEffect } from "react";

export const RegisterComponent = () => {
  const { isError, isSuccess, errorMessage, errorMsg } =
    useSelector(selectAuth);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleFormFinish = (values) => {
    dispatch(registerUser(values));
  };

  const handleFormFailed = (errorInfo) => {
    console.log("Error : ", errorInfo);
    toast.error("Fill all fields");
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Register Success");
      navigate("/login");
      form.resetFields();
    } else if (isError) {
      toast.error(errorMsg || "Registeration Failed");
    }
  }, [isSuccess, isError, errorMessage, navigate, form]);

  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center">
        <AuthHeader title="Register" />
        <Form
          form={form}
          onFinish={handleFormFinish}
          onFinishFailed={handleFormFailed}
          wrapperCol={{ span: 16 }}
          labelCol={{ span: 4 }}
          labelAlign="left"
          className="max-w-[600px] w-full"
        >
          {/* username */}
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              {
                required: true,
                message: "First name is required",
              },
            ]}
          >
            <Input placeholder="First name" />
          </Form.Item>

          {/* lastname */}
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              {
                required: true,
                message: "lastname is required",
              },
            ]}
          >
            <Input placeholder="lastname" />
          </Form.Item>

          {/* email */}
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

          {/* address */}
          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "address is required",
              },
              {
                type: "address",
                message: "Must be valid address",
              },
            ]}
          >
            <Input placeholder="address..." />
          </Form.Item>

          <Form.Item
            label="Mobile"
            name="mobile"
            rules={[
              {
                required: true,
                message: "Mobile is required",
              },
            ]}
          >
            <Input type="number" placeholder="mobile" />
          </Form.Item>

          {/* password */}
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
