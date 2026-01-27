import React, { useState, useMemo } from "react";
import {
  useGetItemsQuery,
  useAddCategoryMutation,
  useAddItemMutation,
  useGetCategoriesQuery,
  useRemoveCategoryMutation,
  useRemoveMenuItemMutation,
} from "../store/api/menuApi";

const MenuPage = () => {
  // ── Data Fetching ────────────────────────────────────────
  const { data, isLoading, error } = useGetItemsQuery();
  const { data: categoriesData = [] } = useGetCategoriesQuery();

  // ── Mutations ────────────────────────────────────────────
  const [addCategoryApi] = useAddCategoryMutation();
  const [addItemApi] = useAddItemMutation();
  const [removeCategoryApi, { isLoading: isRemovingCategory }] = useRemoveCategoryMutation();
  const [removeMenuItemApi, { isLoading: isRemovingItem }] = useRemoveMenuItemMutation();

  // ── Processed Data ───────────────────────────────────────
  const menuData = Array.isArray(data)
    ? data
    : Array.isArray(data?.data)
      ? data.data
      : [];

  const categories = Array.isArray(categoriesData)
    ? categoriesData
    : Array.isArray(categoriesData?.data)
      ? categoriesData.data
      : [];

  // ── Grouping items by category ───────────────────────────
  const groupedMenu = useMemo(() => {
    const map = {};

    for (const item of menuData) {
      if (!item?.category) continue;

      const categoryName =
        typeof item.category === "string"
          ? item.category
          : item.category?.name;

      if (!categoryName) continue;

      if (!map[categoryName]) {
        map[categoryName] = {
          category: categoryName,
          categoryId: item.category?._id || item.category?.id || null,
          items: [],
        };
      }

      map[categoryName].items.push(item);
    }

    return Object.values(map);
  }, [menuData]);

  // ── State ────────────────────────────────────────────────
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showItemForm, setShowItemForm] = useState(false);

  const [newCategory, setNewCategory] = useState("");
  const [newItem, setNewItem] = useState({
    categoryId: "",
    name: "",
    price: "",
  });

  // ── Add Category ─────────────────────────────────────────
  const addCategory = async () => {
    if (!newCategory.trim()) return alert("Enter category name");

    try {
      await addCategoryApi({ name: newCategory.trim() }).unwrap();
      setNewCategory("");
      setShowCategoryForm(false);
    } catch (err) {
      console.error(err);
      alert(err?.data?.message || "Failed to add category");
    }
  };

  // ── Add Menu Item ────────────────────────────────────────
  const addMenuItem = async () => {
    if (!newItem.categoryId?.trim()) return alert("Please select a category");
    if (!newItem.name?.trim()) return alert("Item name is required");

    const priceNum = Number(newItem.price);
    if (!newItem.price || isNaN(priceNum) || priceNum <= 0) {
      return alert("Please enter a valid price (> 0)");
    }

    try {
      await addItemApi({
        category: newItem.categoryId,
        name: newItem.name.trim(),
        price: priceNum,
      }).unwrap();

      setNewItem({ categoryId: "", name: "", price: "" });
      setShowItemForm(false);
      alert("Item added successfully!");
    } catch (err) {
      console.error("ADD ITEM ERROR:", err);
      alert(err?.data?.message || "Failed to add item");
    }
  };

  // ── Remove Category ──────────────────────────────────────
  const handleRemoveCategory = async (categoryId, categoryName) => {
    if (!window.confirm(`Delete category "${categoryName}" and all its items?`)) {
      return;
    }

    try {
      await removeCategoryApi({ id: categoryId }).unwrap();
      alert("Category deleted successfully");
    } catch (err) {
      console.error("DELETE CATEGORY ERROR:", err);
      alert(err?.data?.message || "Failed to delete category");
    }
  };

  // ── Remove Menu Item ─────────────────────────────────────
  const handleRemoveItem = async (itemId, itemName) => {
    if (!window.confirm(`Delete item "${itemName}"?`)) {
      return;
    }

    try {
      await removeMenuItemApi({ id: itemId }).unwrap();
      alert("Item deleted successfully");
    } catch (err) {
      console.error("DELETE ITEM ERROR:", err);
      alert(err?.data?.message || "Failed to delete item");
    }
  };

  // ── Loading / Error States ───────────────────────────────
  if (isLoading) {
    return <div className="text-center mt-20 text-xl font-semibold">Loading Menu...</div>;
  }

  if (error) {
    return (
      <pre className="text-red-600 p-6 bg-red-50 rounded max-w-4xl mx-auto">
        {JSON.stringify(error, null, 2)}
      </pre>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-4xl font-bold text-center text-red-600 mb-8">Our Menu</h1>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
        <button
          onClick={() => {
            setShowCategoryForm(!showCategoryForm);
            setShowItemForm(false);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
        >
          {showCategoryForm ? "Cancel" : "Add Category"}
        </button>

        <button
          onClick={() => {
            setShowItemForm(!showItemForm);
            setShowCategoryForm(false);
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition"
        >
          {showItemForm ? "Cancel" : "Add Menu Item"}
        </button>
      </div>

      {/* Add Category Form */}
      {showCategoryForm && (
        <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg mb-10">
          <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
          <input
            className="border w-full px-4 py-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Category name (e.g. Starters, Main Course)"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <div className="flex gap-3">
            <button
              onClick={addCategory}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Add Category
            </button>
            <button
              onClick={() => setShowCategoryForm(false)}
              className="flex-1 bg-gray-300 text-gray-800 py-3 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Add Item Form */}
      {showItemForm && (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg mb-12">
          <h2 className="text-xl font-semibold mb-5">Add New Menu Item</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <select
              className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={newItem.categoryId}
              onChange={(e) => setNewItem({ ...newItem, categoryId: e.target.value })}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id || cat.id} value={cat._id || cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <input
              className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Item name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />

            <input
              type="number"
              className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Price (₹)"
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            />
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={addMenuItem}
              className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
            >
              Add Item
            </button>
            <button
              onClick={() => setShowItemForm(false)}
              className="flex-1 bg-gray-300 text-gray-800 py-3 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Menu Display */}
      <div className="max-w-6xl mx-auto space-y-14">
        {groupedMenu.length === 0 && (
          <p className="text-center text-gray-500 text-lg">No menu items yet. Add some categories and dishes!</p>
        )}

        {groupedMenu.map((section) => (
          <div key={section.category} className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold border-l-4 border-red-500 pl-3">
                {section.category}
              </h2>

              {section.categoryId && (
                <button
                  onClick={() => handleRemoveCategory(section.categoryId, section.category)}
                  disabled={isRemovingCategory}
                  className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 disabled:opacity-50"
                >
                  {isRemovingCategory ? "Deleting..." : "Delete Category"}
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.items.map((item) => (
                <div
                  key={item._id}
                  className="bg-gray-50 p-5 rounded-lg border border-gray-200 hover:shadow-md transition relative group"
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>

                  {/* {item.description && (
                    <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                  )} */}

                  <p className="text-green-700 font-bold mt-3 text-lg">
                    ₹{Number(item.price).toFixed(2)}
                  </p>

                  <button
                    onClick={() => handleRemoveItem(item._id, item.name)}
                    disabled={isRemovingItem}
                    className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition disabled:opacity-50"
                    title="Delete item"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
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