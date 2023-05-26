import classNames from "classnames";
import { Button, InputText, Toast } from "primereact";
import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import BrandLogoUploader from "./BrandLogoUploader";
import { useMutation } from "react-query";
import { addNewBrand } from "../../../services/settings";

const NewBrandForm = ({ setFormDialog, refetch }) => {
  const [preview, setPreview] = useState(null);
  const toast = useRef();

  const defaultValues = {
    brandName: "",
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  const getFormErrorMessage = name => {
    return (
      errors[name] && (
        <small className="p-error mt-2 block">{errors[name].message}</small>
      )
    );
  };

  const { isLoading, mutate } = useMutation(data => addNewBrand(data), {
    onSuccess: () => {
      toast.current.show({
        severity: "success",
        detail: "New brand created",
        life: 3000,
      });
      refetch();
      setFormDialog(false);
    },
    onError: () => {
      toast.current.show({
        severity: "error",
        detail: "Something went wrong",
        life: 3000,
      });
    },
  });

  const onSubmit = data => {
    mutate({ ...data, photo: preview });
  };

  return (
    <div>
      <Toast ref={toast} />
      <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
        <div className="field">
          <span>
            <label
              htmlFor="brandName"
              className={`${classNames({
                "p-error": errors.brandName,
              })} mb-2 block`}
            >
              Brand Name
            </label>
            <Controller
              name="brandName"
              control={control}
              rules={{
                maxLength: {
                  value: 30,
                  message: "Maximum length is 30 character",
                },
              }}
              render={({ field, fieldState }) => (
                <InputText
                  placeholder="Enter the brand name (Zara)"
                  id={field.brandName}
                  {...field}
                  autoFocus
                  className={classNames({ "p-invalid": fieldState.invalid })}
                />
              )}
            />
          </span>
          {getFormErrorMessage("brandName")}
        </div>
        <BrandLogoUploader preview={preview} setPreview={setPreview} />
        <div className="flex gap-2 justify-content-end w-max ml-auto">
          <Button
            label="Cancel"
            icon="pi pi-times"
            onClick={() => setFormDialog(false)}
            className="p-button-text p-button-sm"
          />
          <Button
            label="Save"
            icon="pi pi-check"
            autoFocus
            className="p-button-sm"
            loading={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default NewBrandForm;
