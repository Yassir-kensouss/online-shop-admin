import classNames from "classnames";
import { Button, Image, InputText, Toast, Tooltip } from "primereact";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import HeroSlideImgUploader from "./HeroSlideImgUploader";
import { useMutation } from "react-query";
import { addNewHeroCarousal } from "../../services/settings";
import { useRef } from "react";

const HeroNewSlideForm = ({ setSlideDialog, refetch }) => {
  const [preview, setPreview] = useState(null);

  const toast = useRef();

  const defaultValues = {
    caption: "",
    sub_caption: "",
    link: "",
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

  const { isLoading, mutate } = useMutation(data => addNewHeroCarousal(data), {
    onSuccess: () => {
      toast.current.show({
        severity: "success",
        detail: "New slide created",
        life: 3000,
      });
      refetch();
      setSlideDialog(false);
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
              htmlFor="caption"
              className={`${classNames({
                "p-error": errors.caption,
              })} mb-2 block`}
            >
              Caption
            </label>
            <Controller
              name="caption"
              control={control}
              rules={{
                maxLength: {
                  value: 30,
                  message: "Maximum length is 30 character",
                },
              }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.caption}
                  {...field}
                  autoFocus
                  className={classNames({ "p-invalid": fieldState.invalid })}
                />
              )}
            />
          </span>
          {getFormErrorMessage("caption")}
        </div>
        <div className="field">
          <span>
            <label
              htmlFor="sub_caption"
              className={`${classNames({
                "p-error": errors.sub_caption,
              })} mb-2 block`}
            >
              Sub Caption
            </label>
            <Controller
              name="sub_caption"
              control={control}
              rules={{
                maxLength: {
                  value: 30,
                  message: "Maximum length is 30 character",
                },
              }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.sub_caption}
                  {...field}
                  autoFocus
                  className={classNames({ "p-invalid": fieldState.invalid })}
                />
              )}
            />
          </span>
          {getFormErrorMessage("sub_caption")}
        </div>
        <div className="field">
          <span>
            <label
              htmlFor="link"
              className={`${classNames({
                "p-error": errors.link,
              })} mb-2 block`}
            >
              Link
            </label>
            <Controller
              name="link"
              control={control}
              rules={{
                maxLength: {
                  value: 30,
                  message: "Maximum length is 30 character",
                },
              }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.link}
                  {...field}
                  autoFocus
                  className={classNames({ "p-invalid": fieldState.invalid })}
                />
              )}
            />
          </span>
          {getFormErrorMessage("link")}
        </div>
        <HeroSlideImgUploader preview={preview} setPreview={setPreview} />
        <div className="flex gap-2 justify-content-end w-max ml-auto">
          <Button
            label="Cancel"
            icon="pi pi-times"
            onClick={() => setSlideDialog(false)}
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

export default HeroNewSlideForm;
