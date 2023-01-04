import { Editor, InputNumber, InputText, InputTextarea } from "primereact";
import React from "react";
import { useContext } from "react";
import { ContextContainer } from "../../pages/NewProduct";

const BasicInfo = () => {
  const { product, setProduct, errors } = useContext(ContextContainer);

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
            onValueChange={(e) => setProduct({...product,oldPrice:e.target.value})}
          />
        </div>
      </div>
      {
          errors && ('price' in errors || 'oldPrice' in errors) ? 
          <p className="text-red-400 mt-2 text-sm">{errors['price'] || errors['oldPrice']}</p>:null
        }
    </div>
  );
};

export default BasicInfo;
