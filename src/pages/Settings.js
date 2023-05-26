import React, { useState } from "react";
import Dashboard from "../components/Dashboard";
import SettingsItems from "../settings/SettingsItems";
import Personalize from "../components/settings/Personalize";
import Appearance from "../components/settings/Appearance";
import Hero from "../components/settings/HeroCarousal";
import HeroCarousal from "../components/settings/HeroCarousal";
import BrandCarousal from "../components/settings/brands/BrandCarousal";

const Settings = () => {
  const [setting, setSetting] = useState("Personalize");

  const renderContent = () => {
    switch (setting) {
      case "Personalize":
        return <Personalize />;
      case "Appearance":
        return <Appearance />;
      case "Hero":
        return <HeroCarousal />;
      case "Brands":
        return <BrandCarousal />;
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
