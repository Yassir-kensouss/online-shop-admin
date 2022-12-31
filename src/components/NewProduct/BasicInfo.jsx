import { Editor, InputText, InputTextarea } from "primereact";
import React, { useState } from "react";
import { useContext } from "react";
import { ContextContainer } from "../../pages/NewProduct";

const BasicInfo = () => {
  const { product, setProduct, setName, name } = useContext(ContextContainer);

  const setDescription = e => {
    setProduct({
      ...product,
      description: e.htmlValue,
    });
  };
  
  const setProductName = e => {
    setName(e.target.value)
  };
  
  const setShortDescription = e => {
    setProduct({
      ...product,
      name:name,
      shortDescription: e.target.value,
    });
  };

  return (
    <div className="bg-white p-3 border-round-sm">
      <h2 className="text-xl mb-5 font-medium text-800">Basic Information</h2>
      <div className="product-title-field mb-3">
        <label htmlFor="product-title" className="block text-sm mb-2">
          Title
        </label>
        <InputText
          className="p-inputtext-sm w-full"
          placeholder="Apple iPad (2018 Model)"
          value={name}
          onChange={setProductName}
        />
      </div>
      <div className="product-description-editor mb-3">
        <label className="block text-sm mb-2">Description</label>
        <Editor
          style={{ height: "320px" }}
          value={product.description}
          onTextChange={(e) => setDescription(e)}
        />
      </div>
      <div className="short-description">
        <label className="block text-sm mb-2">Short Description</label>
        <InputTextarea
          rows={5}
          cols={30}
          className="w-full max-h-9rem"
          onChange={setShortDescription}
        />
      </div>
    </div>
  );
};

export default BasicInfo;
