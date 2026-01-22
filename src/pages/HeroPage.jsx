import React from "react";
import { useNavigate } from "react-router-dom";
import Offers from "../components/Offers";
import hero from "../../public/indianFood.jpg";
import mobile from "../../public/mobile_indian_food.jpeg";
import review from "../../public/review.png";

const HeroPage = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <div className="relative h-screen">
        {/* Desktop Background */}
        <div
          className="hidden sm:block absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${hero})` }}
        ></div>

        {/* Mobile Background */}
        <div
          className="block sm:hidden absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${mobile})` }}
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to Chili and Chaat
          </h1>

          <p className="text-lg md:text-xl max-w-2xl mb-6 text-gray-200">
            Simplify restaurant ordering with a fast, digital waiter system.
            Take orders, manage tables, and serve customers efficiently.
          </p>

          <div className="flex gap-4 max-sm:flex-col max-sm:w-full max-sm:items-center">
            <button
              onClick={() => navigate("/waiter")}
              className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg"
            >
              Take Order
            </button>

            <button
              onClick={() => navigate("/menu")}
              className="border border-white px-6 py-3 rounded-lg"
            >
              View Menu
            </button>
          </div>

          {/* Review Card */}
          <div className="absolute bottom-24 right-8 max-sm:static max-sm:mt-10">
            <div
              onClick={() => navigate("/Testimonials")}
              className="rounded-3xl bg-gradient-to-b from-[#CFA24D]/70 via-[#8B5A2B]/60 to-[#1C1C1C]/90 backdrop-blur-md text-white p-5 shadow-2xl border border-white/10 max-sm:w-64 max-sm:mx-auto cursor-pointer"
            >
              <img
                src={review}
                className="object-contain w-2/3 mx-auto mb-3"
                alt="Customer reviews"
              />

              <p className="text-lg text-center text-[#FFF6E5]">
                Our 2600+ Happy Customers
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* offer component */}
      <Offers />
    </>
  );
};

export default HeroPage;
