import React, { useState } from "react";
import "./styles/index.css";
import { icons } from "../../assets/icons";
import {
  RavenButton,
  RavenCheckBox,
  RavenInputField,
} from "@ravenpay/raven-bank-ui";
import Container from "../../layout/container";
import Copy from "../../components/Copy";
import TransactionStatus from "../../components/TransactionStatus";
const Transfer = () => {
  const [stage, setStage] = useState(0);

  return (
    <Container
      switchMethod={stage === 1}
      className="transfer animate-move-up-class"
      onClick={() => {
        stage !== 1 && setStage(stage + 1);
      }}
    >
      {stage === 0 && (
        <div className="transfer__payment-details">
          <div className="transfer__payment-details--account-no">
            <span>
              <p>Alex Oyebade • Raven Bank</p>
              <h5>3028422066</h5>
            </span>

            <Copy />
          </div>

          <div className="transfer__payment-details--note">
            <figure>{icons.note_info}</figure>
            <p>
              Please utilize this account exclusively for the current
              transaction; note that this account will also expire in{" "}
              <b>30 minutes</b>.
            </p>
          </div>
        </div>
      )}

      {stage === 1 && <TransactionStatus status="success" />}
    </Container>
  );
};

export default Transfer;
