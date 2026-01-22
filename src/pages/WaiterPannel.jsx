import React, { useState, useEffect } from "react";

/* MENU DATA */
const menu = {
  starter: [
    { id: 1, name: "Paneer Pakoda", price: 120 },
    { id: 2, name: "Veg Manchurian", price: 150 },
    { id: 3, name: "Masala Papad", price: 25 },
  ],
  roti: [
    { id: 4, name: "Chapati", price: 12 },
    { id: 5, name: "Tandoori Roti", price: 15 },
    { id: 6, name: "Butter Naan", price: 25 },
  ],
  rice: [
    { id: 7, name: "Jeera Rice", price: 120 },
    { id: 8, name: "Plain Rice", price: 100 },
  ],
  dal: [
    { id: 9, name: "Dal Tadka", price: 140 },
    { id: 10, name: "Dal Fry", price: 130 },
  ],
  paneer: [
    { id: 11, name: "Palak Paneer", price: 180 },
    { id: 12, name: "Kaju Kari", price: 240 },
    { id: 13, name: "Paneer Maharaja", price: 260 },
  ],
  dessert: [
    { id: 14, name: "Gulab Jamun", price: 60 },
    { id: 15, name: "Ice Cream", price: 80 },
  ],
  soup: [
    { id: 16, name: "Tomato Soup", price: 60 },
    { id: 17, name: "Spinach Soup", price: 80 },
  ],
  brakefast: [
    { id: 18, name: "Vada Pav", price: 12 },
    { id: 19, name: "Pohe", price: 15 },
    { id: 20, name: "Upma", price: 25 },
  ],
  pizza: [
    { id: 21, name: "Onion Pizza", price: 150 },
    { id: 22, name: "Cheese Pizza", price: 150 },
    { id: 23, name: "Margherita Pizza", price: 180 },
  ],
};

const categories = [
  "brakefast",
  "starter",
  "soup",
  "roti",
  "rice",
  "dal",
  "paneer",
  "dessert",
  "pizza",
];

