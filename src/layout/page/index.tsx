import React, { ReactNode } from "react";
import "./style/index.css";
import Sidebar from "../sidebar";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
const PageLayout = ({
  children,
  onSelect,
}: {
  children?: ReactNode;
  onSelect: Function;
}) => {
  const { showBlusaltModal } = useSelector((state: RootState) => state.payment);
  return (
    <div className="page-layout">
      <Sidebar onSelect={onSelect} />

      <div
        className={`page-layout__children ${
          showBlusaltModal ? "has-external-modal" : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
