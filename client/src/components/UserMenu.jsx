import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Axios from "../utils/Axios.js";
import SummaryApis from "../common/SummaryApis";
import { logout } from "../store/userSlice.js";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError.js";

const UserMenu = ({ close }) => {
  // const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const response = await Axios({
        ...SummaryApis.logout,
      });
      if (response.data.success) {
        close();
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div>
      {/* <div className="font-semibold">My Account</div> */}
      {/* <div className="font-semibold">{user.name || user.mobile}</div> */}
      <div className="text-lg grid text-center gap-2">
        <Link to={"/profile"} className="hover:bg-green-600 hover:text-white">
          My Profile
        </Link>
        <Link to={""} className="hover:bg-yellow-500 hover:text-white">
          My Orders
        </Link>
        <button
          className="bg-red-600 text-white cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
