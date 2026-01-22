import React from "react";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import anjali from "../../public/anjali.jpg";
import ram from "../../public/ram.jpg";
import pankaj from "../../public/pankaj.jpg";
import shivani from "../../public/shivani.jpg";
import ramesh from "../../public/ramesh.jpg";
import sangita from "../../public/sangita.jpg";

const testimonials = [
  {
    id: 1,
    name: "Anjali Shinde",
    role: "Customer",
    message:
      "Amazing food quality and taste. Every dish was fresh and well-prepared. Definitely one of the best dining experiences I’ve had in a long time.",
    image:
      anjali,
  },
  {
    id: 2,
    name: "Shivani Thakur",
    role: "Customer",
    message:
      "The staff is very polite and service is quick. Even during peak hours, the management handled everything smoothly.",
    image:
      shivani,
  },
  {
    id: 3,
    name: "Pankaj Jadhav",
    role: "Customer",
    message:
      "Excellent ambience and great hygiene standards. Perfect place for family dinners and small gatherings.",
    image:
      pankaj,
  },
  {
    id: 4,
    name: "Ram Patil",
    role: "Customer",
    message:
      "The menu has a wide variety and everything we ordered tasted delicious. Portion size and pricing are very reasonable.",
    image:
      ram,
  },
  {
    id: 5,
    name: "Ramesh Joshi",
    role: "Customer",
    message:
      "Loved the presentation of food and the flavors were outstanding. Highly recommended for anyone who enjoys quality cuisine.",
    image:
      ramesh,
  },
  {
    id: 6,
    name: "sangita Dhumal",
    role: "Customer",
    message:
      "Fast service and consistent taste every time we visit. This place never disappoints.",
    image:
      sangita,
  },
];

const Testimonials = () => {
  return (
    <section className="bg-gray-50 py-16 px-4">
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

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition duration-300"
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

              <p className="text-gray-600 text-sm leading-relaxed">
                “{item.message}”
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
