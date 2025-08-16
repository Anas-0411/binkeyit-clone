import React from "react";
import logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigation = useNavigate();
  const handleLogoClick = () => {
    navigation("/home");
  };
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 p-2">
      {/* Logo */}
      <div className="cursor-pointer" onClick={handleLogoClick}>
        <img
          src={logo}
          alt="Logo"
          className="hidden lg:block w-[150px] h-auto"
        />
        <img src={logo} alt="Logo" className="lg:hidden w-[100px] h-auto" />
      </div>
    </div>
  );
};

export default Logo;
