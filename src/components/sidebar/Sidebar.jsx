import React from "react";
import SidebarMenu from "./SidebarMenu";

const Sidebar = () => {
  return (
    <div className="sidebard">
      <header className="sidebar__header">
        <h1>SOFTTIES</h1>
      </header>
      <div className="sidebar__headerContainer">
        <SidebarMenu />
      </div>
    </div>
  );
};

export default Sidebar;
