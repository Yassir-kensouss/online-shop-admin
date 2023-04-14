import { Chart } from "primereact";
import React from "react";

const RevenueIntervalChart = props => {
  const { dataset } = props;

  let basicOptions = {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        align: "end",
        labels: {
          boxWidth: 10,
          boxHeight: 10,
          usePointStyle: true,
          pointStyle: 'rectRounded'
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#2a2727",
          font: {
            weight: "bold",
          },
        },
        grid: {
          color: "#ebedef",
        },
      },
      y: {
        ticks: {
          color: "#2a2727",
          font: {
            weight: "bold",
          },
        },
        grid: {
          color: "#ebedef",
          zeroLineColor: "#eb0101",
        },
      },
    },
  };

  return (
    <>
      <Chart
        style={{ height: "100%" }}
        type="line"
        data={dataset}
        options={basicOptions}
      />
    </>
  );
};

export default RevenueIntervalChart;
