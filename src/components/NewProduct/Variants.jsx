import { Button, Dialog } from "primereact";
import React from "react";
import NewVariant from "./NewVariant";
import { useState } from "react";

const Variants = ({ variants, setVariants }) => {
  const [variantDialog, setVariantDialog] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");

  const removeVariantItem = variantId => {
    const _v = variants[selectedColor].filter(el => el.variantId !== variantId);
    if (_v.length > 0) {
      setVariants({ ...variants, [selectedColor]: _v });
    } else {
      removeColor(selectedColor);
    }
  };

  const selectColor = color => {
    setSelectedColor(color);
  };

  const removeColor = color => {
    const _newVariants = { ...variants };
    delete _newVariants[color];
    setVariants(_newVariants);
  };

  return (
    <div className="np-card mt-3 ">
      <div className="flex justify-content-between align-items-start">
        <h2 className="np-card-title text-xl font-medium">Variants</h2>
        <button
          type="button"
          className="custom-link-btn with-icon"
          onClick={() => setVariantDialog(true)}
        >
          <i className="pi pi-plus text-xs"></i>
          <span>Add variant</span>
        </button>
        <Dialog
          header="New Variant"
          visible={variantDialog}
          style={{ width: "50vw" }}
          onHide={() => setVariantDialog(false)}
          draggable={false}
        >
          <NewVariant
            setVariantDialog={setVariantDialog}
            setVariants={setVariants}
            variants={variants}
          />
        </Dialog>
      </div>
      {Object.keys(variants || {}).length > 0 ? (
        <div className="flex gap-2 mt-4">
          {Object.keys(variants).map(el => (
            <div
              key={el}
              onClick={() => selectColor(el)}
              style={{ backgroundColor: `#${el}` }}
              className="variant-color relative w-3rem h-3rem border border-round-2xl cursor-pointer"
            >
              <button
                onClick={() => removeColor(el)}
                style={{ top: "-8px", right: "-8px" }}
                className="vc-remove-btn cursor-pointer p-1 flex align-items-center justify-content-center border-circle bg-gray-800 text-white absolute"
              >
                <i className="pi pi-times text-xs"></i>
              </button>
            </div>
          ))}
        </div>
      ) : null}
      <ul>
        {variants[selectedColor] &&
          variants[selectedColor].map(item => (
            <li
              key={`${item.variantId}-${item.size}`}
              className="pl-2 pr-2 bg-gray-100 mt-2 border-round-xl flex justify-content-between align-items-center gap-2"
            >
              <div className="w-2rem">{item.size}</div>
              <div className="w-4rem">{item.material}</div>
              <div className="w-4rem">{item.price}</div>
              <div className="w-4rem">{item.quantity}</div>
              <Button
                icon="pi pi-times"
                className="p-button-rounded p-button-danger p-button-sm p-button-text"
                aria-label="delete"
                onClick={() => removeVariantItem(item.variantId)}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Variants;
