import { classNames, InputNumber } from "primereact";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { MAX_PRICE } from "../../common/constants";

const Pricing = props => {
  const { errors, control, register, values } = props;

  console.log(values("price"));

  const getFormErrorMessage = name => {
    return (
      errors[name] && (
        <small className="p-error block mt-2">{errors[name].message}</small>
      )
    );
  };

  return (
    <div className="bg-white p-3 border-round-sm mt-3">
      <h2 className="text-xl mb-5 font-medium text-800">Pricing</h2>
      <div className="flex gap-4">
        <div className="p-0 flex-1">
          <label htmlFor="price" className="block text-sm mb-2">
            Price *
          </label>
          <Controller
            name="price"
            control={control}
            rules={{
              required: "Price is required.",
              max: {
                value: MAX_PRICE,
                message: `Maximum price you can add is ${MAX_PRICE}`,
              },
            }}
            render={({ field, fieldState }) => (
              <InputNumber
                id={field.price}
                className={`${classNames({
                  "p-invalid": fieldState.error,
                })} w-full p-inputtext-sm`}
                {...register("price")}
                showButtons
                mode="currency"
                currency="USD"
                {...field}
                onChange={event => field.onChange(event.value)}
              />
            )}
          />
        </div>
        <div className="p-0 flex-1">
          <label htmlFor="price" className="block text-sm mb-2">
            Old Price
          </label>
          <Controller
            name="oldPrice"
            control={control}
            rules={{
              max: {
                value: MAX_PRICE,
                message: `Maximum price you can add is ${MAX_PRICE}`,
              },
              validate: val => {
                if (val <= values("price")) {
                  return "Old price cannot be less than the actual price";
                }
              },
            }}
            render={({ field, fieldState }) => (
              <InputNumber
                id={field.oldPrice}
                className={`${classNames({
                  "p-invalid": fieldState.error,
                })} w-full p-inputtext-sm`}
                {...register("oldPrice")}
                showButtons
                mode="currency"
                currency="USD"
                {...field}
                onChange={event => field.onChange(event.value)}
              />
            )}
          />
        </div>
      </div>
      <span className="flex gap-5">
        {getFormErrorMessage("price")} {getFormErrorMessage("oldPrice")}
      </span>
    </div>
  );
};

export default Pricing;
