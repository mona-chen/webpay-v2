import { RavenInputField } from "@ravenpay/raven-bank-ui";
import React, { useState } from "react";
import { icons } from "../../assets/icons";
import Copy from "../../components/Copy";
import Container from "../../layout/container";
import "./style/index.css";

const NQR = () => {
  const [stage, setStage] = useState(0);
  return (
    <Container
      className="ussd animate-move-up-class"
      // onClick={() => setStage(1)}
    >
      {stage === 0 && (
        <>
          <figure className="ussd__qr">{icons.qr}</figure>
          <div className="ussd__payment-details">
            <div className="ussd__payment-details--note">
              <figure>{icons.note_info}</figure>
              <p>
                Input this code to finalize your transaction through the GTBank
                737 offline payment method.
              </p>
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

export default NQR;
