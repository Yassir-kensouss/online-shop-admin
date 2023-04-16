import { Chart } from "primereact";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { browsersTraffic } from "../services/statistics";
import DashCards from "./DashCards";
import BSPSkeleton from "./products/Best selling products/BSPSkeleton";

const BrowserTraffic = () => {
  const [chartData, setChartData] = useState({});

  let basicOptions = {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      legend: {
        align: "end",
        labels: {
          boxWidth: 10,
          boxHeight: 10,
          usePointStyle: true,
          pointStyle: "rectRounded",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#495057",
        },
        grid: {
          color: "#ebedef",
        },
      },
      y: {
        ticks: {
          color: "#495057",
        },
        grid: {
          color: "#ebedef",
        },
      },
    },
  };

  const { isLoading } = useQuery(
    "browser-traffic",
    async () => {
      const response = await browsersTraffic();
      const data = await response.data.chartData;
      setChartData(data);
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <>
      {isLoading ? (
        <BSPSkeleton />
      ) : (
        <DashCards
          id="browser-traffic"
          title="Browser Traffic"
          hasInfo={true}
          height="80%"
          infoContent="This report presents an overview of the product categories with the highest sales volume."
        >
          <Chart
            height="100%"
            width="100%"
            type="bar"
            data={chartData}
            options={basicOptions}
          />
        </DashCards>
      )}
    </>
  );
};

export default BrowserTraffic;
