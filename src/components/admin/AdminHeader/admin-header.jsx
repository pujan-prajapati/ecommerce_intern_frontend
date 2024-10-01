/* eslint-disable react/prop-types */
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

export const AdminHeader = (props) => {
  return (
    <div className="mb-10">
      <h1 className="text-3xl font-bold underline mb-4">{props.page_title}</h1>

      <Breadcrumb
        items={[
          { title: <Link to={props.base_href}>{props.base_title}</Link> },
          { title: props.page_title },
        ]}
      />
    </div>
  );
};
