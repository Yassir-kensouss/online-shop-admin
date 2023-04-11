import React from "react";

const Cards = props => {
  const { icon, title, value, rateType, rateValue } = props;
  return (
    <div className="dCard">
      <div className="dCard__iconWrapper">{icon}</div>
      <div className="dCard__content">
        <div className="dCard__leftSide">
          <h5 className="dCard__title">{title}</h5>
          <p className="dCard__value">{value}</p>
        </div>
        {rateType && rateValue ? (
          <div>
            <div className={rateType === 1 ? "up-rate" : "down-rate"}>
              <div>{rateType === 1 ? "+" + rateValue : rateValue}</div>
              <i
                className={
                  rateType === 1 ? "pi pi-arrow-up" : "pi pi-arrow-down"
                }
              ></i>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Cards;
