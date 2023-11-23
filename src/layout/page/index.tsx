import React, { ReactNode } from "react";
import "./style/index.css";
import Sidebar from "../sidebar";
const PageLayout = ({
  children,
  onSelect,
}: {
  children?: ReactNode;
  onSelect: Function;
}) => {
  return (
    <div className="page-layout">
      <Sidebar onSelect={onSelect} />

      <div className="page-layout__children">{children}</div>
    </div>
  );
};

export default PageLayout;
