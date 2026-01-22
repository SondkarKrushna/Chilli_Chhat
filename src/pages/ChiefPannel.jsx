import React, { useState } from "react";

const ChefPannel = () => {
  // ------------------ STATE ------------------
  const [orders, setOrders] = useState([
    {
      id: 1,
      tableNo: 2,
      status: "NEW",
      items: [
        { name: "Pizza", qty: 2 },
        { name: "Coke", qty: 1 },
      ],
    },
    {
      id: 2,
      tableNo: 5,
      status: "PREPARING",
      items: [
        { name: "Burger", qty: 1 },
        { name: "Pasta", qty: 1 },
      ],
    },
  ]);

  // ------------------ FUNCTIONS ------------------

  const updateStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? { ...order, status: newStatus }
          : order
      )
    );
  };

  const statusColor = (status) => {
    switch (status) {
      case "NEW":
        return "bg-yellow-100 text-yellow-800";
      case "PREPARING":
        return "bg-blue-100 text-blue-800";
      case "READY":
        return "bg-green-100 text-green-800";
      default:
        return "";
    }
  };

  // ------------------ UI ------------------
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div className="bg-slate-900 text-white p-4 rounded-lg shadow">
        <h1 className="text-xl font-semibold">👨‍🍳 Kitchen / Chef Panel</h1>
        <p className="text-sm text-gray-300">
          Live incoming orders
        </p>
      </div>

      {/* ORDERS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-lg shadow p-4 border-l-4 border-slate-700"
          >
            {/* ORDER HEADER */}
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">
                Table {order.tableNo}
              </h2>
              <span
                className={`px-3 py-1 text-sm rounded-full font-medium ${statusColor(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>

            {/* ITEMS */}
            <div className="mb-4">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between text-sm mb-1"
                >
                  <span>{item.name}</span>
                  <span>× {item.qty}</span>
                </div>
              ))}
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-2">
              {order.status === "NEW" && (
                <button
                  onClick={() =>
                    updateStatus(order.id, "PREPARING")
                  }
                  className="flex-1 bg-blue-600 text-white py-1 rounded hover:bg-blue-700"
                >
                  Start Cooking
                </button>
              )}

              {order.status === "PREPARING" && (
                <button
                  onClick={() =>
                    updateStatus(order.id, "READY")
                  }
                  className="flex-1 bg-green-600 text-white py-1 rounded hover:bg-green-700"
                >
                  Mark Ready
                </button>
              )}

              {order.status === "READY" && (
                <button
                  disabled
                  className="flex-1 bg-gray-300 text-gray-600 py-1 rounded cursor-not-allowed"
                >
                  Waiting for Pickup
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* NO ORDERS */}
      {orders.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No orders available
        </p>
      )}
    </div>
  );
};

export default ChefPannel;
