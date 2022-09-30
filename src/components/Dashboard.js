import React from "react";
import Sidebar from "./sidebar/Sidebar";

const Dashboard = (props) => {
  const { children } = props;
  return (
    <section className="dashboard">
      <div className="dashboard__sidebar" aria-label="navigation sidebar">
        <Sidebar />
      </div>
      <main className="dashboard__main">{children}</main>
    </section>
  );
};

export default Dashboard;
