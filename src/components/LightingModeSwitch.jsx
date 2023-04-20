import { Button } from "primereact";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateApSettings } from "../store/settings";

const LightingModeSwitch = () => {
  const mode = useSelector(state => state.settings.appearance.mode);

  const dispatch = useDispatch();

  const handleMode = () => {
    dispatch(updateApSettings({ mode: mode === "Light" ? "Dark" : "Light" }));
  };

  return (
    <>
      <Button
        onClick={handleMode}
        className={`${
          mode === "Dark" ? "text-white" : "text-900"
        } p-button-text p-button-rounded`}
        icon={mode === "Light" ? "pi pi-moon" : "pi pi-sun"}
      />
    </>
  );
};

export default LightingModeSwitch;
