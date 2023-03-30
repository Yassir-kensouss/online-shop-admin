import React, { useState } from "react";

const OrderProducts = props => {
  const { order } = props;

  const [seeProducts, setSeeProducts] = useState(true);

  return (
    <div>
      <h2
        onClick={() => setSeeProducts(!seeProducts)}
        className="cursor-pointer text-xl text-grey-700 font-semibold capitalize flex align-items-center justify-content-between w-full mb-3"
      >
        Products{" "}
        <button aria-label="hide or show the order products list button" className="button-accessibility-states">
          <i className={seeProducts ? "pi pi-angle-up" : "pi pi-angle-down"} aria-hidden="true"></i>
        </button>
      </h2>
      {seeProducts ? (
        <ul>
          {order.products.map(product => (
            <li
              key={product._id}
              className="surface-100 border-round-md mt-10 p-2 mt-2 flex align-items-star justify-content-between"
            >
              <div>
                <span className="block font-semibold mb-2">
                  Name: <span className="font-light ml-2">{product.name}</span>
                </span>
                <span className="block font-semibold mb-2">
                  Price:{" "}
                  <span className="font-light ml-2">{product.price}</span>
                </span>
                <span className="block font-semibold">
                  Count:{" "}
                  <span className="font-light ml-2">{product.count}</span>
                </span>
              </div>
              <div>
                <button className="flex align-items-center gap-2 button-accessibility-states text-indigo-500">
                  <i className="pi pi-eye" aria-hidden="true"></i>
                  View
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default OrderProducts;
