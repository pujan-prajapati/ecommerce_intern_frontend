import { Link, useParams } from "react-router-dom";
import { Wrapper } from "../global";
import { useDispatch, useSelector } from "react-redux";
import { selectProduct } from "../../../redux/features/products/product.slice";
import { useEffect, useState } from "react";
import { getProductById } from "../../../redux/features/products/product.service";
import { Button, InputNumber } from "antd";

export const AboutProduct = () => {
  const { id } = useParams();
  const { product } = useSelector(selectProduct);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    const cartItem = {
      name: product?.name,
      price: product?.price,
      image: product?.image,
      quantity: quantity,
    };

    console.log("cartItem : ", cartItem);
  };

  return (
    <>
      <section className="my-10">
        <Wrapper className={"flex gap-10 justify-center "}>
          <div>
            {/* left side */}

            <img
              src={product?.image}
              className="w-full h-96 object-contain"
              alt={product?.name}
            />
          </div>

          {/* right side */}
          <div className="space-y-10 max-w-2xl">
            <h1 className="text-5xl font-bold ">{product?.name}</h1>

            <p className="font-medium text-red-500">
              <span className="bg-gray-100 px-5 py-2 text-black rounded-md font-medium">
                Price
              </span>{" "}
              : Rs. {product?.price}
            </p>

            <div className="font-medium">
              <span className="bg-gray-100 px-5 py-2 rounded-md font-medium">
                Quantity
              </span>{" "}
              : <InputNumber min={1} defaultValue={1} onChange={setQuantity} />
            </div>

            <div className="flex flex-col">
              <Button
                className="mb-5 text-lg w-96 py-5 rounded-full bg-gray-400 hover:!bg-gray-500"
                type="primary"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>

              <Link to={`/products/${id}/buynow`}>
                <Button
                  className="text-lg w-96 py-5 rounded-full"
                  type="primary"
                >
                  Buy it now
                </Button>
              </Link>
            </div>

            <p>
              <span className="bg-gray-100 px-5 py-2 rounded-md font-medium">
                Description
              </span>
              <br />
              <br /> {product?.description}
            </p>
          </div>
        </Wrapper>
      </section>
    </>
  );
};
