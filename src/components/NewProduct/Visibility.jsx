import { Calendar, RadioButton } from "primereact";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { EditProductContext } from "../../pages/EditProduct";
import { ContextContainer } from "../../pages/NewProduct";

const Visibility = () => {
  const [visibility, setVisibility] = useState("published");
  const { product, setProduct } = useContext(ContextContainer);

  useEffect(() => {
    setProduct({
      ...product,
      visibility: visibility,
    });
  }, []);

  return (
    <div className="np-card w-full">
      <h2 className="np-card-title text-xl mb-5 font-medium">Visibility</h2>
      <div className="field-radiobutton">
        <RadioButton
          inputId="published"
          name="visibility"
          className="p-radiobutton-sm"
          value="published"
          onChange={e => setVisibility(e.value)}
          checked={visibility === "published"}
        />
        <label htmlFor="published" className="np-card-label">
          Published
        </label>
      </div>
      <div className="field-radiobutton">
        <RadioButton
          inputId="scheduled"
          name="visibility"
          className="p-radiobutton-sm"
          value="scheduled"
          onChange={e => setVisibility(e.value)}
          checked={visibility === "scheduled"}
        />
        <label htmlFor="scheduled" className="np-card-label">
          Scheduled
        </label>
      </div>
      <div className="field-radiobutton">
        <RadioButton
          inputId="hidden"
          name="visibility"
          className="p-radiobutton-sm"
          value="hidden"
          onChange={e => setVisibility(e.value)}
          checked={visibility === "hidden"}
        />
        <label htmlFor="hidden" className="np-card-label">
          Hidden
        </label>
      </div>
      <Calendar id="icon" className="w-full" showIcon />
    </div>
  );
};

export default Visibility;
