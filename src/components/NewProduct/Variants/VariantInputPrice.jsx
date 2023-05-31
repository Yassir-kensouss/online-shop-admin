import classNames from "classnames";
import { InputNumber } from "primereact";
import React from "react";
import { Controller } from "react-hook-form";

const VariantInputPrice = ({ control, name, label, errors }) => {
  const getFormErrorMessage = name => {
    return (
      errors[name] && (
        <small className="mt-2 block p-error">{errors[name].message}</small>
      )
    );
  };

  return (
    <>
      <label className="block flex-1" htmlFor={label}>
        <span className="block">{label}</span>
        <Controller
          name={name}
          control={control}
          rules={{
            required: `${label} is required.`,
            min: { value: 1, message: `${label} is invalid` },
          }}
          render={({ field, fieldState }) => (
            <InputNumber
              {...field}
              className={`mt-2 w-full ${classNames({
                "p-invalid": fieldState.invalid,
              })}`}
              showButtons
              value="0"
              mode="currency"
              currency="USD"
              onValueChange={e => field.onChange(e.value)}
            />
          )}
        />
        {getFormErrorMessage(name)}
      </label>
    </>
  );
};

export default VariantInputPrice;
