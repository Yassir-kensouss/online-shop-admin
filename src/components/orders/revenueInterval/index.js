import { Button, Menu } from "primereact";
import React, { useRef, useState } from "react";
import { useQuery } from "react-query";
import { revenueByDate } from "../../../services/statistics";
import DashCards from "../../DashCards";
import BSPSkeleton from "../../products/Best selling products/BSPSkeleton";
import RevenueIntervalChart from "./RevenueIntervalChart";

const RevenueInterval = () => {
  const [intervalValue, setIntervalValue] = useState("day");
  const [dataset, setDataset] = useState({});

  const { isLoading } = useQuery(
    ["revenue-by-date", { intervalValue }],
    async () => {
      const response = await revenueByDate(intervalValue);
      const data = await response.data.chartData;
      setDataset(data);
    },
    { refetchOnWindowFocus: false }
  );

  return (
    <>
      {isLoading ? (
        <BSPSkeleton />
      ) : (
        <DashCards
          id="revenue-by-date"
          title={`Revenue by ${intervalValue}`}
          hasInfo={true}
          infoContent="This report presents an overview of the product categories with the highest sales volume."
          rightContent={<Interval setIntervalValue={setIntervalValue} />}
          height="80%"
        >
          <RevenueIntervalChart dataset={dataset} />
        </DashCards>
      )}
    </>
  );
};

export default RevenueInterval;

export const Interval = props => {
  const { setIntervalValue } = props;

  const items = [
    { label: "Day", command: () => setIntervalValue("day") },
    { label: "Month", command: () => setIntervalValue("month") },
    { label: "Year", command: () => setIntervalValue("year") },
  ];

  const menu = useRef(null);

  return (
    <>
      <Menu model={items} popup ref={menu} id="popup_menu" />
      <Button
        icon="pi pi-calendar"
        className="dashCard__filter p-button-rounded p-button-text"
        onClick={event => menu.current.toggle(event)}
        aria-controls="popup_menu"
        aria-haspopup
        aria-label="show date list"
        style={{ transform: "scale(0.8)" }}
      />
    </>
  );
};
