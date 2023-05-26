import Skeleton from "react-loading-skeleton";
import React from "react";

const ListLoadingSkeleton = () => {
  return (
    <div className="mt-4">
      <Skeleton width="500px" height="30px" borderRadius="1rem" />
      <Skeleton width="500px" height="30px" borderRadius="1rem" />
      <Skeleton width="500px" height="30px" borderRadius="1rem" />
      <Skeleton width="500px" height="30px" borderRadius="1rem" />
      <Skeleton width="500px" height="30px" borderRadius="1rem" />
    </div>
  );
};

export default ListLoadingSkeleton;
