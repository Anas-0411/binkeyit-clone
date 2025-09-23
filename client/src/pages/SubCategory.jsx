import React, { useEffect, useState } from "react";
import UploadSubCategoryModel from "../components/UploadSubCategoryModel";
// import Loading from "../components/Loading";
// import NoData from "../components/NoData";
// import Axios from "../utils/Axios";
// import toast from "react-hot-toast";
// import SummaryApis from "../common/SummaryApis";
// import AxiosToastError from "../utils/AxiosToastError";
// import EditSubCategory from "../components/EditSubCategory";
// import ConfirmBox from "../components/ConfirmBox";

const SubCategory = () => {
  const [openUploadSubCategory, setOpenUploadSubCategory] = useState(false);
  // const [loading, setLoading] = useState(false);
  // const [subCategoryData, setSubCategoryData] = useState([]);
  // const [openEdit, setOpenEdit] = useState(false);
  // const [editData, setEditData] = useState({
  //   name: "",
  //   image: "",
  // });
  // const [deleteSubCategory, setDeleteSubCategory] = useState({
  //   _id: "",
  // });
  // const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false);
  // const fetchSubCategory = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await Axios({
  //       ...SummaryApis.getSubCategory,
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
  //   fetchSubCategory();
  // }, []);

  // const handleDeleteSubCategory = async () => {
  //   try {
  //     const response = await Axios({
  //       ...SummaryApis.deleteSubCategory,
  //       data: deleteSubCategory,
  //     });

  //     const { data: responseData } = response;

  //     if (responseData.success) {
  //       toast.success(responseData.message);
  //       fetchCategory();
  //       setOpenConfirmBoxDelete(false);
  //     }
  //   } catch (error) {
  //     AxiosToastError(error);
  //   }
  // };

  return (
    <section>
      <div className="p-2 bg-white shadow-md flex items-center justify-between">
        <h1 className="font-semibold text-xl">Sub Category</h1>
        <button
          onClick={() => setOpenUploadSubCategory(true)}
          className="text-l bg-yellow-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-yellow-600"
        >
          Add Sub Category
        </button>
      </div>
      {openUploadSubCategory && (
        <UploadSubCategoryModel close={() => setOpenUploadSubCategory(false)} />
      )}
    </section>
  );
};

export default SubCategory;
