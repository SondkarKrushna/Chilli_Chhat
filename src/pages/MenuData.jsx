import React, { useState, useEffect, useMemo } from "react";
import {
  useGetItemsQuery,
  useAddCategoryMutation,
  useAddItemMutation,
  useGetCategoriesQuery,
  useRemoveCategoryMutation,
  useRemoveMenuItemMutation,
} from "../store/api/menuApi";

const MenuPage = () => {

  useEffect(() => {
      document.title = "Add Menu | Restaurant Management System";
    }, []);
  const { data, isLoading, error } = useGetItemsQuery();
  const { data: categoriesData = [] } = useGetCategoriesQuery();

  // Normalize items
  const menuData = Array.isArray(data)
    ? data
    : Array.isArray(data?.data)
    ? data.data
    : [];

  // Normalize categories
  const categories = Array.isArray(categoriesData)
    ? categoriesData
    : Array.isArray(categoriesData?.data)
    ? categoriesData.data
    : [];

  const [addCategoryApi] = useAddCategoryMutation();
  const [addItemApi] = useAddItemMutation();
  const [removeCategoryApi, { isLoading: isRemovingCategory }] =
    useRemoveCategoryMutation();
  const [removeMenuItemApi, { isLoading: isRemovingItem }] =
    useRemoveMenuItemMutation();

  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showItemForm, setShowItemForm] = useState(false);

  const [newCategory, setNewCategory] = useState("");
  const [newItem, setNewItem] = useState({
    categoryId: "",
    name: "",
    price: "",
  });

  const groupedMenu = useMemo(() => {
    const map = {};

    // Source of truth → categories
    for (const cat of categories) {
      const catId = cat._id || cat.id;
      if (!catId) continue;

      map[cat.name] = {
        category: cat.name,
        categoryId: catId,
        items: [],
      };
    }

    // Assign items
    for (const item of menuData) {
      const categoryName =
        typeof item.category === "string"
          ? item.category
          : item.category?.name;

      if (!categoryName || !map[categoryName]) continue;

      map[categoryName].items.push(item);
    }

    return Object.values(map);
  }, [menuData, categories]);

  const addCategory = async () => {
    if (!newCategory.trim()) return alert("Enter category name");

    try {
      await addCategoryApi({ name: newCategory.trim() }).unwrap();
      setNewCategory("");
      setShowCategoryForm(false);
    } catch (err) {
      alert(err?.data?.message || "Failed to add category");
    }
  };

  const addMenuItem = async () => {
    if (!newItem.categoryId) return alert("Select category");
    if (!newItem.name.trim()) return alert("Item name required");

    const price = Number(newItem.price);
    if (!price || price <= 0) return alert("Invalid price");

    try {
      await addItemApi({
        category: newItem.categoryId,
        name: newItem.name.trim(),
        price,
      }).unwrap();

      setNewItem({ categoryId: "", name: "", price: "" });
      setShowItemForm(false);
    } catch (err) {
      alert(err?.data?.message || "Failed to add item");
    }
  };

  const handleRemoveCategory = async (categoryId, categoryName) => {
    if (!categoryId) return alert("Invalid category ID");

    if (!window.confirm(`Delete category "${categoryName}" and all its items?`))
      return;

    try {
      await removeCategoryApi({ id: categoryId }).unwrap();
    } catch (err) {
      alert(err?.data?.message || "Failed to delete category");
    }
  };

  const handleRemoveItem = async (itemId, itemName) => {
    if (!itemId) return alert("Invalid item ID");

    if (!window.confirm(`Delete item "${itemName}"?`)) return;

    try {
      await removeMenuItemApi({ id: itemId }).unwrap();
    } catch (err) {
      alert(err?.data?.message || "Failed to delete item");
    }
  };

  if (isLoading) {
    return (
      <div className="text-center mt-20 text-xl font-semibold">
        Loading Menu...
      </div>
    );
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
      <h1 className="text-4xl font-bold text-center text-red-600 mb-8">
        Our Menu
      </h1>

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
            className="border w-full px-4 py-3 rounded-lg mb-4"
            placeholder="Category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <div className="flex gap-3">
            <button
              onClick={addCategory}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg"
            >
              Add Category
            </button>
            <button
              onClick={() => setShowCategoryForm(false)}
              className="flex-1 bg-gray-300 py-3 rounded-lg"
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
              className="border rounded-lg px-4 py-3"
              value={newItem.categoryId}
              onChange={(e) =>
                setNewItem({ ...newItem, categoryId: e.target.value })
              }
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id || cat.id} value={cat._id || cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <input
              className="border rounded-lg px-4 py-3"
              placeholder="Item name"
              value={newItem.name}
              onChange={(e) =>
                setNewItem({ ...newItem, name: e.target.value })
              }
            />

            <input
              type="number"
              className="border rounded-lg px-4 py-3"
              placeholder="Price (₹)"
              value={newItem.price}
              onChange={(e) =>
                setNewItem({ ...newItem, price: e.target.value })
              }
            />
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={addMenuItem}
              className="flex-1 bg-green-600 text-white py-3 rounded-lg"
            >
              Add Item
            </button>
            <button
              onClick={() => setShowItemForm(false)}
              className="flex-1 bg-gray-300 py-3 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Menu Display */}
      <div className="max-w-6xl mx-auto space-y-14">
        {groupedMenu.map((section) => (
          <div key={section.categoryId} className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold border-l-4 border-red-500 pl-3">
                {section.category}
              </h2>

              <button
                onClick={() =>
                  handleRemoveCategory(
                    section.categoryId,
                    section.category
                  )
                }
                disabled={isRemovingCategory}
                className="bg-red-100 text-red-700 px-4 py-2 rounded-lg"
              >
                {isRemovingCategory ? "Deleting..." : "Delete Category"}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.items.map((item) => {
                const itemId = item._id || item.id;

                return (
                  <div
                    key={itemId}
                    className="bg-gray-50 p-5 rounded-lg border relative group"
                  >
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-green-700 font-bold mt-3 text-lg">
                      ₹{Number(item.price).toFixed(2)}
                    </p>

                    <button
                      onClick={() =>
                        handleRemoveItem(itemId, item.name)
                      }
                      disabled={isRemovingItem}
                      className="absolute top-3 right-3 bg-red-500 text-white w-8 h-8 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100"
                    >
                      ✕
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
