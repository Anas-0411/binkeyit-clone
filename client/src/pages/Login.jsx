import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApis from "../common/SummaryApis";
import AxiosToastError from "../utils/AxiosToastError";
import fetchUserDetails from "../utils/fetchUserDetails";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateFeild = Object.values(data).every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApis.login,
        data: data,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("accesstoken", response.data.data.accessToken);
        localStorage.setItem("refreshtoken", response.data.data.refreshToken);
        const userDetails = await fetchUserDetails();
        dispatch(setUserDetails(userDetails.data));
        setData({
          email: "",
          password: "",
        });
        navigate("/home");
      }
      console.log("response", response);
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="container w-full mx-auto px-4">
      <div className="container bg-white my-4 w-full max-w-lg mx-auto rounded p-8">
        <p className="text-center font-bold ">
          Welcome to <span className="text-yellow-500">Binkey</span>
          <span className="text-green-500">it</span>
        </p>
        <form className="grid gap-2 mt-4 " onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              className="bg-blue-50 p-2  border-2 rounded outline-none focus:border-amber-500"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="password">Password:</label>
            <div className="bg-blue-50 p-2 border-2 rounded flex items-center focus-within:border-amber-500">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full outline-none"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
              <div
                className="cursor-pointer"
                onClick={() => setShowPassword((preve) => !preve)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
            <Link
              to={"/forgot-password"}
              className="block ml-auto hover:text-green-700"
            >
              Forgot password?
            </Link>
          </div>

          <button
            className={`${
              validateFeild ? "bg-green-600" : "bg-gray-500"
            } text-white px-2 rounded font-semibold h-10 cursor-pointer`}
            disabled={!validateFeild}
          >
            Login
          </button>
        </form>

        <p className="my-2">
          Don't have a account?
          <Link
            to={"/register"}
            className="font-semibold text-green-600 hover:text-green-800"
          >
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
