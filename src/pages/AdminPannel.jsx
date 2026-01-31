import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const AdminPanel = () => {

  useEffect(() => {
    document.title = "Admin Panel | Restaurant Management System";
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div className="bg-slate-900 text-white p-4 rounded-lg shadow">
        <h1 className="text-xl font-semibold font-lobster">🛠️ Admin Panel</h1>
        <p className="text-sm text-gray-300">
          Manage tables and menu
        </p>
      </div>

      {/* ACTION CARDS */}
      <div className="flex justify-center mt-12">
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
    
    <Link
      to="/book-table"
      className="w-56 h-56 bg-white rounded-2xl shadow-md 
                 hover:shadow-xl hover:scale-105 
                 transition-all duration-300 
                 flex flex-col justify-center items-center text-center"
    >
      <span className="text-4xl mb-3">🍽️</span>
      <h2 className="text-lg font-semibold">Table Availability</h2>
      <p className="text-sm text-gray-500 mt-1">
        Manage tables
      </p>
    </Link>

    <Link
      to="/menu"
      className="w-56 h-56 bg-white rounded-2xl shadow-md 
                 hover:shadow-xl hover:scale-105 
                 transition-all duration-300 
                 flex flex-col justify-center items-center text-center"
    >
      <span className="text-4xl mb-3">📋</span>
      <h2 className="text-lg font-semibold">Menu Management</h2>
      <p className="text-sm text-gray-500 mt-1">
        Manage items
      </p>
    </Link>

  </div>
</div>

    </div>
  );
};

export default AdminPanel;
