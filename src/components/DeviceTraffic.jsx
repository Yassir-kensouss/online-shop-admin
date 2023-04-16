import { Chart } from "primereact";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { BG_COLORS } from "../common/constants";
import { deviceTraffic } from "../services/statistics";
import DashCards from "./DashCards";
import BSPSkeleton from "./products/Best selling products/BSPSkeleton";

const DeviceTraffic = () => {
  const [chartData, setChartData] = useState({});

  let basicOptions = {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      legend: {
        align: "center",
        labels: {
          boxWidth: 10,
          boxHeight: 10,
          usePointStyle: true,
          pointStyle: "rectRounded",
        },
      },
    },
  };

  const { isLoading } = useQuery(
    "device-traffic",
    async () => {
      const response = await deviceTraffic();
      const data = await response.data.chartData;
      setChartData({
        labels: data.map(el => el._id),
        datasets: [
            {
                data: data.map(el => el.count),
                backgroundColor: BG_COLORS.slice(0, data.length),
                hoverBackgroundColor: BG_COLORS.slice(0, data.length),
            }
        ]
      });
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
          id="device-traffic"
          title="Device Traffic"
          hasInfo={true}
          height="80%"
          infoContent="This report presents an overview of the order device traffic"
        >
          <Chart
            height="100%"
            width="100%"
            type="pie"
            data={chartData}
            options={basicOptions}
          />
        </DashCards>
      )}
    </>
  );
};

export default DeviceTraffic;