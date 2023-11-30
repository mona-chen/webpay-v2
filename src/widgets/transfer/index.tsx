import React, { useState } from "react";
import "./styles/index.css";
import { icons } from "../../assets/icons";
import Container from "../../layout/container";
import Copy from "../../components/Copy";
import Countdown from "../../helpers/coutdown";
import { setStatus } from "../../redux/payment";
import { useAppDispatch } from "../../redux/store";
const Transfer = (props: any) => {
  const { bank } = props;
  const [count, setCount] = useState("");

  const bankCountDown = () => {
    let min = count?.split(":")[0];
    let sec = count?.split(":")[1];

    return { min, sec };
  };

  const dispatch = useAppDispatch();
  return (
    <Container
      title="Bank Transfer"
      loading={props.loading}
      className="transfer animate-move-up-class"
      onClick={() => {
        dispatch(setStatus("pending" as never));
      }}
    >
      <div className="transfer__payment-details">
        <div className="transfer__payment-details--account-no">
          <span>
            <p>
              {bank?.account_name || "--"} • {bank?.bank || "--"}
            </p>
            <h5>{bank?.account_number || "--"}</h5>
          </span>

          <Copy item={bank?.account_number} />
        </div>

        <div className="transfer__payment-details--note">
          <figure>{icons.note_info}</figure>
          <p>
            Please utilize this account exclusively for the current transaction;
            note that this account will also expire in{" "}
            <b>
              {bankCountDown().min} minutes {bankCountDown().sec} minutes
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

export default Transfer;
