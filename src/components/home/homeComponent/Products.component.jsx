import { useDispatch, useSelector } from "react-redux";
import { selectProduct } from "../../../redux/features/products/product.slice";
import { HomeHeader, Wrapper } from "../global";
import { getAllProducts } from "../../../redux/features/products/product.service";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export const Products = () => {
  const { products } = useSelector(selectProduct);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <>
      <Wrapper>
        <HomeHeader title={"Products"} />

        <section className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {products.map((product) => (
            <Link key={product._id} to={`/products/${product._id}`}>
              <div className="p-3 bg-gray-200">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-52 w-full object-cover"
                />
                <div>
                  <p className="text-center font-bold text-xl mt-2">
                    {product.name}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </section>
      </Wrapper>
    </>
  );
};
