import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import uploadImageUtils from "../utils/uploadImageUtils";

const UploadCategoryModel = ({ close }) => {
  const [data, setData] = useState({
    name: "",
    image: "",
  });

  // Handle onChange
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadCategoryImages = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const response = await uploadImageUtils(file);
    const { data: ImageResponse } = response;

    setData((preve) => {
      return {
        ...preve,
        image: ImageResponse
      };
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <section className="fixed inset-0 p-4 bg-neutral-700/60 flex items-center justify-center">
      <div className="bg-white max-w-5xl w-full p-4 rounded">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-xl">Upload New Category</h1>
          <button className="w-fit block ml-auto">
            <IoClose size={20} onClick={close} className="cursor-pointer" />
          </button>
        </div>
        <form className="my-4 grid gap-2" onSubmit={handleOnSubmit}>
          <div className="grid gap-2 my-2">
            <label htmlFor="categoryName">Name:</label>
            <input
              type="name"
              id="categoryName"
              className="bg-blue-50 p-2  border-2 rounded outline-none focus:border-amber-500"
              name="name"
              value={data.name}
              onChange={handleOnChange}
              placeholder="Enter category name"
            />
          </div>
          <div className="grid gap-2 my-2">
            <p>Image:</p>
            <div className="flex gap-4 flex-col lg:flex-row items-center rounded">
              <div className="border-2 bg-blue-50 h-50 lg:w-50 w-full rounded flex items-center justify-center">
                {data.image ? (
                  <img
                    src={data.image}
                    alt="category-image"
                    className="w-full h-full"
                  />
                ) : (
                  <p>No Image</p>
                )}
              </div>
              <label htmlFor="uploadCategoryImage">
                <div
                  className={`${
                    !data.name
                      ? "bg-gray-600 cursor-not-allowed opacity-60"
                      : "bg-amber-400 hover:bg-amber-500 cursor-pointer"
                  } rounded text-white px-4 py-2 transition`}
                  disabled={!data.name}
                >
                  Upload Image
                </div>
              </label>
              <input
                type="file"
                id="uploadCategoryImage"
                className="hidden"
                onChange={handleUploadCategoryImages}
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UploadCategoryModel;
