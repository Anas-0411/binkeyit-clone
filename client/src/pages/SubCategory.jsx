import React, { useEffect, useState } from "react";
import UploadSubCategoryModel from "../components/UploadSubCategoryModel";
import { createColumnHelper } from "@tanstack/react-table";
import DisplayTable from "../components/DisplayTable";
import { HiPencil } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import EditSubCategory from "../components/EditSubCategory";
import ViewImage from "../components/ViewImage";
import ConfirmBox from "./../components/ConfirmBox";
import Axios from "../utils/Axios";
import SummaryApis from "../common/SummaryApis";
import { toast } from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";

const SubCategory = () => {
  const [openUploadSubCategory, setOpenUploadSubCategory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const columnHelper = createColumnHelper();
  const [ImageURL, setImageURL] = useState("");
  const [openEditSubCategory, setOpenEditSubCategory] = useState(false);
  const [editSubCategoryData, setEditSubCategoryData] = useState({
    _id: "",
  });
  const [deleteSubCategory, setDeleteSubCategory] = useState({
    _id: "",
  });
  const [openDeleteConfirmBox, setOpenDeleteConfirmBox] = useState(false);

  // fetching sub category data
  const fetchSubCategory = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApis.getSubCategory,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        setSubCategoryData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchSubCategory();
  }, []);
  // define table
  const column = [
    columnHelper.accessor("name", {
      header: "Name",
    }),
    columnHelper.accessor("image", {
      header: "Image",
      cell: ({ row }) => {
        return (
          <div className="flex justify-center item-center">
            <img
              src={row.original.image}
              alt={row.original.name}
              className="w-8 h-8 cursor-pointer"
              onClick={() => {
                setImageURL(row.original.image);
              }}
            />
          </div>
        );
      },
    }),
    columnHelper.accessor("category", {
      header: "Category",
      cell: ({ row }) => {
        return (
          <>
            {row.original.category.map((c, index) => {
              return (
                <p
                  key={c._id + "table"}
                  className="shadow-md px-1 inline-block"
                >
                  {c.name}
                </p>
              );
            })}
          </>
        );
      },
    }),
    columnHelper.accessor("_id", {
      header: "Action",
      cell: ({ row }) => {
        return (
          <div className="flex gap-4 justify-center items-center">
            <button
              onClick={() => {
                setOpenEditSubCategory(true);
                setEditSubCategoryData(row.original);
              }}
              className="p-2 bg-green-100 rounded text-green-500  hover:text-green-600"
            >
              <HiPencil size={20} />
            </button>
            <button
              onClick={() => {
                setOpenDeleteConfirmBox(true);
                setDeleteSubCategory(row.original);
              }}
              className="p-2 bg-red-100 rounded text-red-500 hover:text-red-800"
            >
              <MdDelete size={20} />
            </button>
          </div>
        );
      },
    }),
  ];

  const handleDeleteSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApis.deleteSubCategory,
        data: deleteSubCategory,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        fetchSubCategory();
        setOpenDeleteConfirmBox(false);
        setDeleteSubCategory({
          _id: "",
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

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
      <div className="overflow-auto w-full max-w-[95vw]">
        <DisplayTable data={subCategoryData} column={column} />
      </div>
      {openUploadSubCategory && (
        <UploadSubCategoryModel
          close={() => setOpenUploadSubCategory(false)}
          fetchData={fetchSubCategory}
        />
      )}
      {ImageURL && <ViewImage url={ImageURL} close={() => setImageURL("")} />}
      {openEditSubCategory && (
        <EditSubCategory
          data={editSubCategoryData}
          close={() => setOpenEditSubCategory(false)}
          fetchData={fetchSubCategory}
        />
      )}
      {openDeleteConfirmBox && (
        <ConfirmBox
          cancel={() => setOpenDeleteConfirmBox(false)}
          close={() => setOpenDeleteConfirmBox(false)}
          confirm={handleDeleteSubCategory}
        />
      )}
    </section>
  );
};

export default SubCategory;
