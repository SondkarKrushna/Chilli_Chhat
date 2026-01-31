import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import contactUs from "../../public/contactUs1.png";

const formVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fieldVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6 },
  },
};

const ContactUs = () => {
  const [submitted, setSubmitted] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    document.title = "Contact | Restaurant Management System";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShake(true);

    setTimeout(() => {
      setShake(false);
      setSubmitted(true);
    }, 600);

    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-white to-orange-200 px-4 py-10 ">

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        whileHover={{ rotateY: 3, rotateX: 3 }}
        className="max-w-6xl w-full bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-white/40"
      >
        
        {/* Image Section */}
        <motion.div
          className="hidden md:flex items-center justify-center bg-white/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.img
            src={contactUs}
            alt="Contact"
            className="p-10"
            animate={{ rotate: [0, 2, -2, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
          />
        </motion.div>

        {/* Form Section */}
        <motion.div
          variants={formVariants}
          initial="hidden"
          animate="visible"
          className="p-8 sm:p-10"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Get In Touch
          </h2>
          <p className="text-gray-500 mb-6">
            Send us a message and we'll respond soon.
          </p>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-4"
            animate={shake ? { x: [-10, 10, -8, 8, 0] } : {}}
          >
            {/* Name */}
            <motion.div variants={fieldVariants}>
              <input
                type="text"
                placeholder="Your Name"
                required
                className="w-full px-4 py-3 rounded-xl border bg-white/60 focus:ring-2 focus:ring-orange-400 outline-none transition"
              />
            </motion.div>

            {/* Email */}
            <motion.div variants={fieldVariants}>
              <input
                type="email"
                placeholder="Your Email"
                required
                className="w-full px-4 py-3 rounded-xl border bg-white/60 focus:ring-2 focus:ring-orange-400 outline-none transition"
              />
            </motion.div>

            {/* Phone */}
            <motion.div variants={fieldVariants}>
              <input
                type="tel"
                placeholder="Your Phone"
                required
                className="w-full px-4 py-3 rounded-xl border bg-white/60 focus:ring-2 focus:ring-orange-400 outline-none transition"
              />
            </motion.div>

            {/* Message */}
            <motion.div variants={fieldVariants}>
              <textarea
                rows="4"
                placeholder="Your Message"
                required
                className="w-full px-4 py-3 rounded-xl border bg-white/60 focus:ring-2 focus:ring-orange-400 outline-none resize-none transition"
              ></textarea>
            </motion.div>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              type="submit"
              className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg"
            >
              Send Message
            </motion.button>
          </motion.form>

          {/* Success Popup */}
          <AnimatePresence>
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-6 text-center text-green-600 font-semibold"
              >
                🎉 Message Sent Successfully!
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactUs;
