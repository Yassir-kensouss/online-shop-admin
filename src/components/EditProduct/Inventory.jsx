import { classNames, InputNumber, InputText } from "primereact";
import React from "react";
import { Controller } from "react-hook-form";
import { MAX_LENGTH, MAX_QUANTITY } from "../../common/constants";

const Inventory = props => {
  const { errors, control, register } = props;

  const getFormErrorMessage = name => {
    return (
      errors[name] && (
        <small className="p-error block mt-2">{errors[name].message}</small>
      )
    );
  };

  return (
    <div className="bg-white p-3 border-round-sm mt-3">
      <h2 className="text-xl mb-5 font-medium text-800">Inventory</h2>
      <div className="product-title-field mb-3">
        <label htmlFor="sku" className="block text-sm mb-2">
          SKU
        </label>
        <Controller
          defaultValue={""}
          name="sku"
          control={control}
          rules={{ required: "SKU is required.", maxLength: {value: MAX_LENGTH.PRODUCT_SKU, message: 'SKU is too long'} }}
          render={({ field, fieldState }) => (
            <InputText
              id={field.sku}
              {...register('sku')}
              className={`${classNames({
                "p-invalid": fieldState.error,
              })} w-full p-inputtext-sm`}
              {...field}
            />
          )}
        />
        {getFormErrorMessage("sku")}
      </div>
      <div className="product-title-field">
        <label htmlFor="stock-quantity" className="block text-sm mb-2">
          Stock quantity
        </label>
        <Controller
          name="quantity"
          defaultValue={""}
          control={control}
          rules={{ required: "Quantity is required.", max: {value: MAX_QUANTITY, message: `Maximum you can add is ${MAX_QUANTITY}`} }}
          render={({ field, fieldState }) => (
            <InputText
              id={field.quantity}
              {...register('quantity')}
              className={`${classNames({
                "p-invalid": fieldState.error,
              })} w-full p-inputtext-sm`}
              {...field}
            />
          )}
        />
        {getFormErrorMessage("quantity")}
      </div>
    </div>
  );
};

export default Inventory;
