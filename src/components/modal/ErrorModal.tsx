/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from "react";
// import { ButtonPrimary } from "../../../../components/buttons/ButtonReuse";
import "./ErrorModal.css";
import { RavenButton } from "@ravenpay/raven-bank-ui";
import { colors } from "@ravenpay/raven-bank-ui/dist/esm/components/variable";

const ErrorModal = ({
  onCancel,
  onClick,
  smallText,
  bigText,
  btnText,
  color,
  loading,
}: {
  onCancel?: () => void;
  onClick?: () => void;
  smallText?: string;
  bigText?: string;
  btnText?: string;
  color?: colors["value"];
  loading?: boolean;
}) => {
  return (
    <div className="error-modal-wrap">
      {/* title start */}
      <p className="title">{bigText}</p>
      {/* title end */}
      {/* text start */}
      <p className="text">{smallText}</p>
      {/* text end */}
      {/* btn wrap start */}
      <div className="btn-wrap">
        <RavenButton
          onClick={onCancel}
          loading={loading}
          className="close"
          // style={{width: '50%', fontWeight: '500'}}
          color={color as colors["value"]}
          label={`${btnText}`}
        />
        <RavenButton
          onClick={onClick && onClick}
          className="cancel btn-outline-error-light
          "
          loading={loading}
          size="small"
          color={color as colors["value"]}
          // style={{width: '50%'}}
          label={`Cancel Payment`}
        />
      </div>
      {/* btn wrap end */}
    </div>
  );
};

export default ErrorModal;
