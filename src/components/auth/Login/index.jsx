import { Alert, Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthHeader } from "../AuthHeader";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../redux/features/auth/auth.service";
import { selectAuth } from "../../../redux/features/auth/auth.slice";
import { useEffect } from "react";

export const LoginComponent = () => {
  const [form] = Form.useForm();
  const {
    items: user,
    isLoading,
    isError,
    isSuccess,
    errorMsg,
  } = useSelector(selectAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormFinish = (values) => {
    dispatch(loginUser(values));
    form.resetFields();
  };

  useEffect(() => {
    if (isSuccess && user?.token) {
      toast.success("Login Successful");
      if (user?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } else if (isError) {
      toast.error(errorMsg || "Login Failed");
    }
  }, [isSuccess, isError, user, errorMsg, navigate]);

  const handleFormFailed = (errorInfo) => {
    console.log("Error : ", errorInfo);
    toast.error("Fill all fields");
  };

  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center">
        <AuthHeader title="Login" />
        <Form
          form={form}
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
            <Button type="primary" loading={isLoading} htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
