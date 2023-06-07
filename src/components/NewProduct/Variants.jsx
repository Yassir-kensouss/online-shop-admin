import { Button, Dialog } from "primereact";
import React from "react";
import NewVariant from "./NewVariant";
import { useState } from "react";
import { useContext } from "react";
import { ContextContainer } from "../../pages/NewProduct";

const Variants = () => {
  const [variantDialog, setVariantDialog] = useState(false);
  const { variants, setVariants } = useContext(ContextContainer);
  const [variantId, setVariantId] = useState(1);

  const removeVariant = variantId => {
    const newVal = variants.filter(variant => variant.variantId != variantId);
    setVariants(newVal);
  };

  return (
    <div className="np-card mt-3 ">
      <div className="flex justify-content-between align-items-start">
        <h2
          className={`np-card-title text-xl ${
            variants.length > 0 ? "mb-5" : null
          } font-medium`}
        >
          Variants
        </h2>
        <button
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
            setVariantId={setVariantId}
            variantId={variantId}
          />
        </Dialog>
      </div>
      {variants.length > 0 ? (
        <div className="max-h-15rem overflow-auto">
          {
            <ul>
              <div className="flex align-items-center gap-4 text-sm text-gray-900 font-semibold bg-gray-200 p-2 border-round-md">
                <div className="w-3rem">Color</div>
                <div className="w-3rem">Size</div>
                <div className="w-5rem">Material</div>
                <div className="w-3rem">Qte</div>
                <div className="w-4rem">Price</div>
              </div>
              {variants.map(variant => (
                <>
                  <li
                    key={`${variant.size}-${variant.material}`}
                    className="flex align-items-center justify-content-between border-bottom-1 border-gray-300 p-2 "
                  >
                    <div className="flex align-items-center gap-4 text-sm text-gray-700">
                      <div
                        style={{ background: `#${variant.color}` }}
                        className="w-2rem h-2rem border-round-lg"
                      ></div>
                      <div className="w-3rem">{variant.size}</div>
                      <div className="w-5rem">{variant.material}</div>
                      <div className="w-3rem">{variant.quantity}</div>
                      <div className="w-4rem">${variant.price}</div>
                    </div>
                    <Button
                      icon="pi pi-times"
                      className="p-button-rounded p-button-sm p-button-danger p-button-text"
                      aria-label="Cancel"
                      onClick={() => removeVariant(variant.variantId)}
                    />
                  </li>
                </>
              ))}
            </ul>
          }
        </div>
      ) : null}
    </div>
  );
};

export default Variants;
