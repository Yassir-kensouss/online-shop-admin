import React, { useState } from "react";
import ClickToCopy from "../../common/ClickToCopy";

const OrderCustomerDetails = props => {
  const { order } = props;

  const [seeCustomer, setSeeCustomer] = useState(true);

  return (
    <div>
      <h2
        onClick={() => setSeeCustomer(!seeCustomer)}
        className="cursor-pointer text-xl text-grey-700 font-semibold capitalize flex align-items-center justify-content-between w-full mb-3 mt-5"
      >
        Customer{" "}
        <button
          aria-label="hide or show the order products list button"
          className="button-accessibility-states"
        >
          <i
            className={seeCustomer ? "pi pi-angle-up" : "pi pi-angle-down"}
            aria-hidden="true"
          ></i>
        </button>
      </h2>
      {seeCustomer ? (
        <div className="flex align-items-center gap-5">
          <div className="flex align-items-center">
            <span className="font-semibold mr-2">Name:</span>
            <span>{order.user.name}</span>
          </div>

          <div className="flex align-items-center">
            <span className="font-semibold mr-2">Email:</span>
            <span>
                <ClickToCopy value={order.user.email} showIcon={true}/>
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default OrderCustomerDetails;
