import React from "react";
import SidebarMenu from "./SidebarMenu";
import logoP1 from '../../assets/logo_p1.png'
import logoP2 from '../../assets/logo_p2.png'
import { Button } from "primereact";

const Sidebar = ({setCollapse, collapse}) => {

  const handleCollapse = () => {
    setCollapse(!collapse)
  }

  return (
    <div className="sidebar">
      <header className="sidebar__header" onClick={handleCollapse}>
        <div className="flex align-items-center gap-2">
          <img src={logoP1} />
          {/* <img src={logoP2} /> */}
        </div>
      </header>
      <div className="sidebar__headerContainer">
        <SidebarMenu collapse={collapse}/>
      </div>
    </div>
  );
};

export default Sidebar;
