import { Button, Tooltip } from "primereact";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { shortenString } from "../utils/helpers";

const ClickToCopy = props => {
  const { value, showIcon, limit } = props;
  const [copied, setCopied] = useState("Copy");

  const handleCopy = () => {
    setCopied("Copied");
    navigator.clipboard.writeText(value);
    toast("Copied");
  };

  return (
    <>
      <div className="click-to-copy disabled-button" onClick={handleCopy}>
        {limit ? shortenString(value, limit) : value}
        {showIcon ? (
          <Button
            icon="pi pi-copy"
            className="p-button-rounded p-button-text copy-to-clipboard-btn"
            aria-label="copy"
            tooltip={copied}
            tooltipOptions={{ position: "right" }}
          />
        ) : null}
      </div>
    </>
  );
};

export default ClickToCopy;
