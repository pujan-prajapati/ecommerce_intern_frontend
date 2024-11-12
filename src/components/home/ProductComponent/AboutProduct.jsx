import { Link, useNavigate, useParams } from "react-router-dom";
import { Wrapper } from "../global";
import { useDispatch, useSelector } from "react-redux";
import { selectProduct } from "../../../redux/features/products/product.slice";
import { useEffect, useState } from "react";
import { getProductById } from "../../../redux/features/products/product.service";
import { Button, Form, Input, InputNumber, Spin } from "antd";
import { addToCart } from "../../../redux/features/cart/cart.service";
import { getLocalStore, notify } from "../../../helpers";
import { selectCart } from "../../../redux/features/cart/cart.slice";
import { useForm } from "antd/es/form/Form";
import {
  addComment,
  deleteComment,
  getComments,
} from "../../../redux/features/comments/comments.service";
import { selectComments } from "../../../redux/features/comments/comment.slice";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";

export const AboutProduct = () => {
  const { id } = useParams();
  const [form] = useForm();
  const { product, isLoading: productLoading } = useSelector(selectProduct);
  const { isLoading } = useSelector(selectCart);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const { comments } = useSelector(selectComments);
  const navigate = useNavigate();

  const user = getLocalStore("user");

  useEffect(() => {
    dispatch(getProductById(id));
    dispatch(getComments(id));
  }, [dispatch, id]);

  const handleAddToCart = async () => {
    const cartItem = {
      productId: product?._id,
      quantity,
    };

    if (user) {
      try {
        await dispatch(addToCart(cartItem));

        notify("Item added to cart");
      } catch (error) {
        notify(error, "error");
      }
    } else {
      navigate("/login");
    }
  };

  const handleAddComment = (value) => {
    try {
      dispatch(addComment({ productId: id, comment: value.comment }));
      form.resetFields();
      notify("Comment added successfully");
    } catch (error) {
      console.log(error);
      notify("Failed to add comment", "error");
    }
  };

  if (productLoading) return <Spin fullscreen />;

  return (
    <>
      <section className="my-10">
        <Wrapper>
          <section className={"flex gap-10 justify-center "}>
            {/* left side */}
            <div>
              <img
                src={product?.image}
                className="w-full h-[400px] object-contain"
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

              <p className="font-medium">
                <span className="bg-gray-100 px-5 py-2 rounded-md font-medium">
                  Available
                </span>{" "}
                : {product?.quantity}
              </p>

              <div className="font-medium">
                <span className="bg-gray-100 px-5 py-2 rounded-md font-medium">
                  Quantity
                </span>{" "}
                :{" "}
                <InputNumber min={1} defaultValue={1} onChange={setQuantity} />
              </div>

              <div className="flex flex-col">
                <Button
                  className="mb-5 text-lg w-96 py-5  bg-cyan-600 hover:!bg-cyan-500"
                  type="primary"
                  onClick={handleAddToCart}
                  loading={isLoading}
                >
                  Add to Cart
                </Button>

                <Link to={`/products/${id}/buynow`} state={{ quantity }}>
                  <Button
                    className="text-lg w-96 py-5  bg-green-600 hover:!bg-green-500"
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
          </section>

          {/* question and answer */}
          <section className="w-1/2 m-auto my-10 space-y-5">
            <h1 className="text-2xl font-semibold">Questions and Answers</h1>
            <div className="border p-4 space-y-3">
              {!getLocalStore("accessToken") ? (
                <Link
                  to="/login"
                  className="text-red-500 text-sm hover:text-red-400"
                >
                  Login to ask a question
                </Link>
              ) : (
                user.role !== "admin" && (
                  <Form
                    onFinish={handleAddComment}
                    form={form}
                    className="mb-5"
                  >
                    <Form.Item className="mb-2" name="comment">
                      <Input.TextArea
                        rows={3}
                        showCount
                        maxLength={100}
                        className="rounded-none !border-[#d1d5d8]"
                        placeholder="Write your question here..."
                        style={{ resize: "none" }}
                      />
                    </Form.Item>

                    <Button
                      type="primary"
                      className="bg-orange-500 hover:!bg-orange-600"
                      htmlType="submit"
                    >
                      Ask Question
                    </Button>
                  </Form>
                )
              )}

              {comments?.map((comment) => (
                <div key={comment._id} className="border p-4 space-y-3">
                  <div className="  flex justify-between items-center">
                    <div className="flex gap-3 items-center">
                      <BsFillQuestionSquareFill className="w-5 h-5" />
                      <p>{comment.comment}</p>
                    </div>
                    {(comment?.user === getLocalStore("user")?._id ||
                      getLocalStore("user")?.role === "admin") && (
                      <Button
                        type="primary"
                        danger
                        onClick={async () => {
                          await dispatch(deleteComment(comment._id));
                          dispatch(getComments(id));
                        }}
                      >
                        <FaTrash />
                      </Button>
                    )}
                  </div>

                  {/* admin reply
                  {getLocalStore("user")?.role === "admin" && (
                    <Form>
                      <Form.Item className="mb-2" name="reply">
                        <Input.TextArea
                          rows={2}
                          showCount
                          maxLength={100}
                          className="rounded-none !shadow-none !border-[#d1d5d8]"
                          placeholder="Write your answer here..."
                          style={{ resize: "none" }}
                        />
                      </Form.Item>

                      <Button
                        type="primary"
                        className="bg-green-600 hover:!bg-green-500"
                        htmlType="submit"
                      >
                        Reply
                      </Button>
                    </Form>
                  )} */}
                </div>
              ))}
            </div>
          </section>
        </Wrapper>
      </section>
    </>
  );
};
