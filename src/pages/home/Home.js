import React from "react";
import Cards from "../../components/Cards";
import MUC from "../../components/category/MostUsedCategories";
import Dashboard from "../../components/Dashboard";
import BSP from "../../components/products/Best selling products";

const Home = () => {
  return (
    <Dashboard title="Main Dashboard">
      <section id="dashboardStatus" className="dash-counters-grid">
        <Cards
          icon={<i className="pi pi-shopping-bag"></i>}
          title="New Orders"
          value="200"
        />
        <Cards
          icon={<i className="pi pi-dollar"></i>}
          title="Total Incom"
          value="1000$"
        />
        <Cards
          icon={<i className="pi pi-users"></i>}
          title="New Users"
          value="+20"
        />
        <Cards
          icon={<i className="pi pi-cart-plus"></i>}
          title="Add to cart"
          value="200"
        />
        <Cards
          icon={<i className="pi pi-shopping-cart"></i>}
          title="total products"
          value="5000"
        />
      </section>
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
