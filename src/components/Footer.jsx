import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import logo from "../../public/logo.png";

const Footer = () => {
  //Animation varient
  const container = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 15 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.footer
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="bg-[#FFF7ED] text-slate-600 px-6 md:px-16 lg:px-24 xl:px-32 pt-12 pb-6"
    >
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Logo & About */}
        <motion.div variants={item}>
          <NavLink to="/home">
            <img src={logo} alt="Restaurant Logo" className="w-36 mb-4" />
          </NavLink>

          <p className="text-sm leading-6 mb-6">
            Our Restaurant Management System helps streamline orders,
            billing, inventory, and table reservations — making your
            restaurant smarter and faster.
          </p>

          <div className="hidden md:flex space-x-3">
            {[
              { icon: <FaFacebookF />, link: "https://www.facebook.com/techsuryaitsolution" },
              { icon: <FaInstagram />, link: "https://www.instagram.com/techsuryait/?hl=en" },
              { icon: <FaTwitter />, link: "#" },
              { icon: <FaLinkedinIn />, link: "https://linkedin.com/in/tech-surya-it-solution-13379b34a" },
            ].map((item, index) => (
              <motion.a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="w-9 h-9 flex items-center justify-center bg-white rounded-full shadow-sm hover:bg-red-600 hover:text-white transition duration-300"
              >
                {item.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div variants={item}>
          <h2 className="text-gray-800 font-semibold text-lg mb-4 border-b border-red-200 pb-2">
            Quick Links
          </h2>

          <div className="flex flex-col space-y-3 text-sm">
            <NavLink to="/home" className="hover:text-red-600 transition">
              Home
            </NavLink>
            <NavLink to="/menu" className="hover:text-red-600 transition">
              Menu
            </NavLink>
            <NavLink to="/book-table" className="hover:text-red-600 transition">
              Reservations
            </NavLink>
            <NavLink to="/contact" className="hover:text-red-600 transition">
              Contact Us
            </NavLink>
          </div>
        </motion.div>

        {/* Contact Info */}
        <motion.div variants={item}>
          <h2 className="text-gray-800 font-semibold text-lg mb-4 border-b border-red-200 pb-2">
            Contact Info
          </h2>

          <div className="space-y-3 text-sm">
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-red-500" />
              123 Food Street, Mumbai, India
            </p>

            <p className="flex items-center gap-2">
              <FaPhoneAlt className="text-red-500" />
              +91 98765 43210
            </p>

            <p className="flex items-center gap-2">
              <FaEnvelope className="text-red-500" />
              info@restaurant.com
            </p>
          </div>
        </motion.div>

        {/* Opening Hours */}
        <motion.div variants={item}>
          <h2 className="text-gray-800 font-semibold text-lg mb-4 border-b border-red-200 pb-2">
            Opening Hours
          </h2>

          <div className="space-y-3 text-sm">
            <p>Mon - Fri: 10:00 AM - 11:00 PM</p>
            <p>Sat: 9:00 AM - 12:00 AM</p>
            <p>Sun: 9:00 AM - 10:00 PM</p>
          </div>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <motion.div
        variants={item}
        className="border-t border-slate-200 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500"
      >
        {/* Social Icons - Mobile */}
        <div className="flex md:hidden space-x-3 mb-4">
          {[
            { icon: <FaFacebookF />, link: "https://www.facebook.com/techsuryaitsolution" },
            { icon: <FaInstagram />, link: "https://www.instagram.com/techsuryait/?hl=en" },
            { icon: <FaTwitter />, link: "#" },
            { icon: <FaLinkedinIn />, link: "https://linkedin.com/in/tech-surya-it-solution-13379b34a" },
          ].map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="w-9 h-9 flex items-center justify-center bg-white rounded-full shadow-sm hover:bg-red-600 hover:text-white transition duration-300"
            >
              {item.icon}
            </motion.a>
          ))}
        </div>

        <p className="mb-3 md:mb-0 text-center">
          &copy; {new Date().getFullYear()} Chilli And Chaat Restaurant.
          All Rights Reserved.
        </p>

        <p className="text-center">
          Designed & Developed by
          <a
            href="https://techsuryaitsolution.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-gray-700 ml-1 hover:text-red-600 transition"
          >
            Tech Surya IT Solutions
          </a>
        </p>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
