import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto py-4 px-4 text-center flex flex-col lg:flex-row lg:justify-between gap-2">
        <p className="text-gray-600">
          &copy; 2025 BinkeyIt. All rights reserved.
        </p>
        <div className="flex items-center gap-5 justify-center text-2xl">
          <a href="#" className="text-blue-600 hover:text-blue-800">
            <FaFacebook />
          </a>
          <a href="#" className="text-pink-600 hover:text-pink-800">
            <FaInstagram />
          </a>
          <a href="#" className="text-green-600 hover:text-green-800">
            <FaWhatsapp />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
