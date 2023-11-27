import React, { useState } from "react";
import { icons } from "../assets/icons";
import { FaCheckCircle } from "react-icons/fa";
import "./styles/index.css";
const Copy = ({ item }: { item?: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: any) => {
    await navigator.clipboard.writeText(e);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 800);
  };
  return (
    <>
      <span
        className={`copy_button ${copied ? "wobble" : ""}`}
        onClick={() => {
          handleCopy(item);
        }}
      >
        <figure className="copy_icon">
          {copied ? <FaCheckCircle color="#0B8376" /> : icons.copy}
        </figure>
        <p>{copied ? "Copied" : "Copy"}</p>
      </span>
    </>
  );
};

export default Copy;
