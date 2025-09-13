import React, { useState } from "react";
import UploadCategoryModel from "../components/UploadCategoryModel";

const Category = () => {
  const [openUploadCategory, setOpenUploadCategory] = useState(false);
  return (
    <section>
      <div className="p-2 bg-white shadow-md flex items-center justify-between">
        <h1 className="font-semibold text-xl">Category</h1>
        <button
          onClick={() => setOpenUploadCategory(true)}
          className="text-l bg-yellow-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-yellow-600"
        >
          Add Category
        </button>
      </div>
      {openUploadCategory && (
        <UploadCategoryModel close={() => setOpenUploadCategory(false)} />
      )}
    </section>
  );
};

export default Category;
