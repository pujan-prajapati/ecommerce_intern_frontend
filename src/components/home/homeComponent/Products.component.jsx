import { useDispatch, useSelector } from "react-redux";
import { selectProduct } from "../../../redux/features/products/product.slice";
import { HomeHeader, Wrapper } from "../global";
import { getLatestProducts } from "../../../redux/features/products/product.service";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export const Products = () => {
  const { products } = useSelector(selectProduct);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLatestProducts());
  }, [dispatch]);

  return (
    <>
      <Wrapper>
        <HomeHeader title={"Products"} />

        <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {products.map((product) => (
            <Link key={product._id} to={`/products/${product._id}`}>
              <div className=" h-[320px]  bg-gray-100 hover:shadow-lg transition-all duration-300">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-52 w-full bg-gray-50 object-contain"
                />
                <div className="p-3">
                  <p>
                    {product.name.length > 50
                      ? `${product.name.slice(0, 50)}...`
                      : product.name}
                  </p>
                  <p className="text-red-500">$ {product.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </section>
      </Wrapper>
    </>
  );
};
