import React from "react";

const Cards = (props) => {
  const { icon, title, value, state } = props;
  return (
    <div className="dCard">
      <div className="dCard__iconWrapper">{icon}</div>
      <div className="dCard__content">
        <h5 className="dCard__title">{title}</h5>
        <p className="dCard__value">{value}</p>
        {state}
      </div>
    </div>
  );
};

export default Cards;
