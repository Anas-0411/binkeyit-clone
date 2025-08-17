import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApis from "../common/SummaryApis";
import AxiosToastError from "../utils/AxiosToastError";

const ForgotPassword = () => {
  const [data, setData] = useState({
    email: "",
  });

  const navigate = useNavigate();

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
        ...SummaryApis.forgot_password,
        data: data,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/verify-otp", {
          state: data,
        });
        setData({
          email: "",
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
        <p className="text-center font-bold ">Forgot Password</p>
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

          <button
            className={`${
              validateFeild ? "bg-green-600" : "bg-gray-500"
            } text-white px-2 rounded font-semibold h-10 cursor-pointer`}
            disabled={!validateFeild}
          >
            Send Otp
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

export default ForgotPassword;
