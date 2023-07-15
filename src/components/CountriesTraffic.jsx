import { Chart } from "primereact";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { BG_COLORS } from "../common/constants";
import { countryTraffic, deviceTraffic } from "../services/statistics";
import DashCards from "./DashCards";
import BSPSkeleton from "./products/Best selling products/BSPSkeleton";
import emojiFlags from "emoji-flags";
import Flag from "react-world-flags";
import EmptyBox from "./EmptyBox";

const CountriesTraffic = () => {
  const [country, setCountries] = useState([]);

  const { isLoading } = useQuery(
    "country-traffic",

    async () => {
      const response = await countryTraffic();
      const data = await response.data.result;
      setCountries(data);
    },
    { refetchOnWindowFocus: false }
  );

  console.log("country", country);

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
            {country && country.length > 0 ? (
              country.map(el => {
                return (
                  <div key={el.country} className="countriesTraffic">
                    <div className="flex align-items-center gap-2">
                      <div className="w-2rem h-2rem mb-2">
                        <Flag
                          code={el.country_code}
                          fallback="UNK"
                          className="rounded-image-fit"
                        />
                      </div>
                      <span className="countriesTraffic__country">
                        {el.country}
                      </span>
                    </div>
                    <div className="countriesTraffic__percentage text-sm">
                      {el.percentage}%
                    </div>
                  </div>
                );
              })
            ) : (
              <EmptyBox
                title="No Data"
                message="You don't have any data to show"
                icon={<i className="pi pi-list"></i>}
              />
            )}
          </div>
        </DashCards>
      )}
    </>
  );
};

export default CountriesTraffic;
