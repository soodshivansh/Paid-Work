import React from "react";
import { Link, Outlet } from "react-router-dom";

const AdminPanel = () => {
  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col items-center pt-20">
      <div className="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
          Admin Panel
        </h1>
        <nav className="flex justify-center gap-6 mb-8">
          <Link
            to="/admin/pets"
            className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-all shadow-md"
          >
            Pets
          </Link>
          <Link
            to="/admin/users"
            className="px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-all shadow-md"
          >
            Users
          </Link>
        </nav>
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
