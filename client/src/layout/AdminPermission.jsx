import React from "react";
import { useSelector } from "react-redux";
import isAdmin from "../utils/isAdmin";
import noAccess from "../assets/images/access denied.webp";

const AdminPermission = ({ children }) => {
  const user = useSelector((state) => state.user);
  return (
    <div>
      {isAdmin(user.role) ? (
        children
      ) : (
        <div className="flex flex-col justify-center items-center p-18 g-18">
          <img src={noAccess} alt="Access Denied" className="w-90" />
        </div>
      )}
    </div>
  );
};

export default AdminPermission;
