import { RavenButton } from "@ravenpay/raven-bank-ui";
import React, { MouseEventHandler, ReactNode, useState } from "react";
import { icons } from "../../assets/icons";
import "./style/index.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { formatNumWithComma, symbol } from "../../helpers/Helper";
import TransactionStatus from "../../components/TransactionStatus";
import { setStatus } from "../../redux/payment";

const Container = ({
  children,
  onClick,
  title,
  button = true,
  recipient,
  amount,
  loading,
  merchant,
  className = "",
  btnLabel = "",
  btnDisabled = false,
  switchMethod,
}: {
  children: ReactNode;
  onClick?: Function;
  title?: string;
  amount?: number;
  recipient?: string;
  button?: boolean;
  btnDisabled?: boolean;
  merchant?: string;
  className?: string;
  btnLabel?: string;
  loading?: boolean;
  switchMethod?: boolean;
}) => {
  const goBackHome = () => {
    const page = document.querySelector(".page-layout");

    if (page) {
      page.classList.remove("show-mobile-contents");
    }
  };

  const { config, trx_status }: any = useSelector(
    (state: RootState) => state.payment
  );

  const dispatch = useDispatch();
  return (
    <div className={`container ${className}`}>
      <div className="container-content">
        <h6 className="container-content__title">{title || "Method Name"}</h6>

        <div className="container-content__payment-info">
          <div className="payment-info__left">
            <figure>
              <img
                src="https://play-lh.googleusercontent.com/HujVA5gwJyguTL8JNa-UKKyQP-I5Rf6skXduh8nLhxjzEoJZNEIKKbTTym7TQntm8lJ9"
                alt=""
              />
            </figure>
            <span>
              <small>Payment To.</small>
              <p>{config?.customer_email || config?.email || "--"}</p>
            </span>
          </div>

          <div className="payment-info__right">
            <p>
              {symbol(config?.currency?.toLowerCase()) +
                "" +
                formatNumWithComma(config?.amount, "ngn") || 0.0}
            </p>
            {/* <small>{recipient || "Mr Somebody"}</small> */}
          </div>
        </div>
        {trx_status?.length < 4 ? (
          children
        ) : (
          <TransactionStatus status={trx_status} />
        )}

        {trx_status !== "paid" && (
          <div
            className={`container-content__button ${
              trx_status?.length > 4 ? "switch-method-btn" : ""
            }`}
          >
            <RavenButton
              disabled={btnDisabled}
              loading={loading}
              onClick={() => {
                trx_status?.length > 4
                  ? dispatch(setStatus("d" as never))
                  : onClick && onClick();
              }}
              color="deep-green-dark"
              label={
                btnLabel
                  ? btnLabel
                  : trx_status?.length > 4
                  ? "Change Payment Method"
                  : "I have paid"
              }
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
