import { RavenCheckBox, RavenInputField, toast } from "@ravenpay/raven-bank-ui";
import React, { useCallback, useEffect, useState } from "react";
import "./style/index.css";
import Container from "../../layout/container";
import { RootState, useAppDispatch } from "../../redux/store";
import {
  getPaymentConfig,
  initiate3dsTransaction,
  initiateCardTransaction,
  initiateCardTransactionTwo,
  setIframeUrl,
  setShowBlusaltModal,
  setStatus,
  verifyCardTrx,
} from "../../redux/payment";
import { useSelector } from "react-redux";
import { generateReference } from "../../helpers/Helper";

const Card = ({ config, trx }: any) => {
  const [cvv, setCvv] = useState("");
  const [exp, setExp] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [holderName, setHolderName] = useState("");
  const [cardType, setCardType] = useState("");
  const [viewFrame, setViewFrame] = useState<any>();
  const [externalView, setExternalView] = useState(false);
  const [cardRef, setCardRef] = useState("");
  const [inlineRef, setInlineRef] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cardUserRef, setCardUserRef] = useState("");
  const [cardAuthMessage, setCardAuthMessage] = useState("");
  const [pinVal, onPinChange] = useState("0000");
  const [stage, setStage] = useState("main");

  // retrieve redux states
  const {
    loading,
    bank,
    raven_pay,
    card_ref,
    showBlusaltModal,
    cardIframeUrl,
    trx_status,
    card_transaction_status,
  } = useSelector((state: RootState) => state.payment);
  // handle api calls
  async function getConfig() {
    await dispatch(getPaymentConfig(trx));
  }
  const dispatch = useAppDispatch();
  let cardint: any;
  const card_status: any = card_transaction_status;

  function handleCardNumberChange(event: any) {
    const rawValue = event.target.value.replace(/\s/g, "");
    const maskedValue = rawValue.replace(/(\d{1,4})/g, "$1 ").trim();

    // Detect card type
    if (/^4/.test(rawValue)) {
      setCardType("Visa");
    } else if (/^5[1-5]/.test(rawValue)) {
      setCardType("Mastercard");
    } else if (/^3[47]/.test(rawValue)) {
      setCardType("American Express");
    } else if (/^6(?:011|5)/.test(rawValue)) {
      setCardType("Discover");
    } else if (/^5[6-9]|^506[0-9]|^6500[0-9]/.test(rawValue)) {
      setCardType("Verve");
    } else {
      setCardType("");
    }

    // Set the input value to the masked version
    setCardNumber(event.target.value);
  }

  // function derived from 3ds authentication
  function trigger3ds() {
    var e: any = document.getElementById("threedsChallengeRedirectForm");
    if (e) {
      e.submit();
      if (e.parentNode !== null) {
        e.parentNode.removeChild(e);
      }
    }
  }

  const userRef = generateReference();

  // effect call for 3ds authentication
  useEffect(() => {
    setCardRef(viewFrame?.payload?.data?.payment_reference);
    if (viewFrame) {
      setExternalView(true);
      checkCardTrxStatus();
      setTimeout(() => {
        trigger3ds();
      }, 500);
    }
  }, [viewFrame]);

  // effect call for blusalt card trx
  useEffect(() => {
    if (showBlusaltModal) {
      checkCardTrxStatus();
      setTimeout(() => {
        trigger3ds();
      }, 500);
    }
  }, [showBlusaltModal]);

  useEffect(() => {
    if (card_status?.data?.status === "successful") {
      getConfig();
      dispatch(setStatus("successful" as never));
    }

    if (card_status?.data?.status == "failed") {
      dispatch(setStatus("failed" as never));
      setExternalView(false);
    }
  }, [card_transaction_status, trx_status]);

  //effect call for window ref
  useEffect(() => {
    getConfig();
  }, [inlineRef]);

  async function initCardPayment() {
    setCardUserRef(userRef);
    setIsLoading(true);
    const payload = {
      trx_ref: trx,
      currency: config?.currency ?? "NGN",
      card_number: cardNumber.replaceAll(" ", ""),
      cvv: cvv,
      expiry_month: exp.split("/")[0],
      expiry_year: exp.split("/")[1],
      card_holder: holderName,
      pay_ref: userRef,
      pin: pinVal,
    };

    const response =
      config.provider === "blusalt"
        ? await dispatch(initiateCardTransactionTwo(payload))
        : await dispatch(initiateCardTransaction(payload));

    if (config.provider !== "blusalt") {
      if (response?.payload?.status === "success") {
        if (response?.payload?.data["3ds_auth"]) {
          // load a hidden div that will be part of data response for 21 seconds
          //then send back to server to initiate the transaction

          let divData = response.payload.data.data;
          let div = document.createElement("div");

          //make the div hidden
          div.style.display = "none";
          div.innerHTML = divData;
          document.body.appendChild(div);
          //wait for 21 seconds
          let externalPrompt;
          // trigger 3ds initialisation
          setIsLoading(true);
          setTimeout(async () => {
            externalPrompt = await dispatch(
              initiate3dsTransaction({ pay_ref: userRef })
            );
            setViewFrame(externalPrompt);
          }, 8000);
          //end trigger

          if (viewFrame?.payload?.status === "success") {
            setIsLoading(true);
          }
        } else setStage("pin");
      } else {
        setIsLoading(false);
        if (response?.payload && "response" in response?.payload)
          toast.error("Something went wrong, pls try again later");
      }
    } else {
      if (response?.payload?.status === "success") {
        if (response?.payload?.data["3ds_auth"]) {
          // load a hidden div that will be part of data response for 21 seconds
          //then send back to server to initiate the transaction

          const iframeUrl = response.payload.data?.url;

          //save the iframe url for remounting
          dispatch(setIframeUrl(iframeUrl));

          // Create an iframe element
          injectCardIframe(iframeUrl);

          // document.body.appendChild(iframe)
        } else {
          if (response?.payload?.data.status === "PENDING_AUTH_CAPTURE") {
            setCardAuthMessage(response?.payload?.data?.message);
            setStage("pin");
          }
        }
      } else {
        setIsLoading(false);
        if ("response" in response.payload)
          toast.error("Something went wrong, pls try again later");
      }
    }
  }

  function injectCardIframe(iframeUrl: any) {
    let iframe = document.createElement("iframe");

    // Set the source URL for the iframe
    iframe.src = iframeUrl;

    // // Make the iframe hidden
    iframe.width = "100%";
    iframe.height = "100%";
    // Set the width and height to 100%
    iframe.style.width = "100%";
    iframe.style.height = "100%";

    // Append the iframe to the document's body
    dispatch(setShowBlusaltModal(true as never));

    setTimeout(() => {
      let windw;

      windw = document.querySelector(".blusalt-modal");

      windw?.appendChild(iframe);
    }, 1000);
  }

  function checkCardTrxStatus() {
    cardint = setInterval(async () => {
      const blusalt = document.querySelector(".blusalt-modal");

      let call = await dispatch(verifyCardTrx(card_ref));

      if (
        call?.payload?.data?.status === "successful" ||
        call?.payload?.data?.status === "paid"
      ) {
        getConfig();
        // blusalt?.remove();
        dispatch(setStatus("success" as never));
        dispatch(setShowBlusaltModal(false as never));
        setIsLoading(false);
        return clearInterval(cardint);
      }

      if (
        call?.payload?.data?.status === "successful" ||
        call?.payload?.data?.status === "paid"
      )
        return clearInterval(cardint);
      if (call?.payload?.data?.status === "failed")
        return clearInterval(cardint);
    }, 10000);
  }

  //remount iframe if  user navigates away and comes back

  useEffect(() => {
    if (showBlusaltModal) {
      // injectCardIframe(cardIframeUrl);
    }
  }, []);

  window.addEventListener("message", receiveMessage, false);

  function receiveMessage(event: any) {
    if (event.origin !== "http://www.otherdomain.com/") return;
    // this check is neccessary
    // because the `message` handler accepts messages from any URI

    console.log("received window response:  ", event.data);
  }

  return (
    <>
      {showBlusaltModal ? (
        <div className="blusalt-modal"></div>
      ) : (
        <Container
          className="animate-move-up-class"
          loading={isLoading}
          btnLabel="Proceed"
          title="Card Payment"
          btnDisabled={
            cvv.length < 2 || cardNumber.length < 8 || exp.length < 3
          }
          onClick={initCardPayment}
        >
          <div className="card__input">
            <RavenInputField
              color="green-light"
              label="Card Number *"
              type="card_number"
              value={cardNumber}
              onChange={handleCardNumberChange}
            />
          </div>

          {config?.provider === "blusalt" && (
            <div className="card__input-group ">
              <RavenInputField
                color="green-light"
                name="holder_name"
                id="holder_name"
                placeholder="e.g Dumebi Akpan"
                label="Card Holder Name *"
                type="text"
                onChange={(e: any) => {
                  setHolderName(e.target.value);
                }}
              />
            </div>
          )}
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
      )}
    </>
  );
};

export default Card;
