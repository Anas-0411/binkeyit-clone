import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImageUtils from "../../utils/uploadImageUtils";
import Loading from "../../components/common/Loading";
import ViewImage from "../../components/common/ViewImage";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import AddFieldComponent from "../../components/admin/AddFieldComponent";
import AxiosToastError from "../../utils/AxiosToastError";
import Axios from "../../utils/Axios";
import SummaryApis from "../../api/SummaryApis";
import successAlert from "../../utils/SuccessAlert";

const UploadProduct = () => {
  // component state
  const [data, setData] = useState({
    name: "",
    image: [],
    category: [],
    subCategory: [],
    unit: "",
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_details: {},
    // publish: true,
  });
  const [imageLoading, setImageLoading] = useState(false);
  const [openImageView, setOpenImageView] = useState(false);
  const [selectCategory, setSelectCategory] = useState("");
  const [selectSubCategory, setSelectSubCategory] = useState("");
  const [fieldName, setFieldName] = useState([]);
  const [openAddMoreField, setOpenAddMoreField] = useState(false);
  const [loading, setLoading] = useState(false);

  // redux store data
  const allCategory = useSelector((state) => state.product.allCategory);
  const allSubCategory = useSelector((state) => state.product.allSubCategory);

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  // handle image upload
  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    setImageLoading(true);
    const response = await uploadImageUtils(file);
    const { data: ImageResponse } = response;
    const imageUrl = ImageResponse.data.url;
    setData((preve) => {
      return {
        ...preve,
        image: [...preve.image, imageUrl],
      };
    });
    setImageLoading(false);
  };

  // handle delete image
  const handleDeleteImage = async (index) => {
    const filteredImage = data.image.filter((img, i) => i !== index);
    setData((preve) => {
      return {
        ...preve,
        image: filteredImage,
      };
    });
  };

  // handle remove category
  const handleRemoveCategory = (index) => {
    const filteredCategory = data.category.filter((c, i) => i !== index);
    setData((preve) => {
      return {
        ...preve,
        category: filteredCategory,
      };
    });
  };

  // handle remove subcategory
  const handleRemoveSubCategory = (index) => {
    const filteredSubCategory = data.subCategory.filter((c, i) => i !== index);
    setData((preve) => {
      return {
        ...preve,
        subCategory: filteredSubCategory,
      };
    });
  };

  // handle add more field
  const handleAddField = () => {
    if (!fieldName) {
      return;
    }
    setData((preve) => {
      return {
        ...preve,
        more_details: {
          ...preve.more_details,
          [fieldName]: "",
        },
      };
    });
    setFieldName("");
    setOpenAddMoreField(false);
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApis.createProduct,
        data: data,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        successAlert(responseData.message);
        setData({
          name: "",
          image: [],
          category: [],
          subCategory: [],
          unit: "",
          stock: "",
          price: "",
          discount: "",
          description: "",
          more_details: {},
        });
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="p-2 bg-white shadow-md flex items-center justify-between">
        <h1 className="font-semibold text-xl">Upload Product</h1>
      </div>
      <div className="grid p-4">
        <form className="grid gap-4" onSubmit={handleSubmit}>
          {/* name */}
          <div className="grid">
            <label htmlFor="name" className="font-medium">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter product name"
              value={data.name}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 border-2 rounded outline-none focus:border-amber-500"
            />
          </div>
          {/* description */}
          <div className="grid">
            <label htmlFor="description" className="font-medium">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter product description"
              value={data.description}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 border-2 rounded outline-none focus:border-amber-500 resize-none"
            />
          </div>
          {/* image */}
          <div className="grid">
            <p className="font-medium">Image:</p>
            <div>
              <label
                htmlFor="productImage"
                className="border-2 bg-blue-50 h-25 rounded flex justify-center items-center cursor-pointer hover:border-amber-500"
              >
                <div className="flex flex-col justify-center items-center">
                  {imageLoading ? (
                    <Loading />
                  ) : (
                    <>
                      {" "}
                      <FaCloudUploadAlt size={35} />
                      <p>Click to upload product image</p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  id="productImage"
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handleUploadImage}
                />
              </label>
              {/* display uploaded image */}
              <div className="py-2 flex flex-wrap gap-2">
                {data.image.map((img, index) => {
                  return (
                    <div
                      key={img + index}
                      className="h-20 w-20 min-w-20 bg-blue-50 border relative group"
                    >
                      <img
                        src={img}
                        alt={img}
                        className="w-full h-full object-scale-down cursor-pointer"
                        onClick={() => setOpenImageView(img)}
                      />
                      <div
                        className="absolute bottom-0 right-0 p-1 bg-red-500  rounded cursor-pointer hover:bg-red-600 text-white hidden group-hover:block"
                        onClick={() => handleDeleteImage(index)}
                      >
                        <MdDelete />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* category */}
          <div className="grid">
            <label htmlFor="category" className="font-medium">
              Category:
            </label>
            {/*select category**/}
            <div>
              <select
                className="w-full bg-blue-50 p-2 outline-none border-2 rounded focus:border-amber-500 cursor-pointer"
                value={selectCategory}
                onChange={(e) => {
                  const value = e.target.value;
                  const category = allCategory.find((el) => el._id === value);
                  setData((preve) => {
                    return {
                      ...preve,
                      category: [...preve.category, category],
                    };
                  });
                  setSelectCategory("");
                }}
              >
                <option value={""}>--Select Category--</option>
                {[...allCategory]
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((category) => {
                    return (
                      <option value={category?._id} key={category?._id}>
                        {category?.name}
                      </option>
                    );
                  })}
              </select>
              {/* display selected category */}
              <div className="py-2 flex flex-wrap gap-2">
                {[...data.category]
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((c, index) => (
                    <div
                      key={c._id + index + "subcategory"}
                      className="text-sm flex items-center gap-1 bg-blue-50 px-2 py-1 rounded "
                    >
                      {c?.name}
                      <div
                        className="hover:text-red-600 cursor-pointer"
                        onClick={() => handleRemoveCategory(index)}
                      >
                        <IoClose size={20} />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {/* sub-category */}
          <div className="grid">
            <label htmlFor="subcategory" className="font-medium">
              Sub Category:
            </label>
            {/*select subcategory**/}
            <div>
              <select
                className="w-full bg-blue-50 p-2 outline-none border-2 rounded focus:border-amber-500 cursor-pointer"
                value={selectSubCategory}
                onChange={(e) => {
                  const value = e.target.value;
                  const subCategory = allSubCategory.find(
                    (el) => el._id === value,
                  );
                  setData((preve) => {
                    return {
                      ...preve,
                      subCategory: [...preve.subCategory, subCategory],
                    };
                  });
                  setSelectSubCategory("");
                }}
              >
                <option value={""}>--Select Sub Category--</option>
                {[...allSubCategory]
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((subCategory) => (
                    <option value={subCategory?._id} key={subCategory?._id}>
                      {subCategory?.name}
                    </option>
                  ))}
              </select>
              {/* display selected subcategory */}
              <div className="py-2 flex flex-wrap gap-2">
                {[...data.subCategory]
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((c, index) => (
                    <div
                      key={c._id + index + "subcategory"}
                      className="text-sm flex items-center gap-1 bg-blue-50 px-2 py-1 rounded"
                    >
                      {c?.name}
                      <div
                        className="hover:text-red-600 cursor-pointer"
                        onClick={() => handleRemoveSubCategory(index)}
                      >
                        <IoClose size={20} />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {/* unit */}
          <div className="grid">
            <label htmlFor="unit" className="font-medium">
              Unit:
            </label>
            <input
              type="text"
              id="unit"
              name="unit"
              placeholder="Enter product unit"
              value={data.unit}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 border-2 rounded outline-none focus:border-amber-500"
            />
          </div>
          {/* stock */}
          <div className="grid">
            <label htmlFor="stock" className="font-medium">
              Stock:
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              placeholder="Enter product stock"
              value={data.stock}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 border-2 rounded outline-none focus:border-amber-500"
            />
          </div>
          {/* price */}
          <div className="grid">
            <label htmlFor="price" className="font-medium">
              Price:
            </label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Enter product price"
              value={data.price}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 border-2 rounded outline-none focus:border-amber-500"
            />
          </div>
          {/* discount */}
          <div className="grid">
            <label htmlFor="discount" className="font-medium">
              Discount (%):
            </label>
            <input
              type="number"
              id="discount"
              name="discount"
              placeholder="Enter product discount"
              value={data.discount}
              onChange={handleChange}
              className="bg-blue-50 p-2 border-2 rounded outline-none focus:border-amber-500"
            />
          </div>
          {/* add more fields */}
          <div className="grid gap-2">
            {Object?.keys(data?.more_details)?.map((field, index) => (
              <div key={field + index} className="grid">
                <label htmlFor={field} className="font-medium">
                  {field}:
                </label>
                <input
                  type="text"
                  id={field}
                  name={field}
                  placeholder={`Enter ${field}`}
                  value={data?.more_details[field]}
                  onChange={handleChange}
                  className="bg-blue-50 p-2 border-2 rounded outline-none focus:border-amber-500"
                />
              </div>
            ))}
          </div>
          {/* add more fields button */}
          <div
            className="inline-block bg-white  font-medium py-1 px-3 w-40 text-center rounded cursor-pointer hover:bg-yellow-500 hover:text-white transition border-2 border-yellow-500"
            onClick={() => setOpenAddMoreField(true)}
          >
            Add More Fields
          </div>
          {/* submit button */}
          <button
            type="submit"
            className="bg-yellow-500 px-4 py-2 rounded text-white mx-auto w-fit block mt-4 hover:bg-yellow-600 transition cursor-pointer font-medium"
          >
            {loading ? <Loading /> : "Upload Product"}
          </button>
        </form>
      </div>
      {openImageView && (
        <ViewImage url={openImageView} close={() => setOpenImageView("")} />
      )}
      {openAddMoreField && (
        <AddFieldComponent
          value={fieldName}
          onChange={(e) => setFieldName(e.target.value)}
          submit={handleAddField}
          close={() => setOpenAddMoreField(false)}
        />
      )}
    </section>
  );
};

export default UploadProduct;
