/* eslint-disable react/style-prop-object */
import { RavenInputField } from "@ravenpay/raven-bank-ui";
import React, { useEffect, useState } from "react";
import { icons } from "../../assets/icons";
import Copy from "../../components/Copy";
import Container from "../../layout/container";
import "./style/index.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getUssdCode,
  initiateUssdPayment,
  setStatus,
} from "../../redux/payment";
import { RootState, useAppDispatch } from "../../redux/store";

const USSD = ({ ussd_config }: { ussd_config: any }) => {
  const [stage, setStage] = useState(0);

  const params = new URLSearchParams(window.location.search);

  const { ussd_details }: { ussd_details: any } = useSelector(
    (state: RootState) => state.payment
  );

  let trx = params.get("ref");

  const dispatch = useAppDispatch();
  async function retrieveUssdCode(e: string) {
    await dispatch(getUssdCode({ ref: trx, code: e }));
  }

  const formatSelectOption = (param: any) => {
    const list = param?.map((chi: any) => {
      const { BankName, BankCode, UssdString } = chi;
      return {
        label: BankName,
        value: BankCode,
        ussd_code: String(UssdString),
      };
    });
    return list;
  };
  useEffect(() => {
    dispatch(initiateUssdPayment(trx));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container
      className="ussd_config animate-move-up-class"
      title="USSD Payment"
      onClick={() => dispatch(setStatus("pending" as never))}
    >
      <>
        <div className="ussd__select-bank">
          <RavenInputField
            color="green-light"
            type="select"
            onChange={(e: any) => {
              retrieveUssdCode(e?.value);
            }}
            // menuPlacement={'top'}
            style={{ zIndex: "10000", position: "relative" }}
            selectOption={formatSelectOption(ussd_details?.bank_list)}
          />
        </div>
        {/* <BpQRCode contents="fdfd" key={"1"} /> */}
        <div className="ussd__payment-details">
          <div className="ussd__payment-details--account-no">
            <span>
              <h5>{ussd_config?.ussd_string}</h5>
            </span>

            <Copy />
          </div>

          <div className="ussd__payment-details--note">
            <figure>{icons.note_info}</figure>
            <p>
              Input this code to finalize your transaction through the GTBank
              737 offline payment method.
            </p>
          </div>
        </div>
      </>
    </Container>
  );
};

export default USSD;
