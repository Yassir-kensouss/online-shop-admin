import React, { useState } from "react";

const SettingsItems = ({ setSetting }) => {
  const [subChild, setSubChild] = useState({
    open: false,
    id: null,
  });
  const [activeItem, setActiveItem] = useState("");

  const settings = {
    General: [
      { id: 1, label: "Personalize", icon: "pi pi-wrench" },
      { id: 2, label: "Appearance", icon: "pi pi-sun" },
    ],
    Store: [
      { id: 3, label: "SEO", icon: "pi pi-globe" },
      { id: 4, label: "Color Palette", icon: "pi pi-palette" },
      {
        id: 5,
        label: "Carousal",
        icon: "pi pi-images",
        subItems: [{ id: 6, label: "Hero", icon: null }],
      },
    ],
  };

  const handleClick = el => {
    if ("subItems" in el) {
      setSubChild({
        open: !subChild.open,
        id: el.id,
      });
      setActiveItem(el.id);
      return;
    }

    setActiveItem(el.id);
    setSetting(el.label);
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
                onClick={() => handleClick(el)}
              >
                <div className="w-full flex align-items-center justify-content-between">
                  <div
                    className={` ${
                      activeItem === el.id ? "text-purple-600" : ""
                    } settingsItems__listItemChild`}
                  >
                    <span>
                      <i className={el.icon}></i>
                    </span>
                    {el.label}
                  </div>
                  {"subItems" in el ? (
                    <button>
                      <i
                        className={`text-gray-500 pi pi-chevron-${
                          subChild.open && subChild.id === el.id
                            ? "right"
                            : "down"
                        } text-xs`}
                      ></i>
                    </button>
                  ) : null}
                </div>
                {subChild.open && subChild.id === el.id ? (
                  <ul
                    className="settingsItems__subChildList"
                    onClick={e => {
                      e.stopPropagation();
                    }}
                  >
                    {el.subItems.map(child => (
                      <li
                        key={child.label}
                        onClick={() => {
                          setActiveItem(child.id);
                          setSetting(child.label);
                        }}
                        className={`${
                          activeItem === child.id ? "text-purple-600" : ""
                        } settingsItems__subChildItem`}
                      >
                        {child.label}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </>
        ))}
      </ul>
    </div>
  );
};

export default SettingsItems;
