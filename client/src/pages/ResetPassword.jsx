import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApis from "../common/SummaryApis";
import AxiosToastError from "../utils/AxiosToastError";

const ResetPassword = () => {
  const [data, setData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location?.state?.data?.success) {
      navigate("/");
    }
    if (location?.state?.email) {
      setData((prev) => ({
        ...prev,
        email: location.state.email,
      }));
    }
  }, [location, navigate]);
  // console.log("reset password data", data);

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateFeild = Object.values(data).every((el) => el);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.newPassword !== data.confirmPassword) {
      toast.error("New Password and Confirm Password must be same");
      return;
    }

    try {
      const response = await Axios({
        ...SummaryApis.resetPassword,
        data: data,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
        setData({
          email: "",
          newPassword: "",
          confirmPassword: "",
        });
      }

      // console.log("response", response);
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="container w-full mx-auto px-4">
      <div className="container bg-white my-4 w-full max-w-lg mx-auto rounded p-8">
        <p className="text-center font-bold ">Reset Your Password</p>
        <form className="grid gap-2 mt-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <label htmlFor="newPassword">New Password:</label>
            <div className="bg-blue-50 p-2 border-2 rounded flex items-center focus-within:border-amber-500">
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                className="w-full outline-none"
                name="newPassword"
                value={data.newPassword}
                onChange={handleChange}
                placeholder="Enter your new password"
              />
              <div
                className="cursor-pointer"
                onClick={() => setShowNewPassword((preve) => !preve)}
              >
                {showNewPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
          </div>

          <div className="grid gap-2">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <div className="bg-blue-50 p-2 border-2 rounded flex items-center focus-within:border-amber-500">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                className="w-full outline-none"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
                placeholder="Enter your confirm password"
              />
              <div
                className="cursor-pointer"
                onClick={() => setShowConfirmPassword((preve) => !preve)}
              >
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
          </div>

          <button
            className={`${
              validateFeild ? "bg-green-600" : "bg-gray-500"
            } text-white px-2 rounded font-semibold h-10 cursor-pointer`}
            disabled={!validateFeild}
          >
            Reset Password
          </button>
        </form>

        <p className="my-2">
          Already have a account?
          <Link
            to={"/login"}
            className="font-semibold text-green-600 hover:text-green-800"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ResetPassword;
