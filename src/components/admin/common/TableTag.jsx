/* eslint-disable react/prop-types */
import { Tag } from "antd";

export const TableTag = ({ tagTitle, tagColor }) => {
  return (
    <>
      <Tag color={tagColor}>{tagTitle}</Tag>
    </>
  );
};
