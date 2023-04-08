import React, { useState } from "react";
import { shortenString } from "../utils/helpers";

const SeeMore = ({ text, limit }) => {
  const [seeMore, setSeeMore] = useState(false);

  return (
    <>
      <div
        dangerouslySetInnerHTML={{
          __html: shortenString(text, seeMore ? text.length : limit),
        }}
      />
      {text.length > limit ? (
        <div
          className="text-900 cursor-pointer font-semibold"
          onClick={() => setSeeMore(!seeMore)}
        >
          {seeMore ? "view less" : "...view more"}
        </div>
      ) : null}
    </>
  );
};

export default SeeMore;
