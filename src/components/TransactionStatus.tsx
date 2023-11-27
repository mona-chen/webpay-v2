import React from "react";
import spinner from "../assets/spinner.png";
import "./styles/index.css";
import { icons } from "../assets/icons";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { formatNumWithComma, symbol } from "../helpers/Helper";

const TransactionStatus = ({ status = "pending" }: { status: string }) => {
  const { config, ussd_code } = useSelector(
    (state: RootState) => state.payment
  );

  const conf: any = config;
  return (
    <>
      <div className="transaction-status">
        {status === "pending" && (
          <>
            <figure className="spinner">
              <img src={spinner} alt="" />
            </figure>

            <p>Verifying transactions...</p>
          </>
        )}

        {status === "success" ||
          status === "successful" ||
          (status === "paid" && (
            <div className="transaction-status__success">
              <figure>{icons.success}</figure>

              <h6>Payment Successful</h6>
              <p>
                You payment of {symbol(conf?.currency.toLowerCase())}
                {formatNumWithComma(conf?.amount, "ngn")} have been sent
                successfully to {config?.customer_email}
              </p>
            </div>
          ))}

        {status === "failed" && (
          <div className="transaction-status__failed">
            <figure>{icons.failed}</figure>

            <h6>Unable to process payment</h6>
            <p>
              Seems the details entered is not correct, change the payment
              method and retry.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default TransactionStatus;
