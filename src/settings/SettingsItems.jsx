import React from "react";

const SettingsItems = ({ setSetting }) => {
  const settings = {
    General: [
      { label: "Personalize", icon: "pi pi-wrench" },
      { label: "Appearance", icon: "pi pi-sun" },
    ],
    Store: [
      { label: "SEO", icon: "pi pi-globe" },
      { label: "Color Palette", icon: "pi pi-palette" },
      { label: "Carousal", icon: "pi pi-images" },
    ],
  };

  return (
    <div className="settingsItems">
      <ul className="settingsItems__list">
        {Object.keys(settings).map(setting => (
          <>
            <h3 className="settingsItems__listTitle">{setting}</h3>
            {settings[setting].map(el => (
              <li
                key={el.label}
                className="settingsItems__listItem"
                onClick={() => setSetting(el.label)}
              >
                <span>
                  <i className={el.icon}></i>
                </span>
                {el.label}
              </li>
            ))}
          </>
        ))}
      </ul>
    </div>
  );
};

export default SettingsItems;
