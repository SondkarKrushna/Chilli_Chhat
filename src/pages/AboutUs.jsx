import React from "react";
import { useNavigate } from "react-router-dom";

import food1 from "../../public/aboutDishes.jpg";
import food2 from "../../public/aboutDishes1.jpg";

const WhyDineWithUs = () => {

  const navigate = useNavigate();

  return (
    <section className="bg-white py-16 max-sm:py-12">
      
      {/* Heading */}
      <div className="text-center max-w-2xl mx-auto mb-12 max-sm:mb-8 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-brown-800 max-sm:text-2xl">
          Why Dine with Us?
        </h2>
        <p className="text-gray-600 mt-3 max-sm:text-sm">
          From classic favorites to modern culinary creations, our menu is
          designed to tantalize your taste buds. Every dish is made with the
          freshest ingredients and an extra dash of love.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="
        max-w-6xl mx-auto px-6
        grid md:grid-cols-2 gap-8
        max-sm:grid-cols-1
        max-sm:gap-6
      ">
        {/* Card 1 - Image */}
        <div className="
          bg-indigo-50 rounded-3xl p-6 
          flex items-center justify-center
          max-sm:p-4
        ">
          <img
            src={food1}
            alt="Food"
            className="
              rounded-2xl shadow-lg rotate-[-5deg]
              max-sm:rotate-0
              max-sm:max-w-full
            "
          />
        </div>

        {/* Card 2 - Content */}
        <div className="
          bg-indigo-50 rounded-3xl p-10 
          flex flex-col justify-center
          max-sm:p-6
          max-sm:text-center
        ">
          <span className="text-indigo-600 text-xl mb-2">💙</span>
          <h3 className="text-2xl font-bold text-indigo-900 mb-3 max-sm:text-xl">
            Fresh, Locally Sourced Ingredients.
          </h3>
          <p className="text-gray-600 mb-6 max-sm:text-sm">
            We use only the freshest ingredients & traditional recipes to
            ensure each dish is a masterpiece.
          </p>
          <button className="
            bg-orange-500 text-white px-6 py-3 rounded-full w-fit
            hover:bg-orange-600 transition
            max-sm:mx-auto"
            onClick={() => navigate("/menu")}>
            View Menu →
          </button>
        </div>

        {/* Card 3 - Image */}
        <div className="
          bg-orange-100 rounded-3xl p-6 
          flex items-center justify-center
          max-sm:p-4
        ">
          <img
            src={food2}
            alt="Food"
            className="rounded-2xl shadow-lg max-sm:max-w-full"
          />
        </div>

        {/* Card 4 - Content */}
        <div className="
          bg-orange-100 rounded-3xl p-10 
          flex flex-col justify-center
          max-sm:p-6
          max-sm:text-center
        ">
          <span className="text-orange-600 text-xl mb-2">✨</span>
          <h3 className="text-2xl font-bold text-orange-900 mb-3 max-sm:text-xl">
            Crafted with Passion.
          </h3>
          <p className="text-gray-700 max-sm:text-sm">
            Our chefs bring years of experience and passion to your plate,
            delivering flavors you’ll always remember.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyDineWithUs;
