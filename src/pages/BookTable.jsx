import React, { useState } from "react";

const TableBooking = () => {
  /* INITIAL 8 TABLES */
  const [tables, setTables] = useState(
    Array.from({ length: 8 }, (_, i) => ({
      id: i + 1,
      booked: false,
      bookedBy: "",
      members: 0,
    }))
  );

  const [customerName, setCustomerName] = useState("");
  const [members, setMembers] = useState("");
  const [selectedTable, setSelectedTable] = useState(null);
  const [newTableCount, setNewTableCount] = useState("");

  /* BOOK TABLE */
  const bookTable = () => {
    if (!selectedTable || !customerName.trim() || !members) {
      alert("Please select table, customer name and number of members");
      return;
    }

    setTables((prev) =>
      prev.map((table) =>
        table.id === selectedTable
          ? {
              ...table,
              booked: true,
              bookedBy: customerName,
              members: Number(members),
            }
          : table
      )
    );

    setCustomerName("");
    setMembers("");
    setSelectedTable(null);
  };

  /* ADD NEW TABLES */
  const addTables = () => {
    const count = Number(newTableCount);
    if (!count || count <= 0) return;

    const lastId = tables.length;
    const newTables = Array.from({ length: count }, (_, i) => ({
      id: lastId + i + 1,
      booked: false,
      bookedBy: "",
      members: 0,
    }));

    setTables([...tables, ...newTables]);
    setNewTableCount("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
        Table Booking Panel
      </h1>

      {/* TABLE CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-16">
        {tables.map((table) => (
          <div
            key={table.id}
            onClick={() => !table.booked && setSelectedTable(table.id)}
            className={`rounded-xl p-4 shadow-md border-2 transition
              ${
                table.booked
                  ? "bg-red-100 border-red-600 cursor-not-allowed opacity-80"
                  : selectedTable === table.id
                  ? "bg-green-200 border-green-700 cursor-pointer"
                  : "bg-white border-green-500 hover:bg-green-50 cursor-pointer"
              }`}
          >
            <h2 className="text-lg font-semibold">Table {table.id}</h2>

            <p
              className={`mt-2 font-medium ${
                table.booked ? "text-red-600" : "text-green-600"
              }`}
            >
              {table.booked ? "Booked" : "Available"}
            </p>

            {table.booked && (
              <>
                <p className="text-sm text-gray-700 mt-1">
                  By: {table.bookedBy}
                </p>
                <p className="text-sm text-gray-700">
                  Members: {table.members}
                </p>
              </>
            )}
          </div>
        ))}
      </div>

      {/* BOOKING FORM */}
      <div className="bg-white rounded-xl shadow p-4 md:p-6 mb-6 max-w-xl mx-auto mt-6">
        <h2 className="text-xl font-semibold mb-4">Book Table Manually</h2>

        <input
          type="text"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 mb-3"
        />

        <input
          type="number"
          placeholder="Number of Members"
          value={members}
          onChange={(e) => setMembers(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 mb-3"
          min="1"
        />

        <button
          onClick={bookTable}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Book Selected Table
        </button>
      </div>

    </div>
  );
};

export default TableBooking;
