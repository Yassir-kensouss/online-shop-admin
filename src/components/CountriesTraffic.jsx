import { Chart } from "primereact";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { BG_COLORS } from "../common/constants";
import { deviceTraffic } from "../services/statistics";
import DashCards from "./DashCards";
import BSPSkeleton from "./products/Best selling products/BSPSkeleton";

const CountriesTraffic = () => {

  return (
    <>
        <DashCards
          title="Countries Traffic"
          hasInfo={true}
          height="80%"
          infoContent="This report presents an overview of the order countries traffic"
        >
        </DashCards>
    </>
  );
};

export default CountriesTraffic;
