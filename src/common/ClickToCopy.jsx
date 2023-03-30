import { Tooltip } from "primereact";
import React, { useState } from "react";
import { shortenString } from "../utils/helpers";

const ClickToCopy = props => {
  const { value, showIcon, limit } = props;
  const [copied, setCopied] = useState("Copy");

  const handleCopy = () => {
    setCopied("Copied");
    navigator.clipboard.writeText(value);
  };

  return (
    <>
      <Tooltip target=".disabled-button" position="bottom" />
      <div
        className="click-to-copy disabled-button"
        data-pr-tooltip={copied}
        onClick={handleCopy}
      >
        {limit ? shortenString(value, limit) : value}
        {showIcon ? <i className="pi pi-copy"></i> : null}
      </div>
    </>
  );
};

export default ClickToCopy;
