import { Skeleton } from "primereact";
import React from "react";

const TRSkeleton = () => {
  return (
    <div className="flex gap-4 w-full">
      {Array.from({ length: 5 }, (_, index) => index + 1).map(el => (
        <Skeleton key={el + 'trskeleton'} width="20%" height="4rem" borderRadius="12px" />
      ))}
    </div>
  );
};

export default TRSkeleton;
