import classNames from "classnames";
import { Dropdown } from "primereact";
import React from "react";
import { Controller } from "react-hook-form";

const VariantDropdown = ({ options, label, control, placeholder, errors }) => {
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
        <span className="block capitalize">{label}:</span>
        <Controller
          name={label}
          control={control}
          rules={{ required: `${label} is required` }}
          render={({ field, fieldState }) => (
            <Dropdown
              options={options}
              optionLabel="name"
              placeholder={placeholder}
              value={field.value}
              onChange={e => field.onChange(e.value)}
              className={`mt-2 w-full ${classNames({
                "p-invalid": fieldState.invalid,
              })}`}
            />
          )}
        />
        {getFormErrorMessage(label)}
      </label>
    </>
  );
};

export default VariantDropdown;
