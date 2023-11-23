import { RavenButton } from "@ravenpay/raven-bank-ui";
import React, { MouseEventHandler, ReactNode } from "react";
import { icons } from "../../assets/icons";
import "./style/index.css";

const Container = ({
  children,
  onClick,
  title,
  button = true,
  recipient,
  amount,
  merchant,
  className = "",
  switchMethod,
}: {
  children: ReactNode;
  onClick?: MouseEventHandler;
  title?: string;
  amount?: number;
  recipient?: string;
  button?: boolean;
  merchant?: string;
  className?: string;
  switchMethod?: boolean;
}) => {
  const goBackHome = () => {
    const page = document.querySelector(".page-layout");

    if (page) {
      page.classList.remove("show-mobile-contents");
    }
  };
  return (
    <div className={`container ${className}`}>
      <div className="container-content">
        <h6 className="container-content__title">{title || "Method Name"}</h6>

        <div className="container-content__payment-info">
          <div className="payment-info__left">
            <figure>
              <img
                src="https://images-na.ssl-images-amazon.com/images/S/pv-target-images/16627900db04b76fae3b64266ca161511422059cd24062fb5d900971003a0b70._RI_TTW_SX720_FMjpg_.jpg"
                alt=""
              />
            </figure>
            <span>
              <small>Payment To.</small>
              <p>{merchant || "Notbl.ank Studios"}</p>
            </span>
          </div>

          <div className="payment-info__right">
            <p>N{amount || 0.0}</p>
            <small>{recipient || "Mr Somebody"}</small>
          </div>
        </div>
        {children}

        {button && (
          <div
            className={`container-content__button ${
              switchMethod ? "switch-method-btn" : ""
            }`}
          >
            <RavenButton
              onClick={onClick as () => void}
              color="deep-green-dark"
              label={switchMethod ? "Change Payment Method" : "I have paid"}
            />
          </div>
        )}

        <div className="secured_by">{icons.securedBy}</div>
      </div>

      <div className="mobile-footer-actions non-desktop">
        <span onClick={goBackHome}>
          <p>Switch Payment Method</p>
        </span>

        <span>
          <p>Cancel Transaction</p>
        </span>
      </div>
    </div>
  );
};

export default Container;
