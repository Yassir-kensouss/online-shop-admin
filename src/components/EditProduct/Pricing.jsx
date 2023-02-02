import { InputNumber } from "primereact";
import React from "react";

const Pricing = (props) => {
  const { product, setProduct } = props;

  return (
    <div className="bg-white p-3 border-round-sm mt-3">
      <h2 className="text-xl mb-5 font-medium text-800">Pricing</h2>
      <div className="flex gap-4">
        <div className="p-0 flex-1">
          <label htmlFor="price" className="block text-sm mb-2">
            Price *
          </label>
          <InputNumber
            inputId="price"
            className="p-inputtext-sm w-full"
            showButtons
            mode="currency"
            currency="USD"
            value={product.price}
            onValueChange={e => setProduct({ ...product, price: e.target.value })}
          />
        </div>
        <div className="p-0 flex-1">
          <label htmlFor="price" className="block text-sm mb-2">
            Old Price
          </label>
          <InputNumber
            inputId="price"
            className="p-inputtext-sm w-full"
            showButtons
            mode="currency"
            currency="USD"
            value={product.oldPrice}
            onValueChange={(e) => setProduct({...product,oldPrice:e.target.value})}
          />
        </div>
      </div>
    </div>
  );
};

export default Pricing;
