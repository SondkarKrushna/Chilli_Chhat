import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import food1 from "../../public/aboutDishes.jpg";
import food2 from "../../public/aboutDishes1.jpg";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const WhyDineWithUs = () => {
  useEffect(() => {
    document.title = "About Chilli Chaat | Restaurant Management System";
  }, []);

  const navigate = useNavigate();

  return (
    <section className="bg-white py-16 max-sm:py-12 overflow-hidden">

      {/* Heading */}
      <motion.div
        className="text-center max-w-2xl mx-auto mb-12 max-sm:mb-8 px-4"
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-brown-800 max-sm:text-2xl">
          Why Dine with Us?
        </h2>
        <p className="text-gray-600 mt-3 max-sm:text-sm">
          From classic favorites to modern culinary creations, our menu is
          designed to tantalize your taste buds. Every dish is made with the
          freshest ingredients and an extra dash of love.
        </p>
      </motion.div>

      {/* Cards Grid */}
      <motion.div
        className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 max-sm:grid-cols-1 max-sm:gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Card 1 - Image */}
        <motion.div
          variants={fadeUp}
          whileHover={{ scale: 1.05, rotate: 1 }}
          className="bg-indigo-50 rounded-3xl p-6 flex items-center justify-center max-sm:p-4 transition-all"
        >
          <motion.img
            src={food1}
            alt="Food"
            className="rounded-2xl shadow-lg rotate-[-5deg] max-sm:rotate-0 max-sm:max-w-full"
            whileHover={{ rotate: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
          />
        </motion.div>

        {/* Card 2 - Content */}
        <motion.div
          variants={fadeUp}
          whileHover={{ scale: 1.03 }}
          className="bg-indigo-50 rounded-3xl p-10 flex flex-col justify-center max-sm:p-6 max-sm:text-center"
        >
          <motion.span
            className="text-indigo-600 text-xl mb-2"
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            💙
          </motion.span>

          <h3 className="text-2xl font-bold text-indigo-900 mb-3 max-sm:text-xl">
            Fresh, Locally Sourced Ingredients.
          </h3>

          <p className="text-gray-600 mb-6 max-sm:text-sm">
            We use only the freshest ingredients & traditional recipes to
            ensure each dish is a masterpiece.
          </p>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-orange-500 text-white px-6 py-3 rounded-full w-fit hover:bg-orange-600 transition max-sm:mx-auto"
            onClick={() => navigate("/menu")}
          >
            View Menu →
          </motion.button>
        </motion.div>

        {/* Card 3 - Image */}
        <motion.div
          variants={fadeUp}
          whileHover={{ scale: 1.05 }}
          className="bg-orange-100 rounded-3xl p-6 flex items-center justify-center max-sm:p-4"
        >
          <motion.img
            src={food2}
            alt="Food"
            className="rounded-2xl shadow-lg max-sm:max-w-full"
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 200 }}
          />
        </motion.div>

        {/* Card 4 - Content */}
        <motion.div
          variants={fadeUp}
          whileHover={{ scale: 1.03 }}
          className="bg-orange-100 rounded-3xl p-10 flex flex-col justify-center max-sm:p-6 max-sm:text-center"
        >
          <motion.span
            className="text-orange-600 text-xl mb-2"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            ✨
          </motion.span>

          <h3 className="text-2xl font-bold text-orange-900 mb-3 max-sm:text-xl">
            Crafted with Passion.
          </h3>

          <p className="text-gray-700 max-sm:text-sm">
            Our chefs bring years of experience and passion to your plate,
            delivering flavors you’ll always remember.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default WhyDineWithUs;
