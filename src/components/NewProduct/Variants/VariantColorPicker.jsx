import { Button, ColorPicker } from "primereact";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

const VariantColorPicker = ({ colors, setColors }) => {
  const [color, setColor] = useState(null);

  const addColor = () => {
    setColors(prevState => [...prevState, "#" + color]);
  };

  return (
    <>
      <label className="block flex-1">
        <span className="block">Colors</span>
        {/* <ColorPicker value={color} onChange={e => setColor(e.value)} /> */}
      </label>
    </>
  );
};

export default VariantColorPicker;
