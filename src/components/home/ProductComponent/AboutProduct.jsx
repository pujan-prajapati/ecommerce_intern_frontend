import { useParams } from "react-router-dom";
import { Wrapper } from "../global";
import { useDispatch, useSelector } from "react-redux";
import { selectProduct } from "../../../redux/features/products/product.slice";
import { useEffect } from "react";
import { getProductById } from "../../../redux/features/products/product.service";
import { Button, InputNumber } from "antd";

export const AboutProduct = () => {
  const { id } = useParams();
  const { product } = useSelector(selectProduct);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  return (
    <>
      <section>
        <Wrapper className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            {/* left side */}
            <img
              src={product?.image}
              className="w-[100%] h-[700px] object-cover"
              alt={product?.name}
            />
          </div>

          {/* right side */}
          <div className="space-y-10">
            <h1 className="text-5xl font-bold">{product?.name}</h1>

            <p className="font-medium">
              <span className="bg-gray-100 px-5 py-2 rounded-md font-medium">
                Price
              </span>{" "}
              : Rs. {product?.price}
            </p>

            <p className="font-medium">
              <span className="bg-gray-100 px-5 py-2 rounded-md font-medium">
                Quantity
              </span>{" "}
              : <InputNumber min={1} defaultValue={1} />
            </p>

            <div className="space-y-4">
              <Button
                className="text-lg w-96 py-5 rounded-full bg-gray-400 hover:!bg-gray-500"
                type="primary"
              >
                Add to Cart
              </Button>
              <Button className="text-lg w-96 py-5 rounded-full" type="primary">
                Buy it now
              </Button>
            </div>

            <p>
              <span className="bg-gray-100 px-5 py-2 rounded-md font-medium">
                Description
              </span>{" "}
              : {product?.description}
            </p>
          </div>
        </Wrapper>
      </section>
    </>
  );
};
