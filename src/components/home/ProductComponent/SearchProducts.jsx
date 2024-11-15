import { Link, useLocation } from "react-router-dom";
import { Wrapper } from "../global/wrapper";
import { useDispatch, useSelector } from "react-redux";
import { selectProduct } from "../../../redux/features/products/product.slice";
import { useEffect } from "react";
import { getAllProducts } from "../../../redux/features/products/product.service";
import { ProductSidebar } from "../global/productSidebar";
import { Pagination, Spin } from "antd";

export const SearchProducts = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const searchValue = searchParams.get("search") || "";

  const dispatch = useDispatch();
  const { products, isLoading, totalPages, currentPage, totalProducts } =
    useSelector(selectProduct);

  useEffect(() => {
    dispatch(getAllProducts({ page: 1, limit: 10, search: searchValue }));
  }, [dispatch, searchValue]);

  return (
    <>
      <Wrapper className="flex py-0 gap-4">
        <div className="w-[20.8333%]">
          <ProductSidebar searchValue={searchValue} />
        </div>
        <div className="flex-1">
          <section>
            <h1>Search Results for : {searchValue} </h1>
            <p>Total Products : {products.length}</p>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 h-fit gap-4">
              {isLoading ? (
                <Spin />
              ) : (
                products.map((product) => (
                  <div
                    className="mb-3 h-[400px] bg-gray-100 hover:shadow-md transition-all duration-300 relative"
                    key={product._id}
                  >
                    <Link to={`/products/${product._id}`}>
                      <div className="h-[230px]">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full bg-white w-full object-contain"
                        />
                      </div>
                    </Link>

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
                ))
              )}
            </div>
          </section>

          {totalPages > 1 && (
            <div className="text-center mt-4">
              <Pagination
                current={currentPage}
                total={totalProducts}
                pageSize={10}
                onChange={(page) =>
                  dispatch(getAllProducts({ page, limit: 10 }))
                }
                showSizeChanger={false}
                showTotal={(total, range) =>
                  `${range[0]}-${range[1]} of ${total} items`
                }
              />
            </div>
          )}
        </div>
      </Wrapper>
    </>
  );
};
