import { Button, ColorPicker, InputText } from "primereact";
import React from "react";
import { PRODUCT_MATERIAL, PRODUCT_SIZES } from "../../common/constants";
import { useState } from "react";
import { useForm } from "react-hook-form";
import VariantInputNumber from "./Variants/VariantInputNumber";
import VariantDropdown from "./Variants/VariantDropdown";
import VariantInputPrice from "./Variants/VariantInputPrice";
import VariantInputText from "./Variants/VariantInputText";
import { useSelector } from "react-redux";

const NewVariant = ({ setVariants, variants, setVariantDialog }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    size: "",
    quantity: 0,
    material: "",
    price: 0,
    sku: "",
  });

  const settings = useSelector(state => state.settings.personalize);
  const currency = settings.currency?.split("-")[1];

  const [color, setColor] = useState(null);
  const [items, setItems] = useState([]);
  const [variantId, setVariantId] = useState(1);

  const onSubmit = data => {
    data = {
      ...data,
      size: data.size.name,
      material: data.material.name,
      color,
      variantId,
    };

    setItems(prevState => [...prevState, data]);
    setVariantId(variantId + 1);
    reset();
  };

  const colorCodeInput = e => {
    setColor(e.target.value);
  };

  const removeItem = vid => {
    const newItems = items.filter(el => el.variantId !== vid);
    setItems(newItems);
  };

  const addVariant = () => {
    setVariants({ ...variants, [color]: items });
    setVariantDialog(false);
  };

  return (
    <div className="w-full flex items-start gap-4">
      <div className="flex-1 border-right-1 border-300">
        {items.map(item => (
          <div
            key={item.variantId}
            className="w-full justify-content-between flex align-items-center gap-2"
          >
            <div className="w-3rem">{item.size}</div>
            <div className="w-3rem">{item.material}</div>
            <div className="w-3rem">
              {currency} {item.price}
            </div>
            <Button
              icon="pi pi-times"
              className="p-button-rounded p-button-danger p-button-text"
              aria-label="delete"
              onClick={() => removeItem(item.variantId)}
            />
          </div>
        ))}
      </div>
      <div className="flex-1">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="variantColor">
            <div className="block mb-2">Color:</div>
            <div className="flex gap-2">
              <ColorPicker
                inputId="variantColor"
                className="variant-color-picker"
                format="hex"
                value={color}
                onChange={e => setColor(e.value)}
              ></ColorPicker>
              <InputText
                className="w-6rem flex-1"
                value={color ? color : "00000"}
                onChange={colorCodeInput}
              />
            </div>
          </label>
          {color ? (
            <>
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
              <VariantInputText
                name="sku"
                label="SKU"
                placeholder="Enter the SKU"
                control={control}
                errors={errors}
              />
              <div className="w-full flex justify-content-end gap-2">
                <Button
                  disabled={items.length === 0}
                  type="button"
                  label="Add Variant"
                  className="flex-1 p-button-sm mt-4"
                  onClick={addVariant}
                />
                <Button
                  type="submit"
                  label="Add Item"
                  className="flex-1 p-button-sm mt-4 p-button-secondary"
                />
              </div>
            </>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default NewVariant;
