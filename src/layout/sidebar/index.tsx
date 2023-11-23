import React, { useState } from "react";
import "./style/index.css";
import { icons } from "../../assets/icons";
const Sidebar = ({ onSelect }: { onSelect: Function }) => {
  const items = [
    {
      icon: icons.bank,
      label: "Bank Transfer",
    },
    {
      icon: icons.card_mobile,
      label: "Card Payment",
    },

    {
      icon: icons.ussd,
      label: "USSD",
    },
    {
      icon: icons.nqr,
      label: "NQR Payment",
    },
    {
      icon: icons.raven,
      label: "Raven Pay",
    },
  ];

  const [activeItem, setActiveItem] = useState("Bank Transfer");

  const switchContentMobile = () => {
    const page = document.querySelector(".page-layout");

    if (page) {
      page.classList.add("show-mobile-contents");
    }
  };
  return (
    <div className="sidebar">
      <div className="sidebar__title non-mobile">
        <h6>Select Payment Option</h6>
      </div>

      <div className="sidebar__title-mobile non-desktop">
        <h6>Select your preferred payment method?</h6>
      </div>

      {items.map((chi, idx) => {
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

      <div className="sidebar__more-options non-mobile">
        <p>More Options</p>
      </div>

      <div className="sidebar__footer non-mobile">
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
