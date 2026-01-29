import React, { useState, useEffect, useMemo } from "react";
import {
  useGetCategoriesQuery,
  useGetMenuItemsQuery,
  useGetTablesQuery,
  useAddOrderMutation,
  useGetOrdersQuery,
} from "../store/api/waiterPannelApi";

const WaiterPanel = () => {
  //State
  const [selectedTableId, setSelectedTableId] = useState("");
  const [tableError, setTableError] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [qty, setQty] = useState(1);
  const [orderItems, setOrderItems] = useState([]);

  // RTK Queries & Mutations
  const {
    data: tablesData,
    isLoading: tablesLoading,
    refetch: refetchTables,
  } = useGetTablesQuery();

  const { data: categoriesData = [], isLoading: catLoading } = useGetCategoriesQuery();

  const { data: itemsData = [], isLoading: itemsLoading } = useGetMenuItemsQuery();

  const [addOrder, { isLoading: isSubmitting, error: submitError }] = useAddOrderMutation();

  const {
    data: ordersData = [],
    isLoading: ordersLoading,
    error: ordersError,
  } = useGetOrdersQuery();

  // Derived / Memoized Values
  console.log(ordersData);
  const readyOrders = useMemo(() => {
    if (!Array.isArray(ordersData)) return [];

    return ordersData.filter(order => {
      const status = (order.status || "").toUpperCase().trim();
      return (
        // status === "ready" ||
        status === "READY" ||
        // status === "prepared" ||
        // status === "served" ||
        // status === "complete" ||          
        // status === "Completed" ||  
        status === "COMPLETED" ||
        // status === "delivered" ||          
        order.isReady === true
      );
    });
  }, [ordersData]);

  const categories = useMemo(() => {
    const raw = Array.isArray(categoriesData)
      ? categoriesData
      : categoriesData?.data || categoriesData?.categories || [];

    return raw
      .map((cat) => ({
        _id: cat._id || cat.id || "",
        name: cat.name || cat.title || "Unnamed",
      }))
      .filter((c) => c._id && c.name.trim());
  }, [categoriesData]);

  const tables = useMemo(() => {
    if (!tablesData) return [];

    const tableArray = Array.isArray(tablesData)
      ? tablesData
      : tablesData?.tables || tablesData?.data || tablesData?.table || [];

    return tableArray
      .map((t) => {
        const id = t._id || t.id || "";
        const tableNo =
          t.tableNo ||
          t.tableNumber ||
          t.number ||
          t.name ||
          t.label ||
          String(id).slice(-6) ||
          "???";

        return {
          id,
          tableNo,
          display: t.display || t.name || t.tableName || `Table ${tableNo}`,
        };
      })
      .filter((t) => t.id && t.tableNo !== "???");
  }, [tablesData]);

  const menuByCategory = useMemo(() => {
    const grouped = {};
    const items = Array.isArray(itemsData)
      ? itemsData
      : itemsData?.data || itemsData?.items || itemsData?.dishes || [];

    items.forEach((item) => {
      const catId =
        typeof item.category === "string"
          ? item.category
          : item.category?._id || item.category?.id || "";

      if (!catId) return;
      if (!grouped[catId]) grouped[catId] = [];
      grouped[catId].push(item);
    });

    return grouped;
  }, [itemsData]);

  const currentItems = useMemo(
    () => menuByCategory[selectedCategoryId] || [],
    [menuByCategory, selectedCategoryId]
  );

  const filteredItems = useMemo(
    () =>
      currentItems.filter((item) =>
        (item.name || "").toLowerCase().includes(search.toLowerCase())
      ),
    [currentItems, search]
  );

  const total = useMemo(() => {
    return orderItems.reduce((sum, item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.qty) || 1;
      return sum + price * quantity;
    }, 0);
  }, [orderItems]);

  // Effects
  useEffect(() => {
    if (selectedTableId) {
      refetchTables();
      setTableError("");
    }
  }, [selectedTableId, refetchTables]);

  useEffect(() => {
    if (categories.length > 0 && !selectedCategoryId) {
      setSelectedCategoryId(categories[0]._id);
    }
  }, [categories, selectedCategoryId]);

  // Order Actions
  const addItemToOrder = () => {
    if (!selectedItem) return;

    const realItemId = selectedItem._id || selectedItem.id;
    if (!realItemId) {
      console.warn("Item has no valid ID", selectedItem);
      return;
    }

    setOrderItems((prev) => {
      const exists = prev.find((i) => (i._id || i.id) === realItemId);
      if (exists) {
        return prev.map((i) =>
          (i._id || i.id) === realItemId ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { ...selectedItem, _id: realItemId, id: realItemId, qty }];
    });

    setSelectedItem(null);
    setQty(1);
  };

  const changeQty = (id, type) => {
    setOrderItems((prev) =>
      prev
        .map((item) =>
          (item._id || item.id) === id
            ? { ...item, qty: type === "inc" ? item.qty + 1 : item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const removeItem = (id) => {
    setOrderItems((prev) => prev.filter((item) => (item._id || item.id) !== id));
  };

  const submitOrder = async () => {
    if (!selectedTableId) {
      setTableError("Please select a table.");
      return;
    }

    if (orderItems.length === 0) {
      alert("Please add at least one item to the order.");
      return;
    }

    const payload = {
      table: selectedTableId,
      items: orderItems.map((item) => ({
        dish: item._id || item.id,
        quantity: item.qty,
      })),
      totalAmount: Number(total.toFixed(2)),
    };

    // console.log("=== ORDER PAYLOAD BEING SENT ===");
    console.log(JSON.stringify(payload, null, 2));
    // console.log("=================================");

    try {
      const result = await addOrder(payload).unwrap();
      console.log("Order placed successfully:", result);
      alert("Order placed successfully!");

      setOrderItems([]);
      setSelectedTableId("");
      setTableError("");
    } catch (err) {
      console.error("ORDER SUBMISSION FAILED:", err);
      console.error("Full error details:", err?.data || err);

      const errorMessage =
        err?.data?.message ||
        err?.data?.error ||
        err?.error ||
        "Failed to place order. Check console for details.";

      alert(errorMessage);
    }
  };

  // Loading State
  if (catLoading || itemsLoading || tablesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );
  }
  // console.log(ordersData);

  const selectedCategoryName =
    categories.find((c) => c._id === selectedCategoryId)?.name || "Select category";

  // Render 
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-5 sm:p-6">
        <h1 className="text-2xl font-bold mb-6">🍽️ Waiter Panel</h1>

        {/* Table Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Table</label>
          <select
            value={selectedTableId}
            onChange={(e) => {
              setSelectedTableId(e.target.value);
              setTableError("");
            }}
            className={`border rounded px-4 py-2 w-64 ${tableError ? "border-red-500" : "border-gray-300"
              }`}
            disabled={tablesLoading}
          >
            <option value="">
              {tablesLoading
                ? "Loading tables..."
                : tables.length === 0
                  ? "No tables available"
                  : "Select Table"}
            </option>
            {tables.map((t) => (
              <option key={t.id} value={t.id}>
                {t.display || t.tableNo}
              </option>
            ))}
          </select>
          {tableError && <p className="text-red-500 text-sm mt-1">{tableError}</p>}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Menu Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => setSelectedCategoryId(cat._id)}
                  className={`px-5 py-2 rounded-full font-medium text-sm transition-colors ${selectedCategoryId === cat._id
                    ? "bg-green-600 text-white shadow"
                    : "bg-gray-200 hover:bg-gray-300"
                    }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <input
              type="text"
              placeholder={`Search in ${selectedCategoryName}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredItems.length === 0 ? (
                <p className="text-gray-500 col-span-full py-8 text-center">
                  No dishes found
                </p>
              ) : (
                filteredItems.map((item) => (
                  <div
                    key={item._id || item.id}
                    onClick={() => setSelectedItem(item)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md hover:border-green-400 ${selectedItem && (selectedItem._id || selectedItem.id) === (item._id || item.id)
                      ? "border-green-600 bg-green-50"
                      : "border-gray-200"
                      }`}
                  >
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      ₹{item.price}
                      {item.description && (
                        <span className="block text-xs text-gray-500 mt-1">{item.description}</span>
                      )}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Current Order Sidebar */}
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 h-fit sticky top-4">
            <h2 className="font-semibold text-lg mb-4">Current Order</h2>

            {orderItems.length === 0 ? (
              <p className="text-gray-500 text-sm">No items yet</p>
            ) : (
              orderItems.map((item) => (
                <div
                  key={item._id || item.id}
                  className="flex justify-between items-center mb-3 text-sm"
                >
                  <span className="font-medium">{item.name}</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => changeQty(item._id || item.id, "dec")}
                      className="w-8 h-8 flex items-center justify-center bg-red-100 text-red-600 rounded hover:bg-red-200"
                    >
                      −
                    </button>
                    <span className="w-8 text-center">{item.qty}</span>
                    <button
                      onClick={() => changeQty(item._id || item.id, "inc")}
                      className="w-8 h-8 flex items-center justify-center bg-green-100 text-green-600 rounded hover:bg-green-200"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item._id || item.id)}
                      className="text-red-500 hover:text-red-700 ml-1"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))
            )}

            <hr className="my-4 border-gray-300" />

            <div className="flex justify-between font-semibold text-lg mb-5">
              <span>Total</span>
              <span className="text-green-700">₹{total.toFixed(2)}</span>
            </div>

            {selectedItem && (
              <div className="flex gap-3 items-center mb-4">
                <input
                  type="number"
                  min="1"
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
                  className="border rounded px-3 py-2 w-20 text-center"
                />
                <button
                  onClick={addItemToOrder}
                  className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                  Add {selectedItem.name}
                </button>
              </div>
            )}

            <button
              onClick={submitOrder}
              disabled={isSubmitting || orderItems.length === 0 || !selectedTableId}
              className={`w-full py-3 rounded font-medium ${isSubmitting || orderItems.length === 0 || !selectedTableId
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-slate-800 hover:bg-slate-900 text-white"
                }`}
            >
              {isSubmitting ? "Placing..." : "Place Order"}
            </button>

            {submitError && (
              <p className="mt-3 text-red-600 text-sm text-center">
                {submitError?.data?.message ||
                  submitError?.data?.error ||
                  "Failed to submit order. Check browser console."}
              </p>
            )}
          </div>
        </div>

        {/* Ready to Serve Section */}
        {/* <div className="mt-12">
          <h2 className="text-xl font-bold mb-5 flex items-center gap-3">
            <span>✅ Ready to Serve</span>
            {ordersLoading && <span className="text-sm text-gray-500 font-normal">(loading...)</span>}
          </h2>

          {ordersLoading ? (
            <div className="bg-gray-50 p-10 text-center rounded-xl">Loading ready orders...</div>
          ) : ordersError ? (
            <div className="bg-red-50 p-6 text-red-700 rounded-xl text-center">
              Failed to load orders. Please try again.
            </div>
          ) : readyOrders.length === 0 ? (
            <div className="bg-gray-50 p-10 text-center rounded-xl text-gray-600">
              No ready orders at the moment
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {readyOrders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white border border-green-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-semibold text-lg">
                        Table {order.table?.tableNo || order.table?.number || order.table || "?"}
                      </p>
                      <p className="text-sm text-gray-500">
                        Order #{order._id?.slice(-6) || "—"}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-green-600 text-white text-xs font-medium rounded-full">
                      READY
                    </span>
                  </div>



                  <div className="space-y-1.5 text-sm mb-4">
                    {order.items?.slice(0, 4).map((item, idx) => (
                      <div key={idx} className="flex justify-between text-gray-700">
                        <span>{item.dish?.name || item.name || "Item"}</span>
                        <span>× {item.quantity}</span>
                      </div>
                    ))}

                    {order.items?.length > 4 && (
                      <p className="text-xs text-gray-500 italic">
                        + {order.items.length - 4} more item{order.items.length > 5 ? "s" : ""}
                      </p>
                    )}
                  </div>

                  <div className="pt-3 border-t border-gray-200 flex justify-between font-medium">
                    <span>Total</span>
                    <span className="text-green-700">
                      ₹{Number(order.totalAmount || 0).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default WaiterPanel;