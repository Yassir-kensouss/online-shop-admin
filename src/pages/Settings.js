import React from "react";
import Dashboard from "../components/Dashboard";
import SettingsItems from "../settings/SettingsItems";

const Settings = () => {
  return <Dashboard title="Settings">
    <section className="settings">
      <div className="settings__sidebar">
        <SettingsItems/>
      </div>
      <div className="settings__content">
      </div> 
    </section>
  </Dashboard>;
};

export default Settings;
