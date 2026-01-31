import React from "react";
import { NavLink } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import logo from "../../public/logo.png";

const Footer = () => {
    return (
        <footer className="px-6 md:px-16 lg:px-24 xl:px-32 w-full text-sm text-slate-600 bg-[#FFF7ED] pt-8 pb-6">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                {/* Logo & About */}
                <div>
                    <NavLink to="/home">
                        <img src={logo} alt="Restaurant Logo" className="w-32 mb-3" />
                    </NavLink>

                    <p className="leading-6 text-sm mb-4">
                        Our Restaurant Management System helps streamline orders,
                        billing, inventory, and table reservations.
                    </p>

                    {/* Social Media Icons (Desktop Only) */}
                    <div className="hidden md:flex space-x-4">
                        <a
                            href="https://www.facebook.com/techsuryaitsolution"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white p-2 rounded-full shadow hover:bg-red-600 hover:text-white transition duration-300"
                        >
                            <FaFacebookF size={14} />
                        </a>

                        <a
                            href="https://www.instagram.com/techsuryait/?hl=en"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white p-2 rounded-full shadow hover:bg-red-600 hover:text-white transition duration-300"
                        >
                            <FaInstagram size={14} />
                        </a>

                        <a
                            href="#"
                            className="bg-white p-2 rounded-full shadow hover:bg-red-600 hover:text-white transition duration-300"
                        >
                            <FaTwitter size={14} />
                        </a>

                        <a
                            href="https://linkedin.com/in/tech-surya-it-solution-13379b34a"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white p-2 rounded-full shadow hover:bg-red-600 hover:text-white transition duration-300"
                        >
                            <FaLinkedinIn size={14} />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h2 className="font-semibold text-gray-800 mb-4">Quick Links</h2>
                    <div className="flex flex-col space-y-2">
                        <NavLink to="/home" className="hover:text-red-600 transition">Home</NavLink>
                        <NavLink to="/menu" className="hover:text-red-600 transition">Menu</NavLink>
                        <NavLink to="/book-table" className="hover:text-red-600 transition">Reservations</NavLink>
                        <NavLink to="/contact" className="hover:text-red-600 transition">Contact Us</NavLink>
                    </div>
                </div>

                {/* Contact Info */}
                <div>
                    <h2 className="font-semibold text-gray-800 mb-4">Contact</h2>
                    <div className="space-y-1">
                        <p>📍 123 Food Street, Mumbai, India</p>
                        <p>📞 +91 98765 43210</p>
                        <p>📧 info@restaurant.com</p>
                    </div>
                </div>

                {/* Opening Hours */}
                <div>
                    <h2 className="font-semibold text-gray-800 mb-4">Opening Hours</h2>
                    <div className="space-y-1">
                        <p>Mon - Fri: 10:00 AM - 11:00 PM</p>
                        <p>Sat: 9:00 AM - 12:00 AM</p>
                        <p>Sun: 9:00 AM - 10:00 PM</p>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-slate-200 mt-8 pt-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">

                <p className="mb-3 md:mb-0">
                    &copy; {new Date().getFullYear()} Chilli And Chaat Restaurant. All Rights Reserved.
                </p>

                {/* Social Icons (Mobile Only) */}
                <div className="flex md:hidden space-x-4 mb-3">
                    <a
                        href="https://www.facebook.com/techsuryaitsolution"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white p-2 rounded-full shadow hover:bg-red-600 hover:text-white transition duration-300"
                    >
                        <FaFacebookF size={14} />
                    </a>

                    <a
                        href="https://www.instagram.com/techsuryait/?hl=en"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white p-2 rounded-full shadow hover:bg-red-600 hover:text-white transition duration-300"
                    >
                        <FaInstagram size={14} />
                    </a>

                    <a
                        href="#"
                        className="bg-white p-2 rounded-full shadow hover:bg-red-600 hover:text-white transition duration-300"
                    >
                        <FaTwitter size={14} />
                    </a>

                    <a
                        href="https://linkedin.com/in/tech-surya-it-solution-13379b34a"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white p-2 rounded-full shadow hover:bg-red-600 hover:text-white transition duration-300"
                    >
                        <FaLinkedinIn size={14} />
                    </a>
                </div>

                <p>
                    Design & Developed by
                    <span className="font-semibold text-gray-700 ml-1">
                       <a href="https://techsuryaitsolution.com/"> Tech Surya IT Solutions </a>
                    </span>
                </p>

            </div>

        </footer>
    );
};

export default Footer;
