import React from "react";
import PropTypes from "prop-types";

const EmptyBox = (props) => {
  const { title, icon, message, action, parentClassName } = props;

  return (
    <section className={`emptyBox ${parentClassName}`}>
      <div className="emptyBox__icon">{icon}</div>
      <h3 className="emptyBox__title">{title}</h3>
      <p className="emptyBox__message">{message}</p>
      {action && <div className="emptyBox__action">{action}</div>}
    </section>
  );
};

export default EmptyBox;

EmptyBox.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  parentClassName: PropTypes.string,
  icon: PropTypes.element,
  action: PropTypes.element,
};
