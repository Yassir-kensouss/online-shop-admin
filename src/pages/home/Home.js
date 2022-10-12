import React from "react";
import Cards from "../../components/Cards";
import Dashboard from "../../components/Dashboard";

const Home = () => {
  return (
    <Dashboard title="Main Dashboard">
      <section id="dashboardStatus" className="flex align-items-center gap-3">
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
    </Dashboard>
  );
};

export default Home;
