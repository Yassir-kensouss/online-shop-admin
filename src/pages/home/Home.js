import React from "react";
import BrowserTraffic from "../../components/BrowserTraffic";
import Cards from "../../components/Cards";
import MUC from "../../components/category/MostUsedCategories";
import CountriesTraffic from "../../components/CountriesTraffic";
import Dashboard from "../../components/Dashboard";
import DeviceTraffic from "../../components/DeviceTraffic";
import LightingModeSwitch from "../../components/LightingModeSwitch";
import RevenueInterval from "../../components/orders/revenueInterval";
import OsTraffic from "../../components/OsTraffic";
import BSP from "../../components/products/Best selling products";
import TotalRevenues from "../../components/revenues/TotalRevenues";

const Home = () => {
  return (
    <Dashboard title="Main Dashboard" rightElement={<LightingModeSwitch />}>
      <TotalRevenues />
      <div className="dash-grid-container">
        <div className="dash-grid-item-1">
          <BSP />
        </div>
        <div className="dash-grid-item-2">
          <MUC />
        </div>
        <div className="dash-grid-item-3">
          <RevenueInterval />
        </div>
        <div className="dash-grid-item-4">
          <BrowserTraffic />
        </div>
        <div className="dash-grid-item-5">
          <DeviceTraffic />
        </div>
        <div className="dash-grid-item-6">
          <OsTraffic />
        </div>
        <div className="dash-grid-item-7">
          <CountriesTraffic />
        </div>
      </div>
    </Dashboard>
  );
};

export default Home;
