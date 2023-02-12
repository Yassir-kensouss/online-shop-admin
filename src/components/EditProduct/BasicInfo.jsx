import { classNames, Editor, InputText, InputTextarea } from "primereact";
import React from "react";
import { Controller } from "react-hook-form";
import { MAX_LENGTH } from "../../common/constants";

const BasicInfo = props => {
  const { errors, control, setDescription, description, register } =
    props;

  const getFormErrorMessage = name => {
    return (
      errors[name] && (
        <small className="p-error block mt-2">{errors[name].message}</small>
      )
    );
  };

  return (
    <div className="bg-white p-3 border-round-sm">
      <h2 className="text-xl mb-5 font-medium text-800 flex align-items-center gap-2">
        Basic Information
      </h2>
      <div className="product-title-field mb-3">
        <Controller
          name="name"
          defaultValue={""}
          control={control}
          rules={{
            required: "Name is required.",
            maxLength: {
              value: MAX_LENGTH.PRODUCT_NAME,
              message: "Product name is too long",
            },
          }}
          render={({ field, fieldState }) => (
            <InputText
              id={field.name}
              {...field}
              {...register("name")}
              className={`${classNames({
                "p-invalid": fieldState.error,
              })} w-full p-inputtext-sm`}
              placeholder="Apple iPad (2018 Model)"
            />
          )}
        />
        {getFormErrorMessage("name")}
      </div>

      <div className="product-title-field mb-3">
        <Editor
          style={{ height: "320px" }}
          onTextChange={e => setDescription(e)}
          value={description}
        />
      </div>

      <div className="product-title-field mb-3">
        <Controller
          name="shortDescription"
          control={control}
          rules={{
            required: "Short description is required.",
            maxLength: {
              value: MAX_LENGTH.PRODUCT_SHORT_DESC,
              message: "Short description is too long",
            },
          }}
          render={({ field, fieldState }) => (
            <InputTextarea
              rows={5}
              cols={30}
              id={field.name}
              {...field}
              {...register("shortDescription")}
              className={`${classNames({
                "p-invalid": fieldState.error,
              })} w-full p-inputtext-sm w-full max-h-9rem`}
              placeholder="Short descriptipn"
            />
          )}
        />
        {getFormErrorMessage("shortDescription")}
      </div>
    </div>
  );
};

export default BasicInfo;
