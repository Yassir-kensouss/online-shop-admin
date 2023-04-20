import { Chart } from "primereact";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { browsersTraffic } from "../services/statistics";
import DashCards from "./DashCards";
import EmptyBox from "./EmptyBox";
import BSPSkeleton from "./products/Best selling products/BSPSkeleton";

const BrowserTraffic = () => {
  const [chartData, setChartData] = useState({});

  const mode = useSelector(state => state.settings.appearance.mode);

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
          color: mode === "Light" ? "#424242" : "#fff",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: mode === "Light" ? "#2a2727" : "#fff",
        },
        grid: {
          color: null,
        },
      },
      y: {
        ticks: {
          color: mode === "Light" ? "#2a2727" : "#fff",
        },
        grid: {
          color: mode === "Light" ? "#d8d8d8" : "#485163",
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
          {chartData.labels?.length > 0 ? (
            <Chart
              height="100%"
              width="100%"
              type="bar"
              data={chartData}
              options={basicOptions}
            />
          ) : (
            <EmptyBox
              title="No Data"
              message="You don't have any data to show"
              icon={<i className="pi pi-chart-bar text-4xl"></i>}
            />
          )}
        </DashCards>
      )}
    </>
  );
};

export default BrowserTraffic;
