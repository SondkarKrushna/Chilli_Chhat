import React, { useState, useEffect, useMemo } from "react";
import {
  useGetItemsQuery,
  useGetCategoriesQuery,
} from "../store/api/menuApi";
import { useAddOrderMutation } from "../store/api/waiterPannelApi";
import { useGetTableQuery } from "../store/api/tableApi";

const WaiterPannel = () => {
  const [tableNo, setTableNo] = useState("");
  const [tableError, setTableError] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [qty, setQty] = useState(1);
  const [orderItems, setOrderItems] = useState([]);

  // RTK Queries
  const {
    data: tablesData,
    isLoading: tablesLoading,
    refetch: refetchTables,           
  } = useGetTableQuery(undefined, {
    // pollingInterval: 8000,         
  });

  const { data: categoriesData = [], isLoading: catLoading } = useGetCategoriesQuery();
  const { data: itemsData = [], isLoading: itemsLoading } = useGetItemsQuery();

  const [addOrder, { isLoading: isSubmitting, error: submitError }] =
    useAddOrderMutation();

  // Process categories
  const categories = useMemo(() => {
    const raw = Array.isArray(categoriesData)
      ? categoriesData
      : categoriesData?.data || categoriesData?.categories || [];

    return raw
      .map((cat) => ({
        _id: cat._id || cat.id || "",
        name: cat.name || cat.title || "Unnamed",
      }))
      .filter((c) => c._id && c.name);
  }, [categoriesData]);

  // Process tables – more permissive (show even if tableNo missing)
  const tables = useMemo(() => {
    if (!tablesData) return [];

    const tableArray = Array.isArray(tablesData)
      ? tablesData
      : tablesData?.tables || tablesData?.data || tablesData?.table || [];

    return tableArray
      .map((t) => {
        // More field guesses
        const value =
          t.tableNo ||
          t.tableNumber ||
          t.number ||
          t.name ||
          t.label ||
          String(t._id || "").slice(-6) ||
          "???";

        const display =
          t.display ||
          t.name ||
          t.tableName ||
          `Table ${value}`;

        return {
          id: t._id || t.id || value,
          tableNo: value,
          display,
        };
      })
      .filter((t) => t.tableNo !== "???"); 
  }, [tablesData]);

  // Force refetch when user selects a table (helps if backend opens access per table)
  useEffect(() => {
    if (tableNo) {
      refetchTables(); 
      setTableError(""); 
    }
  }, [tableNo, refetchTables]);

  // Auto-select first category
  useEffect(() => {
    if (categories.length > 0 && !selectedCategoryId) {
      setSelectedCategoryId(categories[0]._id);
    }
  }, [categories, selectedCategoryId]);

  // ── Rest of your logic (menu grouping, filtering, cart, submit) remains unchanged ──

  const menuByCategory = useMemo(() => {
    const grouped = {};
    const items = Array.isArray(itemsData)
      ? itemsData
      : itemsData?.data || itemsData?.items || [];

    items.forEach((item) => {
      const catId =
        typeof item.category === "string"
          ? item.category
          : item.category?._id || item.category?.id;

      if (!catId) return;

      if (!grouped[catId]) grouped[catId] = [];
      grouped[catId].push(item);
    });

    return grouped;
  }, [itemsData]);

  const currentItems = useMemo(() => {
    if (!selectedCategoryId) return [];
    return menuByCategory[selectedCategoryId] || [];
  }, [menuByCategory, selectedCategoryId]);

  const filteredItems = useMemo(
    () =>
      currentItems.filter((item) =>
        (item.name || "").toLowerCase().includes(search.toLowerCase())
      ),
    [currentItems, search]
  );

  const addItemToOrder = () => {
    if (!selectedItem) return;

    setOrderItems((prev) => {
      const exists = prev.find(
        (i) => (i._id || i.id) === (selectedItem._id || selectedItem.id)
      );
      if (exists) {
        return prev.map((i) =>
          (i._id || i.id) === (selectedItem._id || selectedItem.id)
            ? { ...i, qty: i.qty + qty }
            : i
        );
      }
      return [...prev, { ...selectedItem, qty }];
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

  const total = orderItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  const submitOrder = async () => {
    if (!tableNo) {
      setTableError("Please select a table.");
      return;
    }
    if (orderItems.length === 0) {
      alert("Add at least one item.");
      return;
    }

    const payload = {
      tableNo,
      items: orderItems.map((item) => ({
        itemId: item._id || item.id,
        quantity: item.qty,
      })),
      totalAmount: total,
    };

    try {
      await addOrder(payload).unwrap();
      alert("Order placed successfully!");
      setOrderItems([]);
      setTableNo("");
      setTableError("");
    } catch (err) {
      alert(err?.data?.message || "Failed to place order.");
    }
  };

  if (catLoading || itemsLoading || tablesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  const selectedCategoryName =
    categories.find((c) => c._id === selectedCategoryId)?.name ||
    "Select category";

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-5 sm:p-6">
        <h1 className="text-2xl font-bold mb-6">🍽️ Waiter Panel</h1>

        {/* Table selection – improved empty/loading state */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Table</label>
          <select
            value={tableNo}
            onChange={(e) => {
              setTableNo(e.target.value);
              setTableError("");
            }}
            className={`border rounded px-4 py-2 w-64 ${
              tableError ? "border-red-500" : "border-gray-300"
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
              <option key={t.id || t.tableNo} value={t.tableNo}>
                {t.display || t.tableNo}
              </option>
            ))}
          </select>
          {tableError && (
            <p className="text-red-500 text-sm mt-1">{tableError}</p>
          )}
        </div>

        {/* rest of your UI (categories, search, items grid, order summary) unchanged */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => setSelectedCategoryId(cat._id)}
                  className={`px-5 py-2 rounded-full font-medium text-sm transition-colors ${
                    selectedCategoryId === cat._id
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
                    key={item._id}
                    onClick={() => setSelectedItem(item)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md hover:border-green-400 ${
                      selectedItem?._id === item._id
                        ? "border-green-600 bg-green-50"
                        : "border-gray-200"
                    }`}
                  >
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      ₹{item.price}
                      {item.description && (
                        <span className="block text-xs text-gray-500 mt-1">
                          {item.description}
                        </span>
                      )}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 h-fit sticky top-4">
            <h2 className="font-semibold text-lg mb-4">Current Order</h2>

            {orderItems.length === 0 ? (
              <p className="text-gray-500 text-sm">No items yet</p>
            ) : (
              orderItems.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center mb-3 text-sm"
                >
                  <span className="font-medium">{item.name}</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => changeQty(item._id, "dec")}
                      className="w-8 h-8 flex items-center justify-center bg-red-100 text-red-600 rounded hover:bg-red-200"
                    >
                      −
                    </button>
                    <span className="w-8 text-center">{item.qty}</span>
                    <button
                      onClick={() => changeQty(item._id, "inc")}
                      className="w-8 h-8 flex items-center justify-center bg-green-100 text-green-600 rounded hover:bg-green-200"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item._id)}
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
                  Add → {selectedItem.name}
                </button>
              </div>
            )}

            <button
              onClick={submitOrder}
              disabled={isSubmitting || orderItems.length === 0 || !tableNo}
              className={`w-full py-3 rounded font-medium ${
                isSubmitting || orderItems.length === 0 || !tableNo
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-slate-800 hover:bg-slate-900 text-white"
              }`}
            >
              {isSubmitting ? "Placing..." : "Place Order"}
            </button>

            {submitError && (
              <p className="mt-3 text-red-600 text-sm text-center">
                {submitError?.data?.message || "Failed to submit"}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaiterPannel;

