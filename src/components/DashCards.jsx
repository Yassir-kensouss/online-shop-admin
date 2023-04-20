import { Tooltip } from "primereact";
import React from "react";

const DashCards = props => {
  const {
    id,
    title,
    children,
    rightContent,
    hasInfo,
    infoContent,
    height = "87%",
  } = props;
  return (
    <section style={{ overflowX: "auto" }} className="dashCard">
      <div className="mb-3 flex align-items-start justify-content-between">
        <h2 className="dashCard__title text-l font-semibold capitalize flex align-items-center gap-2">
          {title}
          {hasInfo ? (
            <div>
              <Tooltip target={`.${id}`}>
                <p className="w-10rem line-height-2">{infoContent}</p>
              </Tooltip>
              <i
                className={
                  id +
                  " cursor-pointer dashCard__tooltipIcon mt-1 custom-target-icon pi pi-info-circle p-text-secondary text-sm"
                }
                data-pr-position="bottom"
              ></i>
            </div>
          ) : null}
        </h2>
        <div>{rightContent}</div>
      </div>
      <div style={{ height }}>{children}</div>
    </section>
  );
};

export default DashCards;
