import React from "react";
import Cards from "../../components/Cards";
import MUC from "../../components/category/MostUsedCategories";
import Dashboard from "../../components/Dashboard";
import BSP from "../../components/products/Best selling products";
import TotalRevenues from "../../components/revenues/TotalRevenues";

const Home = () => {
  return (
    <Dashboard title="Main Dashboard">
      <TotalRevenues/>
      <div className="dash-grid-container">
        <div className="dash-grid-item-1">
          <BSP/>
        </div>
        <div className="dash-grid-item-2">
          <MUC/>
        </div>
      </div>
    </Dashboard>
  );
};

export default Home;
