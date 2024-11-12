import { FaLocationPin } from "react-icons/fa6";
import { Wrapper } from "../../../components/home";

export const Contact = () => {
  return (
    <>
      <Wrapper className={"py-8"}>
        <h2 className="text-3xl text-center">Contact Form</h2>

        <section className="px-52 my-10 mx-auto flex justify-between ">
          <div className="flex flex-col items-center gap-3">
            <FaLocationPin className="w-10 h-10" />
            <p className="max-w-64">
              Address : 198 West 21th Street, Suite 721 New York NY 10016
            </p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <FaLocationPin className="w-10 h-10" />
            <p>Address : 198 West 21th Street</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <FaLocationPin className="w-10 h-10" />
            <p>Address : 198 West 21th Street</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <FaLocationPin className="w-10 h-10" />
            <p>Address : 198 West 21th Street</p>
          </div>
        </section>
      </Wrapper>
    </>
  );
};
