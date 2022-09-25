import React from "react";
import { InputText } from "primereact";
import PropTypes from "prop-types";

const TextInput = (props) => {
  const { type = "text", placeholder, id, className } = props;
  return (
    <InputText
      type={type}
      placeholder={placeholder}
      className={`${className} p-inputtext-sm text-field`}
      id={id}
    />
  );
};

export default TextInput;

TextInput.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
};
