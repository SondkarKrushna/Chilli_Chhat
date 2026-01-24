import React from "react";
import {
  useGetOrdersQuery,
  useUpdateStatusMutation,
} from "../store/api/chiefPannelApi"; 

const ChefPannel = () => {
  //API hooks
  const {
    data: orders = [],           
    isLoading,
    isError,
    error,
  } = useGetOrdersQuery(undefined, {
    pollingInterval: 10000,     
    
  });

  const [updateStatus, { isLoading: isUpdating }] = useUpdateStatusMutation();

  //Helper: status color classes
  const statusColor = (status) => {
    switch (status?.toUpperCase()) {
      case "NEW":
        return "bg-yellow-100 text-yellow-800 border-yellow-400";
      case "PREPARING":
        return "bg-blue-100 text-blue-800 border-blue-400";
      case "READY":
        return "bg-green-100 text-green-800 border-green-400";
      case "COMPLETED":
      case "DELIVERED":
        return "bg-gray-100 text-gray-800 border-gray-400";
      default:
        return "bg-gray-50 text-gray-600 border-gray-300";
    }
  };

  //Status transition handler 
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      // The second argument is the body — here we send { status: "PREPARING" }
      await updateStatus({
        id: orderId,
        status: newStatus,
      }).unwrap();
      // success → RTK Query will automatically refetch getOrders (because of invalidatesTags)
    } catch (err) {
      console.error("Failed to update order status:", err);
      // Optional: show toast/notification here
      alert("Failed to update status. Please try again.");
    }
  };

  //  Loading & error states
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-lg font-medium text-gray-600 animate-pulse">
          Loading orders...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded">
          <p>Failed to load orders</p>
          <p className="text-sm mt-1">{error?.data?.message || error?.error || "Unknown error"}</p>
        </div>
      </div>
    );
  }

  // Main UI 
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="bg-slate-900 text-white p-5 rounded-xl shadow-lg mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-3">
          👨‍🍳 Chief Dashboard
        </h1>
        <p className="text-gray-300 mt-1 text-sm">
          Real-time incoming & in-progress orders
        </p>
      </div>

      {/* Orders Grid */}
      {orders.length === 0 ? (
        <div className="text-center text-gray-500 mt-16 text-lg font-medium">
          No orders at the moment 🍽️
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className={`bg-white rounded-xl shadow-md p-5 border-t-4 ${statusColor(
                order.status
              )}`}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  Table {order.tableNo}
                </h2>
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wide ${statusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>

              {/* Items */}
              <div className="space-y-2 mb-5">
                {order.items?.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between text-sm text-gray-700"
                  >
                    <span className="font-medium">{item.name}</span>
                    <span className="text-gray-500">× {item.qty}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                {order.status === "NEW" && (
                  <button
                    onClick={() => handleStatusChange(order.id, "PREPARING")}
                    disabled={isUpdating}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUpdating ? "Updating..." : "Start Cooking"}
                  </button>
                )}

                {order.status === "PREPARING" && (
                  <button
                    onClick={() => handleStatusChange(order.id, "READY")}
                    disabled={isUpdating}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUpdating ? "Updating..." : "Mark Ready"}
                  </button>
                )}

                {order.status === "READY" && (
                  <button
                    disabled
                    className="flex-1 bg-gray-200 text-gray-500 py-2 px-4 rounded-lg font-medium cursor-not-allowed"
                  >
                    Waiting for Pickup
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChefPannel;