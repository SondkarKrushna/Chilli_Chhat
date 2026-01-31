import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../public/logo.png";
import ProfileMenu from "./ProfileMenu";
import MobileProfileMenu from "./MobileProfileMenu";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const isLoggedIn = !!localStorage.getItem("token");

  const navItemClass = ({ isActive }) =>
    `cursor-pointer transition ${
      isActive
        ? "text-amber-600 font-semibold"
        : "text-[#3F2A1D] hover:text-amber-600"
    }`;

  return (
    <nav className="bg-[#FFF7ED] text-[#3F2A1D] shadow-sm sticky top-0 z-50 w-full border-b border-amber-100">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* LOGO */}
        <NavLink to="/home" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Restaurant Logo"
            className="w-10 h-10 object-contain"
            onClick={() => navigate("/home")}
          />
          <span
            className="text-lg font-bold tracking-wide"
            onClick={() => navigate("/home")}
          >
            Chili & Chaat
          </span>
        </NavLink>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8 font-medium">
          {/* <NavLink to="/menu" className={navItemClass}>Menu</NavLink> */}
          <NavLink to="/about" className={navItemClass}>About</NavLink>
          <NavLink to="/contact" className={navItemClass}>Contact</NavLink>

          {role === "waiter" && (
            <NavLink
              to="/waiter"
              className="px-4 py-1.5 rounded-full bg-amber-600 text-white hover:bg-amber-700 transition"
            >
              Waiter Panel
            </NavLink>
          )}

          {role === "chef" && (
            <NavLink
              to="/chief"
              className="px-4 py-1.5 rounded-full bg-amber-600 text-white hover:bg-amber-700 transition"
            >
              Chef Panel
            </NavLink>
          )}

          {role === "admin" && (
            <NavLink
              to="/admin"
              className="px-4 py-1.5 rounded-full bg-amber-600 text-white hover:bg-amber-700 transition"
            >
              Admin Panel
            </NavLink>
          )}

          {/* PROFILE BUTTON */}
          {isLoggedIn && <ProfileMenu />}
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className="md:hidden text-xl text-[#3F2A1D]"
          onClick={() => setOpen(!open)}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-[#FFF7ED] px-6 py-4 border-t border-amber-100">
          <ul className="flex flex-col gap-4 font-medium">
            <NavLink to="/about" className={navItemClass} onClick={() => setOpen(false)}>
              About
            </NavLink>
            <NavLink to="/contact" className={navItemClass} onClick={() => setOpen(false)}>
              Contact
            </NavLink>

            {role === "waiter" && (
              <NavLink
                to="/waiter"
                onClick={() => setOpen(false)}
                className="mt-2 text-center px-4 py-2.5 rounded-full bg-amber-600 text-white hover:bg-amber-700"
              >
                Waiter Panel
              </NavLink>
            )}

            {role === "chef" && (
              <NavLink
                to="/chief"
                onClick={() => setOpen(false)}
                className="mt-2 text-center px-4 py-2.5 rounded-full bg-amber-600 text-white hover:bg-amber-700"
              >
                Chef Panel
              </NavLink>
            )}

            {role === "admin" && (
              <NavLink
                to="/admin"
                onClick={() => setOpen(false)}
                className="mt-2 text-center px-4 py-2.5 rounded-full bg-amber-600 text-white hover:bg-amber-700"
              >
                Admin Panel
              </NavLink>
            )}

            {/* PROFILE MENU (MOBILE) */}
            {isLoggedIn && (
              <div className="pt-3 border-t sm:hidden">
                <MobileProfileMenu />
              </div>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
