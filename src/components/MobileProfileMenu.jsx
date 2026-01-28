import React, { useState } from "react";
import { FaUserCircle, FaSignOutAlt, FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MobileProfileMenu = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const name = localStorage.getItem("name") || "User";
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");

    const logoutHandler = () => {
        localStorage.clear();
        navigate("/login");
        window.location.reload();
    };

    return (
        <div className="relative w-full">
            {/* PROFILE BUTTON */}
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-100 text-[#3F2A1D]"
            >
                <FaUserCircle size={28} />
                <div className="text-left">
                    <p className="font-semibold">{name}</p>
                    <p className="font-semibold">{email}</p>
                    <p className="text-xs capitalize text-amber-700">{role}</p>
                </div>
            </button>

            {/* SLIDE-UP MENU */}
            {open && (
                <div className="mt-3 bg-white rounded-2xl shadow-lg border border-amber-100 overflow-hidden">
                    {/* <button
            onClick={() => {
              navigate("/profile");
              setOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-amber-50"
          >
            <FaUserCircle />
            <span>My Profile</span>
          </button> */}

                    <button
                        onClick={logoutHandler}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50"
                    >
                        <FaSignOutAlt />
                        <span>Logout</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default MobileProfileMenu;
