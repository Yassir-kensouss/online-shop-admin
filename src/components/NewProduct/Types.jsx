import { ColorPicker, Dropdown, InputText } from "primereact";
import React, { useContext, useState } from "react";
import { PRODUCT_SIZES } from "../../common/constants";
import { ContextContainer } from "../../pages/NewProduct";

const Types = () => {
  const { product, setProduct, errors } = useContext(ContextContainer);
  const [color, setColor] = useState("1976D2");
  const [size, setSize] = useState(null);

  const handleSize = e => {
    setSize(e.value);
    setProduct({
      ...product,
      size: e.value.name,
    });
  };

  const handleColor = e => {
    setColor(e.target.value);
    setProduct({
      ...product,
      color: e.target.value,
    });
  };

  const handleColorPicker = e => {
    setColor(e.value.name);
    setProduct({
      ...product,
      color: e.value.name,
    });
  };

  return (
    <div className="np-card mt-3">
      <h2 className="np-card-title text-xl mb-5 font-medium">Types</h2>
      <div className="flex gap-4">
        <div className="flex-1">
          <span className="mb-2 block">Color:</span>
          <div className="flex gap-2">
            <ColorPicker
              value={color}
              style={{
                minWidth: "40px",
                minHeight: "43px",
                width: "40px",
                height: "43px",
              }}
              className="product-color-picker"
              onChange={handleColorPicker}
            ></ColorPicker>
            <InputText
              style={{
                height: "43px",
              }}
              className="w-full"
              value={color}
              onChange={handleColor}
            />
          </div>
        </div>
        <div className="flex-1">
          <span className="mb-2 block">Size:</span>
          <Dropdown
            className="w-full"
            value={size}
            options={PRODUCT_SIZES}
            onChange={handleSize}
            optionLabel="name"
            placeholder="Select a size"
            filter
          />
        </div>
      </div>
    </div>
  );
};

export default Types;
