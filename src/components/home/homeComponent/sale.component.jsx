import { HomeHeader } from "../global/homeHeader";
import { Wrapper } from "../global/wrapper";

export const Sales = () => {
  return (
    <>
      <Wrapper>
        <HomeHeader title="Flash Sale" />
        <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div>
            <img
              src="https://images.unsplash.com/photo-1649433911119-7cf48b3e8f50?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2xvdGhzfGVufDB8MHwwfHx8MA%3D%3D"
              alt=""
            />
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1649433911119-7cf48b3e8f50?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2xvdGhzfGVufDB8MHwwfHx8MA%3D%3D"
              alt=""
            />
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1649433911119-7cf48b3e8f50?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2xvdGhzfGVufDB8MHwwfHx8MA%3D%3D"
              alt=""
            />
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1649433911119-7cf48b3e8f50?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2xvdGhzfGVufDB8MHwwfHx8MA%3D%3D"
              alt=""
            />
          </div>
        </section>
      </Wrapper>
    </>
  );
};
