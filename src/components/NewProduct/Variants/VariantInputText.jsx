import classNames from "classnames";
import { InputText } from "primereact";
import React from "react";
import { Controller } from "react-hook-form";

const VariantInputText = ({ label, name, control, errors, placeholder }) => {
  const getFormErrorMessage = name => {
    return (
      errors[name] && (
        <small className="mt-2 block p-error">{errors[name].message}</small>
      )
    );
  };
  return (
    <>
      <label className="mt-4 block flex-1" htmlFor={name}>
        <span className="block">SKU</span>
        <Controller
          name={name}
          control={control}
          rules={{ required: `${label} is required.` }}
          render={({ field, fieldState }) => (
            <InputText
              id={field.sku}
              {...field}
              className={`mt-2 w-full ${classNames({
                "p-invalid": fieldState.invalid,
              })}`}
              onValueChange={e => field.onChange(e.value)}
              inputId={field.sku}
              placeholder={placeholder}
            />
          )}
        />
        {getFormErrorMessage(name)}
      </label>
    </>
  );
};

export default VariantInputText;
