import { useDispatch, useSelector } from "react-redux";
import { HomeHeader } from "../global/homeHeader";
import { Wrapper } from "../global/wrapper";
import { selectCategory } from "../../../redux/features/category/category.slice";
import { useEffect } from "react";
import { getAllCategories } from "../../../redux/features/category/category.service";
import { Link } from "react-router-dom";

export const Categories = () => {
  const { categories } = useSelector(selectCategory);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <>
      <Wrapper>
        <HomeHeader title="Categories" />
        <section className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {categories.map((category) => (
            <Link key={category._id} to={`/category/${category._id}`}>
              <div className="h-64 bg-gray-100 hover:shadow-lg transition-all duration-300">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-52 object-contain bg-gray-50"
                />
                <p className="text-center  text-xl mt-2">{category.name}</p>
              </div>
            </Link>
          ))}
        </section>
      </Wrapper>
    </>
  );
};
