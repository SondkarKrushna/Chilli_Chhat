import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import anjali from "../../public/Anjali.jpg";
import ram from "../../public/Ram.jpg";
import pankaj from "../../public/Pankaj.jpg";
import shivani from "../../public/shivani.jpg";
import ramesh from "../../public/Ramesh.jpg";
import sangita from "../../public/Sangita.jpg";

const testimonials = [
  {
    id: 1,
    name: "Anjali Shinde",
    role: "Customer",
    message:
      "Amazing food quality and taste. Every dish was fresh and well-prepared. Definitely one of the best dining experiences I’ve had in a long time.",
    image: anjali,
  },
  {
    id: 2,
    name: "Shivani Thakur",
    role: "Customer",
    message:
      "The staff is very polite and service is quick. Even during peak hours, the management handled everything smoothly.",
    image: shivani,
  },
  {
    id: 3,
    name: "Pankaj Jadhav",
    role: "Customer",
    message:
      "Excellent ambience and great hygiene standards. Perfect place for family dinners and small gatherings.",
    image: pankaj,
  },
  {
    id: 4,
    name: "Ram Patil",
    role: "Customer",
    message:
      "The menu has a wide variety and everything we ordered tasted delicious. Portion size and pricing are very reasonable.",
    image: ram,
  },
  {
    id: 5,
    name: "Ramesh Joshi",
    role: "Customer",
    message:
      "Loved the presentation of food and the flavors were outstanding. Highly recommended for anyone who enjoys quality cuisine.",
    image: ramesh,
  },
  {
    id: 6,
    name: "Sangita Dhumal",
    role: "Customer",
    message:
      "Fast service and consistent taste every time we visit. This place never disappoints.",
    image: sangita,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const Testimonials = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    document.title = "Our Testimonials | Restaurant Management System";
  }, []);

  return (
    <section className="bg-gradient-to-br from-orange-50 via-white to-amber-100 py-16 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            What Our Clients Say
          </h2>
          <p className="text-gray-600 mt-3 max-w-xl mx-auto">
            Trusted by restaurant owners and managers across the country
          </p>
        </div>

        {/* Animated Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {testimonials.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              whileHover={{ scale: 1.05, y: -8 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedCard(item)}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-full object-cover border"
                />
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h4>
                  <span className="text-sm text-gray-500">
                    {item.role}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                “{item.message}”
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal Popup */}
      <AnimatePresence>
        {selectedCard && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setSelectedCard(null)}
            />

            {/* Modal */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
            >
              <div className="bg-white max-w-md w-full rounded-2xl shadow-2xl p-6 relative">

                {/* Close Button */}
                <button
                  onClick={() => setSelectedCard(null)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
                >
                  ✕
                </button>

                <div className="flex flex-col items-center text-center">
                  <img
                    src={selectedCard.image}
                    alt={selectedCard.name}
                    className="w-20 h-20 rounded-full object-cover mb-4"
                  />

                  <h3 className="text-xl font-semibold">
                    {selectedCard.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {selectedCard.role}
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    “{selectedCard.message}”
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Testimonials;
