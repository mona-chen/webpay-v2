import React from "react";
import spinner from "../assets/spinner.png";
import "./styles/index.css";
import { icons } from "../assets/icons";

const TransactionStatus = ({ status = "pending" }: { status: string }) => {
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

        {status === "success" && (
          <div className="transaction-status__success">
            <figure>{icons.success}</figure>

            <h6>Payment Successful</h6>
            <p>
              You transfer of N86,320.00 have been sent successfully to
              Notbl.ank Studio.
            </p>
          </div>
        )}

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
