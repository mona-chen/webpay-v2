import React, { useState } from "react";
import "./styles/index.css";
import { icons } from "../../assets/icons";
import Container from "../../layout/container";
import Copy from "../../components/Copy";
import Countdown from "../../helpers/coutdown";
import { setStatus } from "../../redux/payment";
import { useAppDispatch } from "../../redux/store";
const Raven = (props: any) => {
  const { raven } = props;
  const [count, setCount] = useState("");

  const ravenCountDown = () => {
    let min = count?.split(":")[0];
    let sec = count?.split(":")[1];

    return { min, sec };
  };

  const dispatch = useAppDispatch();
  return (
    <Container
      title="Raven Pay"
      className="raven animate-move-up-class"
      onClick={() => {
        dispatch(setStatus("pending" as never));
      }}
    >
      <div className="raven__payment-details">
        <div className="raven__payment-details--account-no">
          <span>
            <p>Username</p>
            <h5>{"Ravenpay"}</h5>
          </span>

          <Copy item={"ravenpay"} />
        </div>

        <div className="raven__payment-details--account-no narration">
          <span>
            <p>Narration</p>
            <h5>{raven?.raven_pay_ref || "--"}</h5>
          </span>

          <Copy item={raven?.raven_pay_ref} />
        </div>
      </div>

      <div className="raven__payment-details raven-note">
        <div className="raven__payment-details--note">
          <figure>{icons.note_info}</figure>
          <p>
            Copy this username and narration to your raven to Raven payment to
            complete this transaction.{" "}
            <b>
              {ravenCountDown().min} minutes {ravenCountDown().sec} minutes
            </b>
            .
          </p>
        </div>
      </div>

      <div style={{ display: "none" }}>
        <Countdown countdownTime={840} count={(d: string) => setCount(d)} />
      </div>
    </Container>
  );
};

export default Raven;
