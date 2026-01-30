import React, { useState, useEffect } from "react";
import {
  useGetTableQuery,
  useUpdateTableMutation,
  useAddTableMutation,
  useRemoveTableMutation,
  useUnbookTableMutation,
} from "../store/api/tableApi";

const TableBooking = () => {
  useEffect(() => {
    document.title = "Book Table | Restaurant Management System";
  }, []);

  const {
    data: rawTablesData,
    isLoading,
    isError,
    error,
  } = useGetTableQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const tables = Array.isArray(rawTablesData)
    ? [...rawTablesData].sort((a, b) =>
        (a.id || a._id).localeCompare(b.id || b._id)
      )
    : rawTablesData?.tables ||
      rawTablesData?.data ||
      rawTablesData?.items ||
      [];

  const [updateTable, { isLoading: isUpdating }] = useUpdateTableMutation();
  const [addTable, { isLoading: isAdding }] = useAddTableMutation();
  const [removeTable, { isLoading: isDeleting }] = useRemoveTableMutation();
  const [unbookTable, { isLoading: isUnbooking }] = useUnbookTableMutation();

  const [customerName, setCustomerName] = useState("");
  const [members, setMembers] = useState("");
  const [selectedTableId, setSelectedTableId] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newTableName, setNewTableName] = useState("");

  const bookTable = async () => {
    if (!selectedTableId) {
      alert("Please select an available table first.");
      return;
    }

    if (!customerName.trim() || !members || Number(members) < 1) {
      alert("Please enter customer name and number of members.");
      return;
    }

    const payload = {
      table: selectedTableId,
      status: "BOOKED",
      isAvailable: false,
      customerName: customerName.trim(),
      membersCount: Number(members),
    };

    try {
      await updateTable(payload).unwrap();
      alert("Table booked successfully!");
      setCustomerName("");
      setMembers("");
      setSelectedTableId(null);
    } catch (err) {
      alert(err?.data?.message || "Failed to book table.");
    }
  };

  const handleAddTable = async () => {
    if (!newTableName.trim()) return;

    try {
      await addTable({
        name: newTableName.trim(),
        status: "FREE",
        isAvailable: true,
      }).unwrap();

      setNewTableName("");
      setShowAddModal(false);
    } catch (err) {
      alert(err?.data?.message || "Failed to add table.");
    }
  };

  const handleDeleteTable = async (tableId, tableName) => {
    if (!window.confirm(`Delete "${tableName || "this table"}"?`)) return;

    try {
      await removeTable({ id: tableId }).unwrap();
    } catch (err) {
      alert(err?.data?.message || "Failed to delete table.");
    }
  };

  const handleUnbookTable = async (tableId, tableName) => {
    if (!window.confirm(`Unbook "${tableName || "this table"}"?`)) return;

    try {
      await unbookTable({ id: tableId }).unwrap();
      alert("Table unbooked successfully!");
    } catch (err) {
      alert(err?.data?.message || "Failed to unbook table.");
    }
  };

  const isTableAvailable = (table) => {
    if (table.isAvailable !== undefined) return table.isAvailable === true;
    if (table.status)
      return ["FREE", "AVAILABLE"].includes(table.status.toUpperCase());
    return true;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl font-medium text-gray-600 animate-pulse">
          Loading tables...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-lg text-center transition-all duration-300">
          <h2 className="text-xl font-bold text-red-700 mb-2">
            Error loading tables
          </h2>
          <p className="text-gray-700">
            {error?.data?.message || "Please try again later."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 relative transition-all duration-500 ease-in-out">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold font-family text-center flex-1">
          Table Booking Panel
        </h1>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium shadow
          transition-all duration-200 active:scale-95"
          disabled={isAdding}
        >
          + Add Table
        </button>
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 mb-16">
        {tables.map((table) => {
          const tableId = table.id || table._id;
          const available = isTableAvailable(table);
          const isSelected = selectedTableId === tableId;

          return (
            <div
              key={tableId}
              className={`rounded-xl p-5 shadow-md border-2 transition-all duration-300 ease-in-out transform relative
              hover:scale-105 hover:-translate-y-1 hover:shadow-xl
              ${
                !available
                  ? "bg-red-50 border-red-400 opacity-75 cursor-not-allowed"
                  : isSelected
                  ? "bg-green-100 border-green-600 shadow-2xl scale-105"
                  : "bg-white border-green-300"
              }`}
            >
              {available && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteTable(tableId, table.name);
                  }}
                  className="absolute top-2 right-2 text-red-600 bg-white rounded-full p-1 shadow
                  transition-all duration-200 active:scale-95"
                  disabled={isDeleting}
                >
                  🗑️
                </button>
              )}

              {!available && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUnbookTable(tableId, table.name);
                  }}
                  className="absolute top-2 left-2 text-green-600 bg-white rounded-full p-1 shadow
                  transition-all duration-200 active:scale-95"
                  disabled={isUnbooking}
                >
                  🔓
                </button>
              )}

              <div onClick={() => available && setSelectedTableId(tableId)}>
                <h2 className="text-xl font-bold text-center mb-2">
                  {table.name || `Table ${tableId.slice(0, 6)}`}
                </h2>

                <p
                  className={`text-center font-semibold text-lg transition-colors duration-300 ${
                    available ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {available ? "AVAILABLE" : "BOOKED"}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Booking Form */}
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 max-w-lg mx-auto
      transition-all duration-300 hover:shadow-2xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Book a Table
        </h2>

        <input
          type="text"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4
          focus:ring-2 focus:ring-green-400 outline-none transition-all"
        />

        <input
          type="number"
          placeholder="Number of Members"
          value={members}
          min="1"
          onChange={(e) => setMembers(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-6
          focus:ring-2 focus:ring-green-400 outline-none transition-all"
        />

        <button
          onClick={bookTable}
          disabled={isUpdating || !selectedTableId}
          className={`w-full py-3 rounded-lg font-semibold text-white
          transition-all duration-200 active:scale-95 ${
            isUpdating || !selectedTableId
              ? "bg-green-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isUpdating ? "Booking..." : "Confirm Booking"}
        </button>
      </div>

      {/* Add Table Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full transform transition-all duration-300 scale-100">
            <h3 className="text-2xl font-bold mb-6 text-center">
              Add New Table
            </h3>

            <input
              type="text"
              placeholder="Table Name"
              value={newTableName}
              onChange={(e) => setNewTableName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-6 transition-all"
            />

            <div className="flex gap-4">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-gray-300 py-3 rounded-lg transition-all duration-200 active:scale-95"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTable}
                disabled={isAdding}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg transition-all duration-200 active:scale-95"
              >
                {isAdding ? "Adding..." : "Add Table"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableBooking;
