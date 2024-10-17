import { Rate } from "antd";

export const CategorySidebar = () => {
  return (
    <>
      <aside className=" w-full h-screen p-5">
        <div className="space-y-2">
          <h1 className="font-semibold ">Rating</h1>
          <Rate allowHalf defaultValue={2.5} />
        </div>
      </aside>
    </>
  );
};
