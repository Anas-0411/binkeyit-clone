import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApis from "../common/SummaryApis";
import AxiosToastError from "../utils/AxiosToastError";

const OptVerification = () => {
  const [data, setData] = useState(["", "", "", "", "", ""]);
  const inputRef = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to forgot-password if no email in state
  useEffect(() => {
    if (!location?.state?.email) {
      navigate("/forgot-password");
    }
  }, [location, navigate]);

  const validateField = data.every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApis.forgot_password_otp_verification,
        data: {
          otp: data.join(""),
          email: location?.state?.email,
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setData(["", "", "", "", "", ""]);

        // Navigate to reset password page with email
        navigate("/reset-password", {
          state: {
            data: response.data,
            email: location?.state?.email,
          },
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="container w-full mx-auto px-4">
      <div className="container bg-white my-4 w-full max-w-lg mx-auto rounded p-8">
        <p className="text-center font-bold">OTP Verification</p>
        <form className="grid gap-2 mt-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <label htmlFor="otp">Enter your OTP:</label>
            <div className="flex items-center gap-2 justify-between mt-2">
              {data.map((element, index) => {
                return (
                  <input
                    type="text"
                    key={"otp" + index}
                    id={`otp-${index}`}
                    ref={(ref) => {
                      inputRef.current[index] = ref;
                      return ref;
                    }}
                    value={data[index]}
                    maxLength={1}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, ""); // only numbers
                      const newData = [...data];
                      newData[index] = value;
                      setData(newData);

                      // Move to next input if not last
                      if (value && index < data.length - 1) {
                        inputRef.current[index + 1]?.focus();
                      }
                    }}
                    className="bg-blue-50 p-2 w-full max-w-16 border-2 rounded outline-none text-center font-semibold
                    focus:border-amber-500"
                  />
                );
              })}
            </div>
          </div>

          <button
            className={`${
              validateField ? "bg-green-600" : "bg-gray-500"
            } text-white px-2 rounded font-semibold h-10 cursor-pointer`}
            disabled={!validateField}
          >
            Verify OTP
          </button>
        </form>
      </div>
    </section>
  );
};

export default OptVerification;
