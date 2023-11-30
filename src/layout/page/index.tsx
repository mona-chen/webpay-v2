import React, { ReactNode } from "react";
import "./style/index.css";
import Sidebar from "../sidebar";
import { useDispatch, useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { icons } from "../../assets/icons";
import { onCancel } from "../../redux/payment";
const PageLayout = ({
  children,
  onSelect,
}: {
  children?: ReactNode;
  onSelect: Function;
}) => {
  const { showBlusaltModal } = useSelector((state: RootState) => state.payment);
  const dispatch = useAppDispatch();
  // retrieve plugin based configurations
  const params = new URLSearchParams(window.location.search);
  const platform = params.get("platform");

  const supportedPlatform =
    platform === ("wordpress" || "joomla" || "magento" || "atlas" || "banking")
      ? true
      : false;
  return (
    <div className={`modal-wrap ${supportedPlatform && "show-modal"} `}>
      <div className="page-layout">
        <div
          onClick={() => dispatch(onCancel(true as never))}
          className="close-modal-offset"
        >
          {icons.close}
        </div>
        <Sidebar onSelect={onSelect} />

        <div
          className={`page-layout__children ${
            showBlusaltModal ? "has-external-modal" : ""
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
