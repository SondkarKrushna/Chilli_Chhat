import React, { useEffect } from "react";
import contactUs from "../../public/contactUs1.png";

const ContactUs = () => {

  useEffect(() => {
    document.title = "Contact | Restaurant Management System";
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* Image Section */}
        <div className=" md:flex items-center justify-center bg-orange-50">
          <img
            src={contactUs}
            alt="Contact Us"
            className="w-full h-full object-contain p-10"
          />
        </div>

        {/* Form Section */}
        <div className="p-6 sm:p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Contact Us
          </h2>
          <p className="text-gray-500 mb-6">
            We'd love to hear from you. Please fill out the form below.
          </p>

          <form className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-gray-600 mb-1">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-600 mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-600 mb-1">Phone No</label>
              <input
                type="number"
                placeholder="Enter your mobile number"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-gray-600 mb-1">Message</label>
              <textarea
                rows="4"
                placeholder="Enter your message"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
              ></textarea>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
