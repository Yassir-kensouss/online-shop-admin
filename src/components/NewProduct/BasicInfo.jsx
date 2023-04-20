import { Editor, InputText, InputTextarea } from "primereact";
import React, { useState } from "react";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { EditProductContext } from "../../pages/EditProduct";
import { ContextContainer } from "../../pages/NewProduct";

const BasicInfo = () => {
  const { product, setProduct, setName, name, errors } =
    useContext(ContextContainer);
  const mode = useSelector(state => state.settings.appearance.mode);

  const setDescription = e => {
    setProduct({
      ...product,
      description: e.htmlValue,
    });
  };

  const setProductName = e => {
    setName(e.target.value);
  };

  const setShortDescription = e => {
    setProduct({
      ...product,
      name: name,
      shortDescription: e.target.value,
    });
  };

  return (
    <div className="np-card">
      <h2 className="np-card-title text-xl mb-5 font-medium">
        Basic Information
      </h2>
      <div className="product-title-field mb-3">
        <label
          htmlFor="product-title"
          className="np-card-label block text-sm mb-2"
        >
          Title *
        </label>
        <InputText
          className="p-inputtext-sm w-full"
          placeholder="Apple iPad (2018 Model)"
          value={name}
          onChange={setProductName}
        />
        {errors && "name" in errors ? (
          <p className="text-red-400 mt-2 text-sm">{errors["name"]}</p>
        ) : null}
      </div>
      <div className="product-description-editor mb-3">
        <label className="np-card-label block text-sm mb-2">
          Description *
        </label>
        <Editor
          style={{ height: "320px" }}
          value={product.description}
          onTextChange={e => setDescription(e)}
        />
        {errors && "description" in errors ? (
          <p className="text-red-400 mt-2 text-sm">{errors["description"]}</p>
        ) : null}
      </div>
      <div className="short-description">
        <label className="np-card-label block text-sm mb-2">
          Short Description *
        </label>
        <InputTextarea
          rows={5}
          cols={30}
          className="w-full max-h-9rem"
          onChange={setShortDescription}
        />
        {errors && "shortDescription" in errors ? (
          <p className="text-red-400 mt-2 text-sm">
            {errors["shortDescription"]}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default BasicInfo;
