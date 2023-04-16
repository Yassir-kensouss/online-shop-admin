import { Chart } from "primereact/chart";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { BG_COLORS } from "../../../common/constants";
import { mostUsedCategories } from "../../../services/product";
import DashCards from "../../DashCards";
import BSPSkeleton from "../../products/Best selling products/BSPSkeleton";

const MUC = () => {
  const { isLoading } = useQuery(
    "most-used-categories",
    async () => {
      const response = await mostUsedCategories();
      const statistics = response.data.statistics;
      const labels = statistics.map(el => {
        return el._id;
      });

      const values = statistics.map(el => {
        return el.totalSold;
      });

      setChartData({
        labels,
        datasets: [
          {
            data: values,
            backgroundColor: BG_COLORS.slice(0, values.length),
            hoverBackgroundColor: BG_COLORS.slice(0, values.length),
          },
        ],
      });

      return statistics;
    },
    { refetchOnWindowFocus: false }
  );

  const [chartData, setChartData] = useState({});

  const [lightOptions] = useState({
    plugins: {
      legend: {
        align: "center",
        position: 'top',
        labels: {
          boxWidth: 10,
          boxHeight: 10,
          usePointStyle: true,
          pointStyle: 'rectRounded'
        },
      },
    },
  });

  return (
    <>
      {isLoading ? (
        <BSPSkeleton />
      ) : (
        <DashCards
          id="most-used-categories"
          title="Most Used Categories"
          hasInfo={true}
          infoContent="This report presents an overview of the product categories with the highest sales volume."
        >
          <div className="flex justify-content-center h-full w-full align-items-center">
            <Chart
              type="doughnut"
              data={chartData}
              options={lightOptions}
              style={{ position: "relative", width: "60%" }}
            />
          </div>
        </DashCards>
      )}
    </>
  );
};

export default MUC;
