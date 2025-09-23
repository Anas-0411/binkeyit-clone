import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Axios from "../utils/Axios.js";
import SummaryApis from "../common/SummaryApis";
import { logout } from "../store/userSlice.js";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError.js";
import Divider from "./Divider.jsx";
import isAdmin from "../utils/isAdmin.js";

const UserMenu = ({ close }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await Axios({
        ...SummaryApis.logout,
      });
      if (response.data.success) {
        if (close) {
          close();
        }
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  const handleClose = () => {
    if (close) {
      close();
    }
  };

  return (
    <div>
      <div className="font-semibold">
        <span className="text-xl">{user.name || user.mobile}</span>{" "}
        <span className="text-red-600">
          {user.role === "ADMIN" ? "(ADMIN)" : ""}
        </span>
      </div>
      <Divider />
      <div className="text-lg grid text-center gap-2">
        <Link
          to={"/dashboard/profile"}
          onClick={handleClose}
          className="hover:bg-green-600 hover:text-white"
        >
          My Profile
        </Link>
        {isAdmin(user.role) && (
          <Link
            to={"/dashboard/category"}
            onClick={handleClose}
            className="hover:bg-yellow-500 hover:text-white"
          >
            Category
          </Link>
        )}
        {isAdmin(user.role) && (
          <Link
            to={"/dashboard/sub-category"}
            onClick={handleClose}
            className="hover:bg-yellow-500 hover:text-white"
          >
            Sub Category
          </Link>
        )}
        {isAdmin(user.role) && (
          <Link
            to={"/dashboard/upload-product"}
            onClick={handleClose}
            className="hover:bg-yellow-500 hover:text-white"
          >
            Upload Product
          </Link>
        )}
        {isAdmin(user.role) && (
          <Link
            to={"/dashboard/product"}
            onClick={handleClose}
            className="hover:bg-yellow-500 hover:text-white"
          >
            Product
          </Link>
        )}
        <Link
          to={"/dashboard/myorders"}
          onClick={handleClose}
          className="hover:bg-yellow-500 hover:text-white"
        >
          My Orders
        </Link>
        <Link
          to={"/dashboard/address"}
          onClick={handleClose}
          className="hover:bg-yellow-500 hover:text-white"
        >
          Save Address
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
