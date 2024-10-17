import { Form, Input, Select } from "antd";
import { Wrapper } from "../global";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../../redux/features/products/product.service";
import { selectProduct } from "../../../redux/features/products/product.slice";

export const BuyProduct = () => {
  const [selectEsewa, setSelectEsewa] = useState(false);
  const { id } = useParams();
  const { product } = useSelector(selectProduct);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  const handleEsewa = (value) => {
    setSelectEsewa(value === "esewa");
  };

  const handleFinish = (values) => {
    console.log(values);
  };

  return (
    <>
      <Wrapper className={"flex gap-10 items-center justify-center mt-10"}>
        <figure>
          <img
            src={product?.image}
            alt={product?.name}
            className="w-96 object-cover"
          />
          <figcaption className="font-semibold">
            Product Name : {product?.name}
          </figcaption>
        </figure>

        <Form layout="vertical" onFinish={handleFinish}>
          {/* Delivery */}
          <h1 className="mb-3 text-2xl font-bold">Delivery</h1>

          {/* select country */}
          <Form.Item
            className="w-[500px]"
            name="country"
            rules={[
              {
                required: true,
                message: "Please input your delivery!",
              },
            ]}
          >
            <Select size="large" placeholder="Select Country">
              <Select.Option value="Nepal">Nepal</Select.Option>
            </Select>
          </Form.Item>

          {/* name */}
          <div className="flex gap-2">
            <Form.Item
              name="firstName"
              className="w-[245px]"
              rules={[
                {
                  required: true,
                  message: "Please input your fist name!",
                },
              ]}
            >
              <Input size="large" placeholder="Enter first name" />
            </Form.Item>

            <Form.Item
              className="w-[245px]"
              name="lastName"
              rules={[
                {
                  required: true,
                  message: "Please input your last name!",
                },
              ]}
            >
              <Input size="large" placeholder="Enter last name" />
            </Form.Item>
          </div>

          {/* address */}
          <Form.Item
            className="w-[500px]"
            name="address"
            rules={[
              {
                required: true,
                message: "Please input your address!",
              },
            ]}
          >
            <Input size="large" placeholder="Enter address" />
          </Form.Item>

          {/* city */}
          <Form.Item
            className="w-[500px]"
            name="city"
            rules={[
              {
                required: true,
                message: "Please input your city!",
              },
            ]}
          >
            <Input size="large" placeholder="Enter city" />
          </Form.Item>

          {/* phone */}
          <Form.Item
            className="w-[500px]"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            <Input size="large" placeholder="Enter phone number" />
          </Form.Item>

          <h1 className="text-2xl font-bold mb-2">Payment method</h1>

          <Form.Item
            className="w-[500px]"
            name="payment"
            rules={[
              {
                required: true,
                message: "Please select your payment method!",
              },
            ]}
          >
            <Select
              size="large"
              placeholder="Select payment method"
              onChange={handleEsewa}
            >
              <Select.Option value="cod">Cash on delivery</Select.Option>
              <Select.Option value="esewa">ESEWA</Select.Option>
            </Select>
          </Form.Item>
          {selectEsewa && (
            <div className="-mt-6  bg-gray-100 w-[500px] p-2 font-bold rounded-lg">
              <p>Esewa id : 9876543210</p>
              <p>Esewa id Name : My Store</p>
            </div>
          )}

          <Form.Item className="w-[500px]">
            <button
              type="submit"
              className="bg-yellow-500 w-full py-2 rounded-md text-xl font-bold text-white mt-2 hover:bg-yellow-600 transition-all ease-in-out duration-300"
            >
              Complete Order
            </button>
          </Form.Item>
        </Form>
      </Wrapper>
    </>
  );
};