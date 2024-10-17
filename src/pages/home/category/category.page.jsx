import { Outlet } from "react-router-dom";
import { CategorySidebar, Wrapper } from "../../../components/home";

export const CategoryPage = () => {
  return (
    <>
      <Wrapper className="flex py-0 gap-4">
        <div className="w-[20.8333%]">
          <CategorySidebar />
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </Wrapper>
    </>
  );
};
