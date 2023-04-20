import { SelectButton } from "primereact";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateApSettings } from "../../store/settings";
import SettingContentWrapper from "./SettingContentWrapper";

const Appearance = () => {
  const appearanceSettings = useSelector(state => state.settings.appearance);

  const options = ["Light", "Dark"];

  const dispatch = useDispatch();

  const handleMode = value => {
    dispatch(updateApSettings({ mode: value }));
    localStorage.setItem("mode", value);
  };

  return (
    <>
      <SettingContentWrapper title="Appearance">
        <div className="mt-4">
          <div className="flex align-items-start gap-8">
            <div>
              <label className="sa-label text-l">Lighting mode</label>
              <p className="sa-sub-label mt-1 text-sm">
                Select your lighting theme Dark/Light
              </p>
            </div>
            <div>
              <SelectButton
                value={appearanceSettings.mode}
                options={options}
                onChange={e => handleMode(e.value)}
              />
            </div>
          </div>
        </div>
      </SettingContentWrapper>
    </>
  );
};

export default Appearance;
