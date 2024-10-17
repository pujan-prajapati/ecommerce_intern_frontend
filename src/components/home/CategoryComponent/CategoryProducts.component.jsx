import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectProduct } from "../../../redux/features/products/product.slice";
import { useEffect } from "react";
import { getProductsByCategory } from "../../../redux/features/products/product.service";

export const CategoryProducts = () => {
  const { id } = useParams();
  const { products } = useSelector(selectProduct);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsByCategory(id));
  }, [dispatch, id]);

  return (
    <>
      <section className="pt-5">
        <div className="mb-5">
          <h1 className="text-3xl font-bold ">
            Product : {products?.[0]?.category?.name}
          </h1>
          <p>Total : {products?.length} Products</p>
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 h-fit gap-4">
          {products.map((product) => (
            <Link key={product._id} to={`/products/${product._id}`}>
              <div className="mb-3 h-[370px] bg-gray-100 hover:shadow-md transition-all duration-300">
                <div className="h-[230px]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full bg-white w-full object-contain"
                  />
                </div>
                <div className="font-semibold p-2">
                  <h1>{product.name}</h1>
                  <p className="text-red-500">$ {product.price}</p>
                  <p className="font-normal">
                    {product.description.length > 50
                      ? product.description.slice(0, 50) + "..."
                      : product.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};
