/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import PageLayout from "./layout/page";
import Transfer from "./widgets/transfer";
import Card from "./widgets/card";
import USSD from "./widgets/ussd";
import NQR from "./widgets/nqr";
import Raven from "./widgets/raven";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmTransfer,
  getBankAccount,
  getPaymentConfig,
  initRavenPay,
  setStatus,
  verifyCardTrx,
} from "./redux/payment";
import { AppDispatch, RootState, useAppDispatch } from "./redux/store";

const App = () => {
  const [selected, setSelected] = useState({
    label: "Bank Transfer",
    value: "bank",
  });

  // retrieve plugin based configurations
  const params = new URLSearchParams(window.location.search);
  const platform = params.get("platform");
  // get transaction ref from url
  let trx = params.get("ref");
  const supportedPlatform =
    platform === ("wordpress" || "joomla" || "magento" || "atlas" || "banking")
      ? true
      : false;
  // end plugin configuration

  const dispatch = useAppDispatch();

  // handle api calls
  async function getConfig() {
    await dispatch(getPaymentConfig(trx));
  }
  // retrieve redux states
  const {
    config,
    loading,
    bank,
    raven_pay,
    card_ref,
    card_transaction_status,
    transferStatus,
    isUssdLoading,
    ussd_details,
    trx_status,
    ussd_code,
  } = useSelector((state: RootState) => state.payment);

  const [success, setSuccess] = useState(false);

  let int: any;
  let cardint: any;
  const card_status: any = card_transaction_status;

  useEffect(() => {
    getConfig();
  }, []);

  // process transfer request
  async function getBank() {
    await dispatch(getBankAccount(trx));
  }

  function checkTransferStatus() {
    int = setInterval(async () => {
      let call = await dispatch(confirmTransfer(trx));

      if (call?.payload?.data?.status === "paid") {
        dispatch(setStatus(call?.payload?.data?.status));
        clearInterval(cardint);
        return clearInterval(int);
      } else if (call?.payload?.data?.status === "failed") {
        dispatch(setStatus(call?.payload?.data?.status));
        clearInterval(cardint);
        return clearInterval(int);
      }
    }, 10000);
  }

  useEffect(() => {
    if (!bank && selected.label === "Bank Transfer") {
      getBank();
    }

    if (selected.label === "Bank Transfer" && !success) checkTransferStatus();
  }, [selected.label === "Bank Transfer"]);

  useEffect(() => {
    if (selected.label === "Raven Pay" && !success) dispatch(initRavenPay(trx));
  }, [selected.label === "Raven Pay"]);

  useEffect(() => {
    if (
      trx_status === "success" ||
      trx_status === "paid" ||
      trx_status === "successful"
    ) {
      clearInterval(int);
    }
  }, [trx_status]);

  return (
    <div>
      <PageLayout onSelect={setSelected}>
        {selected.label === "Bank Transfer" && <Transfer bank={bank} />}
        {selected.label === "Card Payment" && (
          <Card trx={trx} config={config} />
        )}
        {selected.label === "USSD" && <USSD ussd_config={ussd_code} />}
        {selected.label === "NQR Payment" && <NQR />}
        {selected.label === "Raven Pay" && <Raven raven={raven_pay} />}
      </PageLayout>
    </div>
  );
};

export default App;
