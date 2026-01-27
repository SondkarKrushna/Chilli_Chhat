import React from "react";
import {
  useGetOrdersQuery,
  useUpdateStatusMutation,
} from "../store/api/chiefPannelApi";

const ChefPannel = () => {
  const {
    data: response = [],
    isLoading,
    isError,
    error,
  } = useGetOrdersQuery(undefined, {
    pollingInterval: 10000,
  });

  const orders = Array.isArray(response)
    ? response
    : response?.orders || response?.data || [];

  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateStatusMutation();

  // ✅ MAP BACKEND STATUS → UI STATUS
  const normalizeStatus = (status) => {
    if (!status) return "";

    const s = status.toString().toLowerCase();

    if (["new", "pending", "placed"].includes(s)) return "NEW";
    if (["preparing", "cooking", "in_progress"].includes(s))
      return "PREPARING";
    if (["ready", "done", "completed"].includes(s)) return "READY";

    return s.toUpperCase();
  };

  const statusColor = (status) => {
    switch (status) {
      case "NEW":
        return "bg-yellow-100 text-yellow-800 border-yellow-400";
      case "PREPARING":
        return "bg-blue-100 text-blue-800 border-blue-400";
      case "READY":
        return "bg-green-100 text-green-800 border-green-400";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateStatus({
        id: orderId,
        status: newStatus,
      }).unwrap();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading orders...
      </div>
    );
  }

  if (isError) {
    return <div>{error?.data?.message || "Error loading orders"}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-slate-900 text-white p-5 rounded-xl mb-8">
        <h1 className="text-2xl font-bold">👨‍🍳 Chef Dashboard</h1>
        <p className="text-sm text-gray-300">Live kitchen orders</p>
      </div>

      {orders.length === 0 ? (
        <p className="text-center mt-20 text-gray-500">
          No orders 🍽️
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => {
            const orderId = order.id || order._id;
            const status = normalizeStatus(order.status);

            return (
              <div
                key={orderId}
                className={`bg-white p-5 rounded-xl shadow border-t-4 ${statusColor(
                  status
                )}`}
              >
                <div className="flex justify-between mb-4">
                  <h2 className="font-bold">
                    Table {order.tableNo}
                  </h2>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${statusColor(
                      status
                    )}`}
                  >
                    {status}
                  </span>
                </div>

                <div className="space-y-2 mb-5">
                  {order.items?.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between text-sm"
                    >
                      <span>{item.name}</span>
                      <span>
                        × {item.qty ?? item.quantity ?? 1}
                      </span>
                    </div>
                  ))}
                </div>

                {/* ✅ BUTTONS WILL NOW ALWAYS APPEAR */}
                {status === "NEW" && (
                  <button
                    onClick={() =>
                      handleStatusChange(orderId, "PREPARING")
                    }
                    className="w-full bg-blue-600 text-white py-2 rounded-lg"
                  >
                    Start Cooking
                  </button>
                )}

                {status === "PREPARING" && (
                  <button
                    onClick={() =>
                      handleStatusChange(orderId, "READY")
                    }
                    className="w-full bg-green-600 text-white py-2 rounded-lg"
                  >
                    Mark Ready
                  </button>
                )}

                {status === "READY" && (
                  <button
                    disabled
                    className="w-full bg-gray-200 text-gray-500 py-2 rounded-lg"
                  >
                    Waiting for Pickup
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ChefPannel;
