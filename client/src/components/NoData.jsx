import React from "react";
import noDataImage from "../assets/images/nothing here yet.webp";

const NoData = () => {
  return (
    <div className="flex flex-col justify-center items-center p-8 g-4">
      <img src={noDataImage} alt="No data" className="w-36" />
      <p className="text-neutral-600">No Data Available</p>
    </div>
  );
};

export default NoData;
