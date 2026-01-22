import React, { useState } from "react";

const MenuPage = () => {
  const [menuData, setMenuData] = useState([
    {
      category: "Breakfast",
      items: [
        { id: 18, name: "Vada Pav", price: 12, desc: "Classic Mumbai snack" },
        { id: 19, name: "Pohe", price: 15, desc: "Light breakfast dish" },
        { id: 20, name: "Upma", price: 25, desc: "South Indian breakfast" },
      ],
    },
    {
      category: "Starters",
      items: [
        { id: 1, name: "Paneer Pakoda", price: 120, desc: "Crispy paneer fritters" },
        { id: 2, name: "Veg Manchurian", price: 150, desc: "Indo-Chinese starter" },
        { id: 3, name: "Masala Papad", price: 25, desc: "Papad with toppings" },
      ],
    },
    {
      category: "Soups",
      items: [
        { id: 16, name: "Tomato Soup", price: 60, desc: "Fresh tomato soup" },
        { id: 17, name: "Spinach Soup", price: 80, desc: "Healthy spinach soup" },
      ],
    },
    {
      category: "Roti",
      items: [
        { id: 4, name: "Chapati", price: 12, desc: "Soft wheat roti" },
        { id: 5, name: "Tandoori Roti", price: 15, desc: "Clay oven roti" },
        { id: 6, name: "Butter Naan", price: 25, desc: "Buttery naan" },
      ],
    },
    {
      category: "Rice",
      items: [
        { id: 7, name: "Jeera Rice", price: 120, desc: "Cumin flavored rice" },
        { id: 8, name: "Plain Rice", price: 100, desc: "Steamed rice" },
      ],
    },
    {
      category: "Dal",
      items: [
        { id: 9, name: "Dal Tadka", price: 140, desc: "Tempered dal" },
        { id: 10, name: "Dal Fry", price: 130, desc: "Restaurant style dal" },
      ],
    },
    {
      category: "Paneer",
      items: [
        { id: 11, name: "Palak Paneer", price: 180, desc: "Paneer in spinach gravy" },
        { id: 12, name: "Kaju Kari", price: 240, desc: "Cashew curry" },
        { id: 13, name: "Paneer Maharaja", price: 260, desc: "Rich paneer dish" },
      ],
    },
    {
      category: "Desserts",
      items: [
        { id: 14, name: "Gulab Jamun", price: 60, desc: "Soft milk dessert" },
        { id: 15, name: "Ice Cream", price: 80, desc: "Vanilla / Chocolate" },
      ],
    },
    {
      category: "Pizza",
      items: [
        { id: 21, name: "Onion Pizza", price: 150, desc: "Onion topping pizza" },
        { id: 22, name: "Cheese Pizza", price: 150, desc: "Extra cheese pizza" },
        { id: 23, name: "Margherita Pizza", price: 180, desc: "Classic pizza" },
      ],
    },
  ]);

  /* NEW ITEM STATE */
  const [newItem, setNewItem] = useState({
    category: "",
    name: "",
    price: "",
    desc: "",
  });

  /* ADD NEW ITEM FUNCTION */
  const addNewItem = () => {
    if (!newItem.category || !newItem.name || !newItem.price) {
      alert("Please fill all required fields");
      return;
    }

    setMenuData((prev) =>
      prev.map((cat) =>
        cat.category === newItem.category
          ? {
              ...cat,
              items: [
                ...cat.items,
                {
                  id: Date.now(),
                  name: newItem.name,
                  price: Number(newItem.price),
                  desc: newItem.desc || "New item",
                },
              ],
            }
          : cat
      )
    );

    setNewItem({ category: "", name: "", price: "", desc: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-4xl font-bold text-center text-red-600 mb-10">
        Our Menu
      </h1>

      {/* ADD ITEM FORM */}
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow mb-12">
        <h2 className="text-xl font-semibold mb-4">➕ Add New Menu Item</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <select
            className="border rounded px-4 py-2"
            value={newItem.category}
            onChange={(e) =>
              setNewItem({ ...newItem, category: e.target.value })
            }
          >
            <option value="">Select Category</option>
            {menuData.map((c) => (
              <option key={c.category}>{c.category}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Item Name"
            className="border rounded px-4 py-2"
            value={newItem.name}
            onChange={(e) =>
              setNewItem({ ...newItem, name: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Price"
            className="border rounded px-4 py-2"
            value={newItem.price}
            onChange={(e) =>
              setNewItem({ ...newItem, price: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Description"
            className="border rounded px-4 py-2"
            value={newItem.desc}
            onChange={(e) =>
              setNewItem({ ...newItem, desc: e.target.value })
            }
          />
        </div>

        <button
          onClick={addNewItem}
          className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Add Item
        </button>
      </div>

      {/* MENU DISPLAY */}
      <div className="max-w-6xl mx-auto space-y-12">
        {menuData.map((section) => (
          <div key={section.category}>
            <h2 className="text-2xl font-semibold mb-6 border-l-4 border-red-500 pl-3">
              {section.category}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-md p-5"
                >
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                  <p className="text-green-600 font-bold mt-2">
                    ₹{item.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
  