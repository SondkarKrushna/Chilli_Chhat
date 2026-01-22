import React from "react";
import { useNavigate } from "react-router-dom";
import offerLabel from "../../public/offer-label.png";
import specialOffer from "../../public/special-offer.png";
import puriBhaji from "../../public/puri-bhaji.png";
import pizza from "../../public/pizza.png";
import gulabJamun from "../../public/gulabJamun.png";
import soup from "../../public/soup.png";

const Offers = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      {/* Hero */}
      <div className="relative w-full h-[280px] md:h-[340px] flex items-center justify-center bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500">
        <div className="absolute inset-0 bg-black/30"></div>

        <div className="relative text-center text-white px-4">
          <img src={specialOffer} className="mx-auto w-32 md:w-40 mb-4" />
          <h1 className="text-3xl md:text-5xl font-bold">
            Today's Special Offers
          </h1>
          <p className="mt-2 text-sm md:text-lg text-gray-100">
            Grab delicious meals at amazing prices!
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">

          <OfferCard
            img={puriBhaji}
            title="Puri Bhaji Combo"
            desc="Authentic taste with hot puris & spicy bhaji"
            price="₹49"
            oldPrice="₹99"
            bg="bg-yellow-50"
            onOrder={() => navigate("/waiter")}
          />

          <OfferCard
            img={pizza}
            title="Cheesy Pizza"
            desc="Extra cheese, extra happiness!"
            price="₹149"
            oldPrice="₹199"
            bg="bg-orange-50"
            onOrder={() => navigate("/waiter")}
          />

          <OfferCard
            img={gulabJamun}
            title="Gulab Jamun"
            desc="Soft, juicy & freshly made dessert"
            price="₹59"
            oldPrice="₹89"
            bg="bg-pink-50"
            onOrder={() => navigate("/waiter")}
          />

          <OfferCard
            img={soup}
            title="Hot Veg Soup"
            desc="Warm, healthy & comforting"
            price="₹59"
            oldPrice="₹99"
            bg="bg-green-50"
            onOrder={() => navigate("/waiter")}
          />

        </div>
      </div>
    </div>
  );
};

const OfferCard = ({ img, title, desc, price, oldPrice, bg, onOrder }) => (
  <div className="relative bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition duration-300">

    <img src={offerLabel} className="absolute top-4 left-4 w-20 z-10" />
    <img src={specialOffer} className="absolute top-4 right-4 w-28 z-10" />

    <div className={`w-full h-64 flex items-center justify-center ${bg}`}>
      <img src={img} alt={title} className="h-48 object-contain" />
    </div>

    <div className="p-6 text-center">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="text-gray-600 mt-2">{desc}</p>

      <div className="mt-4">
        <span className="text-red-500 text-xl font-bold">{price}</span>
        <span className="line-through text-gray-400 ml-2">{oldPrice}</span>
      </div>

      <button
        type="button"
        onClick={onOrder}
        className="mt-5 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full"
      >
        Order Now
      </button>
    </div>
  </div>
);

export default Offers;
