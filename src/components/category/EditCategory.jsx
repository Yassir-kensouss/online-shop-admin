import React from "react";
import MediaUploader from "../../common/MediaUploader";
import { Controller, useForm } from "react-hook-form";
import { Button, InputText } from "primereact";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";

const EditCategory = ({ values, setEditForm, updateRow }) => {
  const [image, setImage] = useState(null);

  let initialData = {
    name: values.name,
    image: image,
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: initialData });

  const onSubmit = (data, e) => {
    data = {
      ...data,
      image: image,
      _id: values._id,
    };
    updateRow.mutate(data);
  };

  useEffect(() => {
    setImage(values.image);
  }, []);

  const validate = {
    maxLength: {
      value: 30,
      message: "category name is too long",
    },
    minLength: {
      value: 4,
      message: "category name must be between 4 and 30",
    },
    pattern: {
      value: /^[-a-zA-Z0-9-()]+(\s+[-a-zA-Z0-9-()]+)*$/,
      message: "Only letters and numbers allowed",
    },
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <MediaUploader
          value={image}
          setValue={setImage}
          tooltipMessage="the recommended size is 200 x 200"
          className="mb-3"
        />
        <Controller
          name="name"
          control={control}
          rules={validate}
          render={({ field, value, fieldState }) => (
            <InputText
              id={field.name}
              {...field}
              ref={field}
              autoFocus
              placeholder="Add new category e.g. 'eBook'"
              className={`w-full p-inputtext-sm ${
                fieldState.invalid ? "p-invalid" : ""
              }`}
            />
          )}
        />
        <div className="w-full mt-3 flex gap-2 justify-content-end">
          <Button
            label="Cancel"
            icon="pi pi-times"
            onClick={() => setEditForm(false)}
            className="p-button-text p-button-sm p-button-secondary"
            type="button"
          />
          <Button
            label="Update"
            icon="pi pi-check"
            type="submit"
            autoFocus
            className="p-button-sm"
            loading={updateRow.isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default EditCategory;
