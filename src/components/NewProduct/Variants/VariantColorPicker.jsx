import { Button, ColorPicker } from "primereact";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

const VariantColorPicker = ({ colors, setColors }) => {
  const cpicker = useRef(null);
  const [color, setColor] = useState(null);
  const [colorPicker, setColorPicker] = useState(false);

  useEffect(() => {
    const handleClickOutside = event => {
      if (cpicker.current && !cpicker.current.contains(event.target)) {
        setColorPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const addColor = () => {
    setColors(prevState => [...prevState, "#" + color]);
    setColorPicker(false);
  };

  return (
    <>
      <label className="block flex-1">
        <span className="block">Colors</span>
        <div className="mt-2 relative">
          <div className="flex gap-2 flex-wrap">
            {colors.length > 0
              ? colors.map(color => (
                  <div
                    key={color}
                    className="variant-colors w-3rem h-3rem border-round-2xl"
                    style={{ backgroundColor: color }}
                  ></div>
                ))
              : null}
            <Button
              icon="pi pi-plus"
              className="p-button-sm p-button-text"
              onClick={() => setColorPicker(true)}
            />
          </div>
          {colorPicker ? (
            <div
              ref={cpicker}
              className="absolute bottom-0 left-0 p-2 bg-white"
            >
              <ColorPicker
                value={color}
                onChange={e => setColor(e.value)}
                inline
              ></ColorPicker>
              <div className="flex gap-2 justify-content-end">
                <Button
                  label="Add"
                  className="block p-button-sm"
                  onClick={() => addColor()}
                />
                <Button
                  label="Cancel"
                  onClick={() => setColorPicker(false)}
                  className="p-button-danger block p-button-sm"
                />
              </div>
            </div>
          ) : null}
        </div>
      </label>
    </>
  );
};

export default VariantColorPicker;
