import { Button, Dialog } from "primereact";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { fetchSingleProduct } from "../../services/product";
import PreviewProduct from "../products/PreviewProduct";

const OrderProducts = props => {
  const { order } = props;

  const [seeProducts, setSeeProducts] = useState(true);
  const [viewProduct, setViewProduct] = useState(false);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(false);

  const settings = useSelector(state => state.settings.personalize);
  const currency = settings.currency?.split("-")[1];

  const handleProductPreview = async (productId) => {
    setLoading(true)
    const response = await fetchSingleProduct(productId);
    const product = await response.data.product;
    setProduct(product);
    setViewProduct(true);
    setLoading(false)
  }

  return (
    <>
      <Dialog header="Preview Product" visible={viewProduct} draggable={false} onHide={() => setViewProduct(false)} >
        <PreviewProduct product={product}/>
      </Dialog>
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
                className="surface-100 border-round-md mt-10 p-2 mt-2 flex align-items-center justify-content-between"
              >
                <div>
                  <span className="block font-semibold mb-2">
                    Name: <span className="font-light ml-2">{product.name}</span>
                  </span>
                  <span className="block font-semibold mb-2">
                    Price:{" "}
                    <span className="font-light ml-2">{`${currency} ${product.price}`}</span>
                  </span>
                  <span className="block font-semibold">
                    Count:{" "}
                    <span className="font-light ml-2">{product.count}</span>
                  </span>
                </div>
                <div>
                  <Button loading={loading} tooltip="View" tooltipOptions={{
                    position: 'left'
                  }} icon="pi pi-eye" aria-label="Submit" className="p-button-sm text-indigo-500 p-button-rounded p-button-text" onClick={() => handleProductPreview(product._id)}/>
                </div>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </>
  );
};

export default OrderProducts;
