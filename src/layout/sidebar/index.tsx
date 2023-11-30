import React, { useState } from "react";
import "./style/index.css";
import { icons } from "../../assets/icons";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
const Sidebar = ({ onSelect }: { onSelect: Function }) => {
  const items = [
    {
      icon: icons.bank,
      label: "Bank Transfer",
      value: "bank_transfer",
    },
    {
      icon: icons.card_mobile,
      label: "Card Payment",
      value: "card",
    },

    {
      icon: icons.ussd,
      label: "USSD",
      value: "ussd",
    },
    {
      icon: icons.nqr,
      label: "NQR Payment",
      value: "nqr",
    },
    {
      icon: icons.raven,
      label: "Raven Pay",
      value: "raven",
    },
  ];

  const [activeItem, setActiveItem] = useState("Bank Transfer");
  const { config } = useSelector((state: RootState) => state.payment);

  const switchContentMobile = () => {
    const page = document.querySelector(".page-layout");

    if (page) {
      page.classList.add("show-mobile-contents");
    }
  };

  let prefferedGateway: any = config;

  return (
    <div className="sidebar">
      <div className="sidebar__title non-mobile">
        <h6>Select Payment Option</h6>
      </div>

      <div className="sidebar__title-mobile non-desktop">
        <h6>
          Select your preferred <br /> payment method?
        </h6>
      </div>

      {items
        .filter((chi) => prefferedGateway?.payment_methods?.includes(chi.value))
        .map((chi, idx) => {
          return (
            <div
              onClick={() => {
                setActiveItem(chi.label);
                switchContentMobile();
                onSelect(chi);
              }}
              key={idx}
              className={`sidebar__item ${
                chi.label === activeItem ? "active" : ""
              }`}
            >
              <figure className="sidebar__item--icon">{chi.icon}</figure>
              <p>{chi.label}</p>
            </div>
          );
        })}

      {/* <div className="sidebar__more-options non-mobile">
        <p>More Options</p>
      </div> */}

      <div className="sidebar__footer">
        <span>
          <p>Powered by</p>
          <figure>{icons.raven_wordmark}</figure>
        </span>

        <span>
          <p>Privacy</p>
          <p>Terms</p>
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
