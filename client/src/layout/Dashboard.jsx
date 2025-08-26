import React from "react";
import UserMenu from "../components/UserMenu";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <section className="bg-white">
      <div className="container mx-auto p-4 grid lg:grid-cols-[250px_1fr] ">
        {/* Sidebar */}
        <div className="py-4 sticky top-24 overflow-y-auto hidden lg:block">
          <UserMenu />
        </div>
        {/* Content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
