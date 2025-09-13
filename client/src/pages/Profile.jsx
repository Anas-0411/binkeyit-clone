import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import UserProfileAvatar from "../components/UserProfileAvatar";
import Axios from "../utils/Axios";
import toast from "react-hot-toast";
import SummaryApis from "../common/SummaryApis";
import AxiosToastError from "../utils/AxiosToastError";
import { setUserDetails } from "../store/userSlice";
import fetchUserDetails from "../utils/fetchUserDetails";

const Profile = () => {
  const user = useSelector((state) => state.user);
  // console.log(user);
  const [openUserProfile, setOpenUserProfile] = useState(false);
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
  });
  const [update, setUpdate] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setUserData({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
    });
  }, [user]);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUpdate(true);
      const response = await Axios({
        ...SummaryApis.updateProfile,
        data: userData,
      });
      if (response.data.success) {
        const userDetails = await fetchUserDetails();
        dispatch(setUserDetails(userDetails.data));
        toast.success(response.data.message);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setUpdate(false);
    }
  };
  return (
    <>
      {/* uploading avatar */}
      <div className="py-4 flex flex-col items-center justify-center">
        <div className="w-20 h-20 bg-slate-400 rounded-full overflow-hidden">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full" />
          ) : (
            <FaUser size={60} />
          )}
        </div>
        <button
          onClick={() => setOpenUserProfile(true)}
          className="text-sm min-w-20 px-3 py-1 mt-3 border bg-blue-500 text-white rounded-full cursor-pointer"
        >
          Change Avatar
        </button>
        {openUserProfile && (
          <UserProfileAvatar close={() => setOpenUserProfile(false)} />
        )}
      </div>
      {/* editing user details */}
      <div className="max-w-md mx-auto">
        <form className="my-4" onSubmit={handleSubmit}>
          <div className="grid">
            <label htmlFor="name" className="text-lg font-medium">
              Name:
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              defaultValue={userData.name}
              id="name"
              name="name"
              className="p-2 bg-blue-50 outline-none border-2 focus-within:border-yellow-600 rounded"
              onChange={handleOnChange}
              autoComplete="off"
            />
          </div>
          <div className="grid">
            <label htmlFor="email" className="text-lg font-medium">
              Email:
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              defaultValue={userData.email}
              id="email"
              name="email"
              className="p-2 bg-blue-50 outline-none border-2 focus-within:border-yellow-600 rounded"
              onChange={handleOnChange}
              autoComplete="off"
            />
          </div>
          <div className="grid">
            <label htmlFor="mobile" className="text-lg font-medium">
              Mobile:
            </label>
            <input
              type="text"
              placeholder="Enter your mobile number"
              id="mobile"
              defaultValue={userData.mobile}
              name="mobile"
              className="p-2 bg-blue-50 outline-none border-2 focus-within:border-yellow-600 rounded"
              onChange={handleOnChange}
              autoComplete="off"
            />
          </div>
          <button className="border-2 px-4 py-2 my-4 flex items-center justify-center mx-auto bg-yellow-500 text-white rounded hover:bg-yellow-600 cursor-pointer">
            {update ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Profile;
