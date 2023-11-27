import { RavenCheckBox, RavenInputField } from "@ravenpay/raven-bank-ui";
import React, { useState } from "react";
import "./style/index.css";
import Container from "../../layout/container";

const Ravenjk = () => {
  const [cvv, setCvv] = useState("");
  const [exp, setExp] = useState("");
  return (
    <Container className="animate-move-up-class">
      <div className="raven__input">
        <RavenInputField
          color="green-light"
          label="Raven Username *"
          type="text"
          onChange={() => {}}
        />
      </div>

      <div className="raven__validated-name">
        <p>Olakunle Temitayo Abraham</p>
      </div>

      <div className="raven__input-group">
        <RavenInputField
          onChange={(e: string) => {
            setExp(e);
          }}
          label="Transaction Pin *"
          value={exp}
          type="pin"
          color="green-light"
        />
      </div>
    </Container>
  );
};

export default Ravenjk;
