import {
  Button,
  ColorPicker,
  Dropdown,
  InputNumber,
  InputText,
  classNames,
} from "primereact";
import React, { useEffect, useRef } from "react";
import { PRODUCT_MATERIAL, PRODUCT_SIZES } from "../../common/constants";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import VariantInputNumber from "./Variants/VariantInputNumber";
import VariantDropdown from "./Variants/VariantDropdown";
import VariantInputPrice from "./Variants/VariantInputPrice";
import VariantInputText from "./Variants/VariantInputText";
import VariantColorPicker from "./Variants/VariantColorPicker";

const NewVariant = ({
  setVariants,
  setVariantDialog,
  setVariantId,
  variantId,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    size: "",
    quantity: 0,
    material: "",
    price: 0,
    sku: "",
  });

  const [colors, setColors] = useState([]);

  const onSubmit = data => {
    data = {
      ...data,
      size: data.size.name,
      material: data.material.name,
      colors,
      variantId,
    };

    setVariantId(variantId + 1);

    setVariants(prevStatus => [...prevStatus, data]);
    setVariantDialog(false);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex gap-2">
          <VariantDropdown
            label="size"
            placeholder="Select a size"
            control={control}
            options={PRODUCT_SIZES}
            errors={errors}
          />
          <VariantDropdown
            label="material"
            placeholder="Select a material"
            control={control}
            options={PRODUCT_MATERIAL}
            errors={errors}
          />
        </div>
        <div className="w-full flex gap-2 mt-4">
          <VariantInputNumber
            control={control}
            name="quantity"
            label="Quantity"
            errors={errors}
          />
          <VariantInputPrice
            control={control}
            name="price"
            label="Price"
            errors={errors}
          />
        </div>
        <div className="w-full flex gap-2 mt-4">
          {/* <VariantColorPicker colors={colors} setColors={setColors} /> */}
          <VariantInputText
            name="sku"
            label="SKU"
            placeholder="Enter the SKU"
            control={control}
            errors={errors}
          />
        </div>
        <div className="w-full flex justify-content-end">
          <Button
            type="submit"
            label="Add Variant"
            className="p-button-sm mt-4"
          />
        </div>
      </form>
    </div>
  );
};

export default NewVariant;
