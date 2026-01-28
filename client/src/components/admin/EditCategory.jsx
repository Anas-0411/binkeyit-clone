import { useState } from "react";
import { IoClose } from "react-icons/io5";
import uploadImageUtils from "../../utils/uploadImageUtils";
import Axios from "../../utils/Axios";
import SummaryApis from "../../api/SummaryApis";
import toast from "react-hot-toast";
import AxiosToastError from "../../utils/AxiosToastError";

const EditCategory = ({ close, fetchData, data: categoryData }) => {
  const [data, setData] = useState({
    _id: categoryData._id,
    name: categoryData.name,
    image: categoryData.image,
  });
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    const response = await uploadImageUtils(file);
    const { data: ImageResponse } = response;
    setLoading(false);
    setData((preve) => {
      return {
        ...preve,
        image: ImageResponse.data.url,
      };
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApis.updateCategory,
        data: data,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        close();
        fetchData();
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="fixed inset-0 p-4 bg-neutral-700/60 flex items-center justify-center">
      <div className="bg-white max-w-5xl w-full p-4 rounded">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-xl">Update Category</h1>
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
                >
                  {loading ? "Uploading..." : "Upload Image"}
                </div>
              </label>
              <input
                disabled={!data.name}
                type="file"
                id="uploadCategoryImage"
                className="hidden"
                onChange={handleUploadCategoryImages}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={!(data.name && data.image)}
            className={`rounded text-white px-4 py-2 transition ${
              data.name && data.image
                ? "bg-amber-400 hover:bg-amber-500 cursor-pointer"
                : "bg-gray-600 cursor-not-allowed opacity-60"
            }`}
          >
            Update Category
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditCategory;
