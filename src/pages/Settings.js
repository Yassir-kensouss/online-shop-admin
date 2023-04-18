import React, { useState } from "react";
import Dashboard from "../components/Dashboard";
import SettingsItems from "../settings/SettingsItems";
import Personalize from "../components/settings/Personalize";
import Appearance from "../components/settings/Appearance";

const Settings = () => {
  const [setting, setSetting] = useState("Personalize");

  const renderContent = () => {
    switch (setting) {
      case "Personalize":
        return <Personalize />;
      case "Appearance":
        return <Appearance />;
      default:
        return <div>Run</div>;
    }
  };

  return (
    <Dashboard title="Settings">
      <section className="settings">
        <div className="settings__sidebar">
          <SettingsItems setSetting={setSetting} />
        </div>
        <div className="settings__content">{renderContent()}</div>
      </section>
    </Dashboard>
  );
};

export default Settings;
