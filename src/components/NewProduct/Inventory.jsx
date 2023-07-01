import { InputNumber, InputText } from "primereact";
import React, { useContext } from "react";
import { EditProductContext } from "../../pages/EditProduct";
import { ContextContainer } from "../../pages/NewProduct";

const Inventory = () => {
  const { product, setProduct, errors } = useContext(ContextContainer);

  return (
    <div className="np-card mt-3">
      <h2 className="np-card-title text-xl mb-5 font-medium">Inventory</h2>
      <div className="product-title-field mb-3">
        <label htmlFor="sku" className="np-card-label block text-sm mb-2">
          SKU
        </label>
        <InputText
          id="sku"
          className="p-inputtext-sm w-full"
          placeholder="SCREW150"
          onChange={e => setProduct({ ...product, sku: e.target.value })}
        />
      </div>
      {errors && "sku" in errors ? (
        <p className="text-red-400 mt-2 text-sm">{errors["sku"]}</p>
      ) : null}
      {/* <div className="product-title-field">
        <label
          htmlFor="stock-quantity"
          className="np-card-label block text-sm mb-2"
        >
          Stock quantity
        </label>
        <InputNumber
          inputId="stock-quantity"
          className="p-inputtext-sm w-full"
          onValueChange={e =>
            setProduct({ ...product, quantity: e.target.value })
          }
        />
      </div> */}
      {errors && "quantity" in errors ? (
        <p className="text-red-400 mt-2 text-sm">{errors["quantity"]}</p>
      ) : null}
    </div>
  );
};

export default Inventory;
