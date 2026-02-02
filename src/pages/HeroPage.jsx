import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Offers from "../components/Offers1";
import Loader from "../components/Loader";
import hero from "../../public/indianFood.jpg";
import mobile from "../../public/mobile_indian_food.jpeg";
import review from "../../public/review.png";

// ✅ Move animations outside component (better performance)
const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const fadeUp = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const HeroPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Home Page | Restaurant Management System";

    // Loader for smooth entry
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const role = localStorage.getItem("role");

  // ✅ Show Loader First
  if (loading) return <Loader />;

  return (
    <>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-screen overflow-hidden"
      >
        {/* Desktop Background */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 6 }}
          className="hidden sm:block absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${hero})` }}
        />

        {/* Mobile Background */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 6 }}
          className="block sm:hidden absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${mobile})` }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Hero Content */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4"
        >
          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            <span className="font-satisfy">
              Welcome to Chili and Chaat
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl max-w-2xl mb-6 text-gray-200"
          >
            Simplify restaurant ordering with a fast, digital waiter system.
            Take orders, manage tables, and serve customers efficiently.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={fadeUp}
            className="flex gap-4 max-sm:flex-col max-sm:w-full max-sm:items-center"
          >
            {/* Show Only For Waiter */}
            {role === "waiter" && (
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/waiter")}
                className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg shadow-lg transition"
              >
                Take Order
              </motion.button>
            )}

            {/* View Menu Button */}
            {(role === "admin" || role === "waiter") && (
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/menu")}
                className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-black transition"
              >
                View Menu
              </motion.button>
            )}
          </motion.div>

          {/* Review Card */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
            whileHover={{ scale: 1.05 }}
            className="absolute bottom-24 right-8 max-sm:static max-sm:mt-10"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
              }}
              onClick={() => navigate("/Testimonials")}
              className="rounded-3xl bg-gradient-to-b from-[#CFA24D]/70 via-[#8B5A2B]/60 to-[#1C1C1C]/90 backdrop-blur-md text-white p-5 shadow-2xl border border-white/10 max-sm:w-64 max-sm:mx-auto cursor-pointer"
            >
              <img
                src={review}
                className="object-contain w-2/3 mx-auto mb-3"
                alt="Customer reviews"
              />
              <h1 className="text-2xl font-semibold text-left mb-1 font-poppins">
                Trusted By
              </h1>
              <p className="text-lg text-center text-[#FFF6E5]">
                Our 2600+ Happy Customers
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Offers Section */}
      <Offers />
    </>
  );
};

export default HeroPage;
