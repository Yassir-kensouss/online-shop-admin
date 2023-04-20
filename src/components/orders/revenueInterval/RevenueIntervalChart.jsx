import { Chart } from "primereact";
import React from "react";
import { useSelector } from "react-redux";
import EmptyBox from "../../EmptyBox";

const RevenueIntervalChart = props => {
  const { dataset } = props;

  const mode = useSelector(state => state.settings.appearance.mode);

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
          pointStyle: "rectRounded",
          color: mode === "Light" ? "#424242" : "#fff",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: mode === "Light" ? "#2a2727" : "#fff",
          font: {
            weight: "bold",
          },
        },
        grid: {
          color: mode === "Light" ? "#d8d8d8" : "#485163",
        },
      },
      y: {
        ticks: {
          color: mode === "Light" ? "#2a2727" : "#fff",
          font: {
            weight: "bold",
          },
        },
        grid: {
          color: mode === "Light" ? "#d8d8d8" : "#485163",
        },
      },
    },
  };

  return (
    <>
      {dataset.labels?.length > 0 ? (
        <Chart
          style={{ height: "100%" }}
          type="line"
          data={dataset}
          options={basicOptions}
        />
      ) : (
        <EmptyBox
          title="No Data"
          message="You don't have any data to show"
          icon={<i className="pi pi-chart-line"></i>}
        />
      )}
    </>
  );
};

export default RevenueIntervalChart;