const WaiterPannel = () => {
  const [tableNo, setTableNo] = useState("");
  const [tableError, setTableError] = useState("");
  const [category, setCategory] = useState("starter");
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [qty, setQty] = useState(1);
  const [orderItems, setOrderItems] = useState([]);
  const [submittedOrders, setSubmittedOrders] = useState([]);
  const [editingOrderIndex, setEditingOrderIndex] = useState(null);
  const [editedOrders, setEditedOrders] = useState([]);

  useEffect(() => {
    setEditedOrders(JSON.parse(JSON.stringify(submittedOrders)));
  }, [submittedOrders]);

  const filteredItems = menu[category].filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  /* ADD ITEM */
  const addItem = () => {
    if (!selectedItem) return;

    setOrderItems((prev) => {
      const exists = prev.find((i) => i.id === selectedItem.id);
      if (exists) {
        return prev.map((i) =>
          i.id === selectedItem.id ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { ...selectedItem, qty }];
    });

    setSelectedItem(null);
    setQty(1);
  };

  /* CHANGE QTY (ORDER SUMMARY) */
  const changeQty = (id, type) => {
    setOrderItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                qty: type === "inc" ? item.qty + 1 : item.qty - 1,
              }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const removeItem = (id) => {
    setOrderItems((prev) => prev.filter((item) => item.id !== id));
  };

  const total = orderItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  /* SUBMIT ORDER */
  const submitOrder = () => {
    if (!tableNo) {
      setTableError("Please select a table before placing the order.");
      return;
    }

    if (orderItems.length === 0) {
      alert("Please add at least one item.");
      return;
    }

    setSubmittedOrders((prev) => [
      ...prev,
      { tableNo, items: orderItems },
    ]);

    setOrderItems([]);
    setTableNo("");
    setTableError("");
  };

  /* UPDATE PLACED ORDER ITEM */
  const updatePlacedOrderItem = (orderIdx, itemIdx, action) => {
    setEditedOrders((prev) => {
      const updated = [...prev];
      const items = updated[orderIdx].items;

      if (action === "inc") items[itemIdx].qty += 1;
      if (action === "dec" && items[itemIdx].qty > 1)
        items[itemIdx].qty -= 1;
      if (action === "remove") items.splice(itemIdx, 1);

      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-3 sm:p-5">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-4">
          🍽️ Waiter Panel
        </h1>

        {/* TABLE SELECT */}
        <select
          value={tableNo}
          onChange={(e) => {
            setTableNo(e.target.value);
            setTableError("");
          }}
          className={`border rounded px-4 py-2 w-56 ${
            tableError ? "border-red-500" : ""
          }`}
        >
          <option value="">Select Table</option>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((t) => (
            <option key={t} value={`Table ${t}`}>
              Table {t}
            </option>
          ))}
        </select>

        {tableError && (
          <p className="text-red-500 text-sm mt-1">{tableError}</p>
        )}

        {/* MOBILE / TABLET CATEGORIES */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-4 lg:hidden">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`py-2 rounded text-sm font-medium ${
                category === cat
                  ? "bg-green-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_320px] gap-6 mt-4">
          {/* DESKTOP SIDEBAR */}
          <div className="hidden lg:flex flex-col gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-3 rounded text-left ${
                  category === cat
                    ? "bg-green-600 text-white"
                    : "bg-gray-100"
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          {/* FORM */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Search dish..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded px-4 py-2 w-full"
            />

            <select
              value={selectedItem?.id || ""}
              onChange={(e) =>
                setSelectedItem(
                  menu[category].find(
                    (i) => i.id === Number(e.target.value)
                  )
                )
              }
              className="border rounded px-4 py-2 w-full"
            >
              <option value="">Select Dish</option>
              {filteredItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} – ₹{item.price}
                </option>
              ))}
            </select>

            {selectedItem && (
              <div className="flex gap-3">
                <input
                  type="number"
                  min="1"
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, +e.target.value))}
                  className="border rounded px-4 py-2 w-28"
                />
                <button
                  onClick={addItem}
                  className="bg-green-600 text-white px-6 py-2 rounded"
                >
                  Add Item
                </button>
              </div>
            )}

            {/* ORDERS PLACED */}
            {submittedOrders.length > 0 && (
              <div className="mt-8">
                <h3 className="font-semibold mb-3 text-lg">
                  🧾 Orders Placed
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {editedOrders.map((order, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-50 border rounded-xl p-4 shadow-sm"
                    >
                      <div className="flex justify-between mb-2">
                        <h4 className="font-semibold text-green-700">
                          {order.tableNo}
                        </h4>

                        {editingOrderIndex === idx ? (
                          <div className="flex gap-3">
                            <button
                              className="text-sm text-green-600 font-medium"
                              onClick={() => {
                                setSubmittedOrders(editedOrders);
                                setEditingOrderIndex(null);
                              }}
                            >
                              Save
                            </button>
                            <button
                              className="text-sm text-gray-500"
                              onClick={() => {
                                setEditedOrders(
                                  JSON.parse(JSON.stringify(submittedOrders))
                                );
                                setEditingOrderIndex(null);
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            className="text-sm text-blue-600 font-medium"
                            onClick={() => setEditingOrderIndex(idx)}
                          >
                            Edit
                          </button>
                        )}
                      </div>

                      {order.items.map((item, itemIdx) => (
                        <div
                          key={itemIdx}
                          className="flex justify-between bg-white rounded px-3 py-2 text-sm mb-1"
                        >
                          <span>{item.name}</span>

                          {editingOrderIndex === idx ? (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  updatePlacedOrderItem(
                                    idx,
                                    itemIdx,
                                    "dec"
                                  )
                                }
                                className="w-6 h-6 rounded bg-red-100 text-red-600 font-bold"
                              >
                                −
                              </button>
                              <span>{item.qty}</span>
                              <button
                                onClick={() =>
                                  updatePlacedOrderItem(
                                    idx,
                                    itemIdx,
                                    "inc"
                                  )
                                }
                                className="w-6 h-6 rounded bg-green-100 text-green-600 font-bold"
                              >
                                +
                              </button>
                              <button
                                onClick={() =>
                                  updatePlacedOrderItem(
                                    idx,
                                    itemIdx,
                                    "remove"
                                  )
                                }
                                className="text-red-500 font-bold ml-2"
                              >
                                ✕
                              </button>
                            </div>
                          ) : (
                            <span>× {item.qty}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ORDER SUMMARY */}
          <div>
            <h2 className="font-semibold mb-3">Order Summary</h2>

            {orderItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center mb-2 text-sm"
              >
                <span>
                  {item.name} × {item.qty}
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => changeQty(item.id, "dec")}
                    className="bg-red-100 px-2 rounded"
                  >
                    −
                  </button>
                  <button
                    onClick={() => changeQty(item.id, "inc")}
                    className="bg-green-100 px-2 rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}

            <hr className="my-3" />

            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span className="text-green-600">₹{total}</span>
            </div>

            <button
              onClick={submitOrder}
              className="mt-4 w-full bg-slate-800 text-white py-2 rounded">
              Submit Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaiterPannel;
