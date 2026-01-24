import React from "react";
import { IoClose } from "react-icons/io5";

const ViewImage = ({ url, close }) => {
  return (
    <div className="fixed inset-0 p-4 bg-neutral-700/60 flex items-center justify-center">
      <div className="relative w-full max-w-md max-h-[90vh] p-4 bg-white rounded flex items-center justify-center">
        {/* Close Button */}
        <button
          onClick={close}
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500 z-10 cursor-pointer"
        >
          <IoClose size={25} />
        </button>

        {/* Image */}
        <img
          src={url}
          alt="full screen"
          className="max-w-full max-h-full object-scale-down"
        />
      </div>
    </div>
  );
};

export default ViewImage;
