import classNames from "classnames";
import { InputNumber } from "primereact";
import React from "react";
import { Controller } from "react-hook-form";

const VariantInputNumber = ({ control, name, label, errors }) => {
  const getFormErrorMessage = name => {
    return (
      errors[name] && (
        <small className="mt-2 block p-error">{errors[name].message}</small>
      )
    );
  };

  return (
    <>
      <label className="mt-4 block flex-1" htmlFor="quantity">
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
              id={field.quantity}
              {...field}
              value="0"
              onValueChange={e => field.onChange(e.value)}
              className={`mt-2 w-full ${classNames({
                "p-invalid": fieldState.invalid,
              })}`}
            />
          )}
        />
        {getFormErrorMessage(name)}
      </label>
    </>
  );
};

export default VariantInputNumber;
