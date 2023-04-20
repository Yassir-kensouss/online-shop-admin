import { Editor, InputNumber, InputText, InputTextarea } from "primereact";
import React from "react";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { EditProductContext } from "../../pages/EditProduct";
import { ContextContainer } from "../../pages/NewProduct";

const Pricing = () => {
  const { product, setProduct, errors } = useContext(ContextContainer);

  const settings = useSelector(state => state.settings.personalize);
  const currency = settings.currency?.split("-")[0];

  return (
    <div className="np-card mt-3">
      <h2 className="np-card-title text-xl mb-5 font-medium">Pricing</h2>
      <div className="flex gap-4">
        <div className="p-0 flex-1">
          <label htmlFor="price" className="np-card-label block text-sm mb-2">
            Price *
          </label>
          <InputNumber
            inputId="price"
            className="p-inputtext-sm w-full"
            showButtons
            mode="currency"
            currency={currency || "USD"}
            onValueChange={e =>
              setProduct({ ...product, price: e.target.value })
            }
          />
        </div>
        <div className="p-0 flex-1">
          <label htmlFor="price" className="np-card-label block text-sm mb-2">
            Old Price
          </label>
          <InputNumber
            inputId="price"
            className="p-inputtext-sm w-full"
            showButtons
            mode="currency"
            currency={currency || "USD"}
            onValueChange={e =>
              setProduct({ ...product, oldPrice: e.target.value })
            }
          />
        </div>
      </div>
      {errors && ("price" in errors || "oldPrice" in errors) ? (
        <p className="text-red-400 mt-2 text-sm">
          {errors["price"] || errors["oldPrice"]}
        </p>
      ) : null}
    </div>
  );
};

export default Pricing;
