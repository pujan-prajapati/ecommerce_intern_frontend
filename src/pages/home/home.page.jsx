import { CarouselComponent, HomeHeader, Wrapper } from "../../components/home";
import { Categories } from "../../components/home/homeComponent/Category.component";
import { Sales } from "../../components/home/homeComponent/sale.component";

export const Home = () => {
  return (
    <>
      <CarouselComponent />

      <Sales />

      <Categories />
    </>
  );
};
