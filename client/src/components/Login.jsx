import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import UserMenu from "./UserMenu";

const Login = () => {
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const navigate = useNavigate();
  const redirectToLoginPage = () => {
    navigate("/login");
  };

  const handleCloseUserMenu = () => {
    setOpenUserMenu(false);
  };

  const user = useSelector((state) => state?.user);
  console.log("user from store", user);
  return (
    <div>
      {/* display only in mobile version */}
      <button
        className="text-neutral-600 lg:hidden"
        onClick={redirectToLoginPage}
        aria-label="User Profile"
      >
        <FaRegUserCircle size={26} />
      </button>
      {/* display only in desktop version */}
      <div className="hidden lg:flex items-center gap-10">
        {user?._id ? (
          <div className="relative">
            <div
              className="flex items-center gap-1 cursor-pointer select-none"
              onClick={() => setOpenUserMenu((preve) => !preve)}
            >
              <FaUser size={20} className="text-green-700" />
              <p className="font-semibold">{user.name || user.mobile}</p>
              {openUserMenu ? (
                <GoTriangleUp size={25} />
              ) : (
                <GoTriangleDown size={25} />
              )}
            </div>
            {openUserMenu && (
              <div className="absolute right-0 top-12">
                <div className="bg-white rounded p-4 min-w-52 lg:shadow-lg">
                  <UserMenu close={handleCloseUserMenu} />
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={redirectToLoginPage}
            className="text-lg p-4 text-green-700 font-semibold cursor-pointer"
          >
            Login
          </button>
        )}

        <button className="flex items-center gap-2 bg-green-700 hover:bg-green-800 px-4 py-2 rounded text-white">
          {/* add to cart button */}
          <div className="animate-bounce">
            <FaCartShopping size={26} />
          </div>
          <div className="font-bold">
            <p>My Cart</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Login;
