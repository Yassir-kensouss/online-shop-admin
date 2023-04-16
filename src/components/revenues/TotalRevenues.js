import { Skeleton } from "primereact";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { totalRevenues } from "../../services/statistics";
import Cards from "../Cards";
import TRSkeleton from "./TRSkeleton";

const TotalRevenues = () => {
  const [revenue, setRevenue] = useState({
    totalRevenue: 0,
    totalSales: 0,
    totalOrders: 0,
    totalUsers: 0,
    newUsers: {
      value: 0,
      rate: 0
    },
    newOrders: {
      value: 0,
      rate: 0
    }
  });

  const { isLoading } = useQuery(
    "total-revenues",
    async () => {
      const response = await totalRevenues();
      const result = await response.data;
      setRevenue(result);
      return result;
    },
    { refetchOnWindowFocus: false, cacheTime: 0 }
  );

  return (
    <section id="dashboardStatus" className="dash-counters-grid">
      {isLoading ? (
        <TRSkeleton/>
      ) : (
        <>
          <Cards
            icon={<i className="pi pi-shopping-bag"></i>}
            title="Total Revenues"
            value={"$" + revenue.totalRevenue}
          />
          <Cards
            icon={<i className="pi pi-dollar"></i>}
            title="Total Sales"
            value={revenue.totalSales}
          />
          <Cards
            icon={<i className="pi pi-users"></i>}
            title="Total Users"
            value={revenue.totalUsers}
            rateValue={revenue.newUsers.value}
            rateType={revenue.newUsers.rate}
          />
          <Cards
            icon={<i className="pi pi-cart-plus"></i>}
            title="Total Orders"
            value={revenue.totalOrders}
            rateValue={revenue.newOrders.value}
            rateType={revenue.newOrders.rate}
          />
          <Cards
            icon={<i className="pi pi-shopping-cart"></i>}
            title="total products"
            value="5000"
          />
        </>
      )}
    </section>
  );
};

export default TotalRevenues;
