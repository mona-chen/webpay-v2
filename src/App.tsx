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
  onCancel,
  setStatus,
  verifyCardTrx,
} from "./redux/payment";
import { AppDispatch, RootState, useAppDispatch } from "./redux/store";
import { RavenModal } from "@ravenpay/raven-bank-ui";
import ErrorModal from "./components/modal/ErrorModal";

const App = () => {
  const [selected, setSelected] = useState({
    label: "Card Payment",
    value: "card",
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
    cancelled,
    card_transaction_status,
    trx_status,
    ussd_code,
  } = useSelector((state: RootState) => state.payment);

  const [success, setSuccess] = useState(false);
  const [callbackUrl, setCallbackUrl] = useState("");

  const has_keys = Object.keys(config);

  // detect if redirectUrl has a query string
  function isQueryString(redirectUrl?: string) {
    if (redirectUrl?.includes("?")) {
      redirectUrl = redirectUrl + "&";
    } else {
      redirectUrl = redirectUrl + "?";
    }
    // Now you can use the modified redirectUrl as needed
    return redirectUrl;
  }

  let int: any;
  let cardint: any;
  const card_status: any = card_transaction_status;

  //enable cross-platform communication with sdks and plugins
  function postMessage(type: string, message: any) {
    window.parent.postMessage({ type: type, message: message }, "*");
  }

  useEffect(() => {
    getConfig();
  }, []);

  // process transfer request
  async function getBank() {
    await dispatch(getBankAccount(trx));
  }

  useEffect(() => {
    if (config?.redirect_url && config?.redirect_url?.length > 4)
      setCallbackUrl(
        `${isQueryString(config?.redirect_url)}trx_ref=${
          config?.trx_ref
        }&merchant_ref=${config?.merchant_ref}&status=${config?.status}`
      );
  }, [config]);

  function checkTransferStatus() {
    clearInterval(int);
    if (has_keys.length !== 0) {
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
  }

  useEffect(() => {
    if (!bank && selected.label === "Bank Transfer") {
      getBank();
    }

    if (selected.label === "Bank Transfer" && !success) checkTransferStatus();
    if (selected.label === "USSD" && !success) checkTransferStatus();
    if (selected.label === "Raven Pay" && !success) checkTransferStatus();
  }, [selected.label]);

  useEffect(() => {
    if (selected.label === "Raven Pay" && !success) dispatch(initRavenPay(trx));
  }, [selected.label === "Raven Pay"]);

  useEffect(() => {
    if (
      trx_status === "success" ||
      trx_status === "paid" ||
      trx_status === "successful" ||
      config?.status === "paid" ||
      config?.is_paid === 1
    ) {
      clearInterval(int);
      postMessage("onSuccess", config);
      callbackUrl && navigate(callbackUrl);
    } else {
      postMessage("onLoad", config);
    }
  }, [trx_status, config]);

  // const setFullHeight = () => {
  //   const vh = window.innerHeight * 0.01;
  //   document.documentElement.style.setProperty("--vh", `${vh}px`);
  // };

  // window.addEventListener("resize", setFullHeight);
  // setFullHeight();

  // function setBottomPadding() {
  //   const content: any = document.querySelector(".secured_by");
  //   const fixedBottom: any = document.querySelector(".mobile-footer-actions");
  //   var remainingSpace;

  //   if (fixedBottom && content) {
  //     remainingSpace =
  //       window.innerHeight - fixedBottom?.offsetHeight - content?.offsetHeight;
  //   }
  //   const minPadding = 100; // Minimum padding you want

  //   if (content)
  //     content.style.paddingBottom =
  //       Math.max(minPadding, remainingSpace ?? 0) + "px";
  // }

  // // Run the function initially and on window resize
  // setBottomPadding();
  // window.addEventListener("resize", setBottomPadding);

  const navigate = (e: string | URL) => {
    window?.top ? window.top.location.replace(e) : window.location.replace(e);
  };

  return (
    <div>
      <PageLayout onSelect={setSelected}>
        {selected.label === "Card Payment" && (
          <Card trx={trx} config={config} />
        )}
        {selected.label === "Bank Transfer" && (
          <Transfer loading={loading} bank={bank} />
        )}
        {selected.label === "USSD" && <USSD ussd_config={ussd_code} />}
        {selected.label === "NQR Payment" && <NQR />}
        {selected.label === "Raven Pay" && <Raven raven={raven_pay} />}
      </PageLayout>

      <RavenModal
        visble={cancelled}
        onBtnClick={() => {}}
        onClose={() => dispatch(onCancel(false as never))}
      >
        <ErrorModal
          bigText={"Cancel Payment"}
          smallText={
            "Are you sure you want to cancel this payment request, please confirm before proceeding."
          }
          btnText={"Close modal"}
          onClick={() => {
            dispatch(onCancel(false as never));
            callbackUrl && navigate(callbackUrl);
            postMessage("onClose", "Payment window closed");
          }}
          onCancel={() => dispatch(onCancel(false as never))}
        />
      </RavenModal>
    </div>
  );
};

export default App;
