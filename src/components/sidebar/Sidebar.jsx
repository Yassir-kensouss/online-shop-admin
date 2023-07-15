import React from "react";
import SidebarMenu from "./SidebarMenu";
import logoP1 from "../../assets/logo_p1.png";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { fetchSettings } from "../../store/settings";
import { fetchGeneralSettings } from "../../services/settings";

const Sidebar = ({ setCollapse, collapse }) => {
  const brand = useSelector(state => state.settings.personalize.brand);
  const mode = useSelector(state => state.settings.appearance.mode);

  const handleCollapse = () => {
    setCollapse(!collapse);
  };

  const dispatch = useDispatch();

  const { isLoading } = useQuery(
    "fetch-general-setting",
    async () => {
      const response = await fetchGeneralSettings();
      const data = await response.data.data;
      dispatch(fetchSettings(data));
    },
    { refetchOnWindowFocus: false }
  );

  return (
    <div className="sidebar">
      <header className="sidebar__header" onClick={handleCollapse}>
        <div className="flex align-items-center gap-2">
          {/* <img src={brand} width="50%" /> */}

          {collapse ? (
            <div
              className={`logo font-bold text-xl ${
                mode === "Light" ? "text--gray-800" : "text-white"
              }`}
            >
              LTS.
            </div>
          ) : (
            <div
              className={`logo font-bold text-xl ${
                mode === "Light" ? "text--gray-800" : "text-white"
              }`}
            >
              Looties.
            </div>
          )}
        </div>
      </header>
      <div className="sidebar__headerContainer">
        <SidebarMenu collapse={collapse} />
      </div>
    </div>
  );
};

export default Sidebar;
