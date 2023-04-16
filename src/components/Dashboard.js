import React, { useState } from "react";
import BreadCrumb from "./BreadCrumb";
import Sidebar from "./sidebar/Sidebar";
import PropTypes from "prop-types";

const Dashboard = props => {
  const { children, items, title, rightElement } = props;
  const [collapse, setCollapse] = useState(false);
  return (
    <section className="dashboard">
      <div
        className={
          collapse ? "collapse dashboard__sidebar" : "dashboard__sidebar"
        }
        aria-label="navigation sidebar"
      >
        <Sidebar setCollapse={setCollapse} collapse={collapse} />
      </div>
      <main className="dashboard__main">
        <header className="dashboard__header flex align-items-center justify-content-between">
          <div>
            {items && items.length > 0 && <BreadCrumb items={items} />}
            <h2 className="dashboard__title">{title}</h2>
          </div>
          <div className="flex align-items-center gap-2">{rightElement}</div>
        </header>
        {children}
      </main>
    </section>
  );
};

export default Dashboard;

Dashboard.propTypes = {
  items: PropTypes.array,
  title: PropTypes.string,
};
