import React from "react";
import UserMenu from "../components/user/UserMenu.jsx";
import { Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";

const Dashboard = () => {
  // const user = useSelector((state) => state.user);
  // console.log("user dashboard details", user);
  return (
    <section className="bg-white">
      <div className="container mx-auto p-4 grid lg:grid-cols-[250px_1fr] ">
        {/* Sidebar */}
        <div className="py-4 sticky top-24 max-h-[calc(100vh-200px)] overflow-y-auto hidden lg:block border-r-2">
          <UserMenu />
        </div>
        {/* Content */}
        <div className="min-h-[70vh]">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
