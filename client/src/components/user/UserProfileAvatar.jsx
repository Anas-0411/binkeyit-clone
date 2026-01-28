import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../../utils/Axios";
import SummaryApis from "../../api/SummaryApis";
import toast from "react-hot-toast";
import AxiosToastError from "../../utils/AxiosToastError";
import { updateAvatar } from "../../store/slice/userSlice";
import { IoClose } from "react-icons/io5";

const UserProfileAvatar = ({ close }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleUploadAvatar = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("avatar", file);
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApis.uploadAvatar,
        data: formData,
      });
      // console.log(response);

      // both will work
      if (response.data.success) {
        dispatch(updateAvatar(response.data.data.avatar));
        toast.success(response.data.message);
      }
      // const { data: responseData } = response;
      // dispatch(updateAvatar(responseData.data.avatar));
      // toast.success(response.data.message);
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <section className="fixed inset-0 bg-neutral-700/60 p-4 flex items-center justify-center">
      <div className="bg-white max-w-sm w-full rounded p-4 flex flex-col items-center justify-center">
        <button
          onClick={close}
          className="text-neutral-800 w-fit block ml-auto cursor-pointer"
        >
          <IoClose size={20} />
        </button>
        <div className="w-20 h-20 bg-slate-400 flex items-center justify-center rounded-full overflow-hidden">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full" />
          ) : (
            <FaUser size={60} />
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="uploadProfile">
            <div className="text-sm min-w-20 px-3 py-1 mt-3 border bg-blue-500 text-white rounded-full cursor-pointer">
              {loading ? "Uploading..." : "Upload New Avatar"}
            </div>
          </label>
          <input
            type="file"
            id="uploadProfile"
            className="hidden"
            onChange={handleUploadAvatar}
          />
        </form>
      </div>
    </section>
  );
};

export default UserProfileAvatar;
