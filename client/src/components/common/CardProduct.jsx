import React from "react";
import { DisplayPriceInRupees } from "../../utils/DisplayPriceInRupees";

const CardProduct = ({ data }) => {
  return (
    <div className="max-w-52 min-w-52 p-4 rounded shadow-md grid gap-2">
      <div className="min-h-20 max-h-52 rounded">
        <img src={data.image[0]} className="w-full h-full object-scale-down" />
      </div>
      <div className="rounded-lg px-2 py-1 w-fit text-sm text-green-600 font-semibold bg-green-100">
        10 min
      </div>
      <div className="font-medium text-ellipsis line-clamp-2">
        {data.name}
      </div>
      <div className="w-fit ">
        {data.unit}
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="font-bold">
          {DisplayPriceInRupees(data.price)}
        </div>
        <div>
          <button className="bg-green-600 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-green-500 cursor-pointer">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
