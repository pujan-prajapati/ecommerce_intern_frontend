import { Wrapper } from "../../../components/home/global/wrapper";
import { HomeHeader } from "../../../components/home/global/homeHeader";
import { OrderCard } from "../../../components/home/OrderComponent/order.card.component";

export const OrderPage = () => {
  return (
    <>
      <Wrapper>
        <HomeHeader className={"text-center"} title={"My Order"} />

        <OrderCard />
      </Wrapper>
    </>
  );
};
