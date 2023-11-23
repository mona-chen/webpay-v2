import { RavenCheckBox, RavenInputField } from "@ravenpay/raven-bank-ui";
import React, { useState } from "react";
import "./style/index.css";
import Container from "../../layout/container";

const Card = () => {
  const [cvv, setCvv] = useState("");
  const [exp, setExp] = useState("");
  return (
    <Container className="animate-move-up-class">
      <div className="card__input">
        <RavenInputField
          color="green-light"
          label="Card Number *"
          type="card_number"
          onChange={() => {}}
        />
      </div>

      <div className="card__input-group">
        <RavenInputField
          onChange={(e: string) => {
            setExp(e);
          }}
          label="Expiry Date *"
          value={exp}
          type="card-exp"
          color="green-light"
        />

        <RavenInputField
          type="card-cvv"
          placeholder="cvv"
          label="CVV *"
          value={cvv}
          onChange={(e: string) => {
            setCvv(e);
          }}
          color="green-light"
        />
      </div>

      <div className="card__save-card">
        <RavenCheckBox color="green-light" onChange={() => {}} id={1} />
        <p>Save card information for later</p>
      </div>
    </Container>
  );
};

export default Card;
