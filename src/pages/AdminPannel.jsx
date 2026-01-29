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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Link
          to="/book-table"
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
        >
          <h2 className="text-lg font-semibold mb-2">🍽️ Table Availability</h2>
          <p className="text-sm text-gray-600">
            Check, add or remove tables
          </p>
        </Link>

        <Link
          to="/menu"
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
        >
          <h2 className="text-lg font-semibold mb-2">📋 Menu Management</h2>
          <p className="text-sm text-gray-600">
            Add or remove menu items
          </p>
        </Link>
      </div>
    </div>
  );
};

export default AdminPanel;
