import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import uploadImageUtils from "../utils/uploadImageUtils";
import { useSelector } from "react-redux";
import Axios from "../utils/Axios";
import SummaryApis from "../common/SummaryApis";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";

const EditSubCategory = ({ close, data, fetchData }) => {
  const [subCategoryData, setSubCategoryData] = useState({
    _id: data?._id,
    name: data?.name,
    image: data?.image,
    category: data.category || [],
  });
  const allCategory = useSelector((state) => state.product.allCategory);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setSubCategoryData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleUploadSubCategoryImages = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const response = await uploadImageUtils(file);
    const { data: ImageResponse } = response;

    setSubCategoryData((preve) => {
      return {
        ...preve,
        image: ImageResponse.data.url,
      };
    });
  };
  const handleRemoveCategorySelected = (categoryId) => {
    const index = subCategoryData.category.findIndex(
      (el) => el._id === categoryId
    );
    subCategoryData.category.splice(index, 1);
    setSubCategoryData((preve) => {
      return {
        ...preve,
      };
    });
  };
  const handleSubmitSubCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryApis.updateSubcategory,
        data: subCategoryData,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        if (close) {
          close();
        }
        if (fetchData) {
          fetchData();
        }
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <section className="fixed inset-0 p-4 bg-neutral-700/60 flex items-center justify-center">
      <div className="bg-white max-w-5xl w-full p-4 rounded">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-xl">Edit Sub Category</h1>
          <button className="w-fit block ml-auto">
            <IoClose size={20} onClick={close} className="cursor-pointer" />
          </button>
        </div>
        <form className="my-4 grid gap-2" onSubmit={handleSubmitSubCategory}>
          {/* sub category name */}
          <div className="grid gap-2 my-2">
            <label htmlFor="subCategoryName">Sub Category Name:</label>
            <input
              type="name"
              id="subCategoryName"
              className="bg-blue-50 p-2 border-2 rounded outline-none focus:border-amber-500"
              name="name"
              value={subCategoryData.name}
              onChange={handleOnChange}
              placeholder="Enter sub category name"
            />
          </div>
          {/* sub category image */}
          <div className="grid gap-2 my-2">
            <p>Image:</p>
            <div className="flex gap-4 flex-col lg:flex-row items-center rounded">
              <div className="border-2 bg-blue-50 h-50 lg:w-50 w-full rounded flex items-center justify-center">
                {subCategoryData.image ? (
                  <img
                    src={subCategoryData.image}
                    alt="subCategory-image"
                    className="w-full h-full"
                  />
                ) : (
                  <p>No Image</p>
                )}
              </div>
              <label htmlFor="uploadSubCategoryImage">
                <div
                  className={`${
                    !subCategoryData.name
                      ? "bg-gray-600 cursor-not-allowed opacity-60"
                      : "bg-amber-400 hover:bg-amber-500 cursor-pointer"
                  } rounded text-white px-4 py-2 transition`}
                >
                  Upload Image
                </div>
              </label>
              <input
                disabled={!subCategoryData.name}
                type="file"
                id="uploadSubCategoryImage"
                className="hidden"
                onChange={handleUploadSubCategoryImages}
              />
            </div>
          </div>
          {/* select category */}
          <div className="grid gap-2 my-2">
            <label>Select Category:</label>
            <div>
              {/*display value**/}
              <div className="flex flex-wrap gap-2">
                {subCategoryData.category.map((cat, index) => {
                  return (
                    <p
                      key={cat._id + "selectedValue"}
                      className="bg-white shadow-md px-1 m-1 border-2 border-amber-500 flex items-center gap-2 "
                    >
                      {cat.name}
                      <div
                        className="cursor-pointer hover:text-red-600"
                        onClick={() => handleRemoveCategorySelected(cat._id)}
                      >
                        <IoClose size={20} />
                      </div>
                    </p>
                  );
                })}
              </div>
              {/*select category**/}
              <select
                className="w-full bg-blue-50 p-2 border-2 outline-none border rounded focus:border-amber-500"
                onChange={(e) => {
                  const value = e.target.value;
                  const categoryDetails = allCategory.find(
                    (el) => el._id == value
                  );
                  setSubCategoryData((preve) => {
                    return {
                      ...preve,
                      category: [...preve.category, categoryDetails],
                    };
                  });
                }}
              >
                <option value={""}>--Select Category--</option>
                {allCategory.map((category, index) => {
                  return (
                    <option
                      value={category?._id}
                      key={category._id + "subcategory"}
                    >
                      {category?.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          {/* submit button */}
          <button
            disabled={
              !(
                subCategoryData.name &&
                subCategoryData.image &&
                subCategoryData.category
              )
            }
            className={`rounded text-white px-4 py-2 transition ${
              subCategoryData?.name &&
              subCategoryData?.image &&
              subCategoryData?.category[0]
                ? "bg-amber-400 hover:bg-amber-500 cursor-pointer"
                : "bg-gray-600 cursor-not-allowed opacity-60"
            }`}
          >
            Edit Sub Category
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditSubCategory;
