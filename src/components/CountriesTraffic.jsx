import { Chart } from "primereact";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { BG_COLORS } from "../common/constants";
import { countryTraffic, deviceTraffic } from "../services/statistics";
import DashCards from "./DashCards";
import BSPSkeleton from "./products/Best selling products/BSPSkeleton";
import emojiFlags from "emoji-flags";
import Flag from "react-world-flags";

const CountriesTraffic = () => {
  const [country, setCountries] = useState([]);

  const { isLoading } = useQuery(
    "country-traffic",

    async () => {
      const response = await countryTraffic();
      const data = await response.data.result;
      console.log("data", data);
      setCountries(data);
    },
    { refetchOnWindowFocus: false }
  );

  return (
    <>
      {isLoading ? (
        <BSPSkeleton />
      ) : (
        <DashCards
          id="countries-traffic"
          title="Countries Traffic"
          hasInfo={true}
          height="80%"
          infoContent="This report presents an overview of the order countries traffic"
        >
          <div className="h-full overflow-auto">
            {country &&
              country.length > 0 &&
              country.map(el => {
                const countryCode = el.country_code;
                return (
                  <div
                    key={el.country}
                    className="flex align-items-center justify-content-between"
                  >
                    <div className="flex align-items-center gap-2">
                      <div className="w-2rem h-2rem mb-2">
                        <Flag code="US" className="rounded-image-fit" />
                      </div>
                      <span className="capitalize text-800">{el.country}</span>
                    </div>
                    <div className="text-800 text-sm font-semibold">
                      {el.percentage}%
                    </div>
                  </div>
                );
              })}
          </div>
        </DashCards>
      )}
    </>
  );
};

export default CountriesTraffic;
