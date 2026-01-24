import React, { useState } from "react";
import {
  useGetTableQuery,
  useUpdateTableMutation,
  useAddTableMutation,
  useRemoveTableMutation,
} from "../store/api/tableApi";

const TableBooking = () => {
  const {
    data: rawTablesData,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetTableQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  // Sort: oldest first (smaller id), newest last (larger id)
  const tables = Array.isArray(rawTablesData)
    ? [...rawTablesData].sort((a, b) => a.id.localeCompare(b.id))
    : rawTablesData?.tables ||
      rawTablesData?.data ||
      rawTablesData?.items ||
      [];
  console.log("Data=>".tables)
  const [updateTable, { isLoading: isUpdating }] = useUpdateTableMutation();
  const [addTable, { isLoading: isAdding }] = useAddTableMutation();
  const [removeTable, { isLoading: isDeleting }] = useRemoveTableMutation();

  const [customerName, setCustomerName] = useState("");
  const [members, setMembers] = useState("");
  const [selectedTableId, setSelectedTableId] = useState(null);

  // Add modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTableName, setNewTableName] = useState("");

  const bookTable = async () => {
    if (!selectedTableId) {
      alert("Please select an available table first.");
      return;
    }
    if (!customerName.trim() || !members || Number(members) < 1) {
      alert("Please enter customer name and number of members (at least 1).");
      return;
    }

    const selectedTable = tables.find((t) => t.id === selectedTableId);
    if (!selectedTable) {
      alert("Selected table not found.");
      return;
    }

    const payload = {
      id: selectedTableId,
      status: "BOOKED",
    };

    try {
      await updateTable(payload).unwrap();
      alert("Table booked successfully!");
      setCustomerName("");
      setMembers("");
      setSelectedTableId(null);
    } catch (err) {
      console.error("Booking failed:", err);
      alert(err?.data?.message || "Failed to book table.");
    }
  };

  const handleAddTable = async () => {
    if (!newTableName.trim()) {
      alert("Please enter a table name");
      return;
    }

    try {
      await addTable({
        name: newTableName.trim(),
        status: "FREE",
        isAvailable: true,
      }).unwrap();

      alert("New table added successfully!");
      setNewTableName("");
      setShowAddModal(false);
    } catch (err) {
      console.error("Add table failed:", err);
      alert(err?.data?.message || "Failed to add new table.");
    }
  };

  const handleDeleteTable = async (tableId, tableName) => {
    if (!window.confirm(`Are you sure you want to delete "${tableName || "this table"}"?`)) {
      return;
    }

    try {
      await removeTable({ id: tableId }).unwrap();
      alert("Table deleted successfully!");
    } catch (err) {
      console.error("Delete failed:", err);
      alert(err?.data?.message || "Failed to delete table.");
    }
  };

  const isTableAvailable = (table) => {
    if (table.isAvailable !== undefined) return table.isAvailable === true;
    if (table.status) {
      return (
        table.status.toUpperCase() === "FREE" ||
        table.status.toUpperCase() === "AVAILABLE"
      );
    }
    return true;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl font-medium text-gray-600">Loading tables...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-lg text-center">
          <h2 className="text-xl font-bold text-red-700 mb-2">Error loading tables</h2>
          <p className="text-gray-700">
            {error?.data?.message || error?.error || "Please check your connection and try again."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-center flex-1">
          Table Booking Panel
        </h1>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium shadow transition disabled:opacity-50"
          disabled={isAdding}
        >
          {isAdding ? "Adding..." : "+ Add Table"}
        </button>
      </div>

      {/* Tables grid */}
      {tables.length === 0 ? (
        <div className="text-center py-12 text-gray-600 text-lg">
          No tables found
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 mb-16">
          {tables.map((table) => {
            const available = isTableAvailable(table);
            const isSelected = selectedTableId === table.id;
            const canDelete = available && !isDeleting;

            return (
              <div
                key={table.id}
                className={`rounded-xl p-5 shadow-md border-2 transition-all duration-200 relative
                  ${
                    !available
                      ? "bg-red-50 border-red-400 opacity-75 cursor-not-allowed"
                      : isSelected
                      ? "bg-green-100 border-green-600 shadow-lg scale-[1.03]"
                      : "bg-white border-green-300 hover:border-green-500 hover:shadow-lg cursor-pointer"
                  }`}
              >
                {/* Delete button - only for available tables */}
                {canDelete && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // prevent selecting the table
                      handleDeleteTable(table.id, table.name);
                    }}
                    className="absolute top-2 right-2 text-red-600 hover:text-red-800 bg-white rounded-full p-1 shadow-sm hover:bg-red-50 transition"
                    title="Delete table"
                    disabled={isDeleting}
                  >
                    🗑️
                  </button>
                )}

                <div
                  onClick={() => available && setSelectedTableId(table.id)}
                  className="pt-6" // give space for delete button
                >
                  <h2 className="text-xl font-bold text-center mb-2">
                    {table.name || `Table ${table.id?.slice(0, 8) || "?"}`}
                  </h2>

                  <p
                    className={`text-center font-semibold text-lg mb-3 ${
                      available ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {available ? "AVAILABLE" : "BOOKED"}
                  </p>

                  {!available && (
                    <div className="text-sm text-gray-700 text-center space-y-1">
                      <p>Reserved / Occupied</p>
                    </div>
                  )}

                  <div className="text-xs text-gray-500 mt-3 text-center opacity-70">
                    ID: {table.id?.slice(0, 8)}... • {table.status || "—"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Booking Form */}
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 max-w-lg mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">Book a Table</h2>

        <input
          type="text"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="number"
          placeholder="Number of Members"
          value={members}
          onChange={(e) => setMembers(e.target.value)}
          min="1"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-green-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />

        <button
          onClick={bookTable}
          disabled={isUpdating || !selectedTableId}
          className={`w-full py-3 rounded-lg font-semibold text-white transition ${
            isUpdating || !selectedTableId ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isUpdating ? "Booking..." : "Confirm Booking"}
        </button>

        {!selectedTableId && !isLoading && (
          <p className="text-center text-sm text-gray-500 mt-4">
            Select an available table to continue
          </p>
        )}
      </div>

      {/* Add Table Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-6 text-center">Add New Table</h3>

            <input
              type="text"
              placeholder="Table Name (e.g. VIP-01, Table 9)"
              value={newTableName}
              onChange={(e) => setNewTableName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex gap-4">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-lg font-medium transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTable}
                disabled={isAdding || !newTableName.trim()}
                className={`flex-1 py-3 rounded-lg font-medium text-white transition ${
                  isAdding || !newTableName.trim() ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                }`}
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