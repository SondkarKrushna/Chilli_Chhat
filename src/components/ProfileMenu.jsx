import React, { useState, useRef, useEffect } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useLogout } from "../store/slices/logout/logout";

const ProfileMenu = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const logout = useLogout();

  const name = localStorage.getItem("name") || "";
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");

  const firstLetter = name.charAt(0).toUpperCase();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!name) return null;

  return (
    <div className="relative" ref={menuRef}>
      {/* NAVBAR PROFILE BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full bg-amber-600 text-white font-semibold text-lg flex items-center justify-center hover:bg-amber-700 transition"
      >
        {firstLetter}
      </button>

      {/* DROPDOWN CARD */}
      {open && (
        <div className="absolute right-0 mt-4 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden">
          
          {/* HEADER */}
          <div className="flex items-center gap-4 px-5 py-4 bg-amber-50">
            <div className="w-14 h-14 rounded-full bg-amber-600 text-white text-xl font-bold flex items-center justify-center">
              {firstLetter}
            </div>

            <div>
              <p className="font-semibold text-gray-800 leading-tight">
                {name}
              </p>
              <p className="text-sm text-gray-500 truncate max-w-[170px]">
                {email}
              </p>
            </div>
          </div>

          {/* BODY */}
          <div className="px-5 py-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Role</span>
              <span className="text-xs px-3 py-1 rounded-full bg-amber-100 text-amber-700 font-medium">
                {role?.toUpperCase()}
              </span>
            </div>
          </div>

          {/* FOOTER */}
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-3 px-5 py-3 text-red-600 hover:bg-red-50 transition font-medium"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
