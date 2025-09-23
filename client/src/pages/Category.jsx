import React, { useEffect, useState } from "react";
import UploadCategoryModel from "../components/UploadCategoryModel";
import Loading from "../components/Loading";
import NoData from "../components/NoData";
import Axios from "../utils/Axios";
import toast from "react-hot-toast";
import SummaryApis from "../common/SummaryApis";
import AxiosToastError from "../utils/AxiosToastError";
import EditCategory from "../components/EditCategory";
import ConfirmBox from "../components/ConfirmBox";
import { useSelector } from "react-redux";

const Category = () => {
  const [openUploadCategory, setOpenUploadCategory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    image: "",
  });
  const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState({
    _id: "",
  });

  const allCategory = useSelector((state) => state.product.allCategory);
  useEffect(() => {
    setCategoryData(allCategory);
  }, [allCategory]);

  // const fetchCategory = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await Axios({
  //       ...SummaryApis.getCategory,
  //     });
  //     const { data: responseData } = response;
  //     if (responseData.success) {
  //       setCategoryData(responseData.data);
  //     }
  //     // console.log(responseData);
  //   } catch (error) {
  //     AxiosToastError(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   fetchCategory();
  // }, []);

  const handleDeleteCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApis.deleteCategory,
        data: deleteCategory,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        fetchCategory();
        setOpenConfirmBoxDelete(false);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

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
      {!categoryData[0] && !loading && <NoData />}
      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {categoryData.map((category) => (
          <div
            key={category._id} // always add a unique key
            className="flex flex-col justify-between w-full h-72 rounded shadow-md overflow-hidden"
          >
            <div className="p-2 text-neutral-500 font-semibold text-center">
              {category.name}
            </div>
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-40 object-cover"
            />
            <div className="flex items-center justify-between p-2 gap-2">
              <button
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white rounded py-1 font-semibold"
                onClick={() => {
                  setOpenEdit(true);
                  setEditData(category);
                }}
              >
                Edit
              </button>
              <button
                className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded py-1 font-semibold"
                onClick={() => {
                  setOpenConfirmBoxDelete(true);
                  setDeleteCategory(category);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* loading */}
      {loading && <Loading />}
      {openUploadCategory && (
        <UploadCategoryModel
          fetchData={fetchCategory}
          close={() => setOpenUploadCategory(false)}
        />
      )}
      {openEdit && (
        <EditCategory
          data={editData}
          close={() => setOpenEdit(false)}
          fetchData={fetchCategory}
        />
      )}
      {openConfirmBoxDelete && (
        <ConfirmBox
          close={() => setOpenConfirmBoxDelete(false)}
          cancel={() => setOpenConfirmBoxDelete(false)}
          confirm={handleDeleteCategory}
        />
      )}
    </section>
  );
};

export default Category;
