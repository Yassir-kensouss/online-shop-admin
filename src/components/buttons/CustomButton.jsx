import React from "react";
import { Button } from "primereact";
import PropTypes from "prop-types";

const CustomButton = (props) => {
  const { label, className } = props;

  return (
    <Button label={label} className={`${className} p-button-sm custom-btn`} />
  );
};

export default CustomButton;

CustomButton.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
};
