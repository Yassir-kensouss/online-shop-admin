import React from "react";
import Cards from "../../components/Cards";
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
        <div className="dash-grid-item-1 dash-card">
          <BSP/>
        </div>
        <section className="dash-grid-item-2">
          most used categories
        </section>
      </div>
    </Dashboard>
  );
};

export default Home;
