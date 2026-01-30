import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [toast, setToast] = useState(null);

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

  const [addCategoryApi] = useAddCategoryMutation();
  const [addItemApi] = useAddItemMutation();
  const [removeCategoryApi] = useRemoveCategoryMutation();
  const [removeMenuItemApi] = useRemoveMenuItemMutation();

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

    for (const cat of categories) {
      const catId = cat._id || cat.id;
      if (!catId) continue;

      map[cat.name] = {
        category: cat.name,
        categoryId: catId,
        items: [],
      };
    }

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

    await addCategoryApi({ name: newCategory.trim() }).unwrap();

    setToast({
      type: "success",
      message: `Category "${newCategory}" added successfully`,
    });

    setNewCategory("");
    setShowCategoryForm(false);

    setTimeout(() => setToast(null), 3000);
  };


  const addMenuItem = async () => {
    if (!newItem.categoryId) return alert("Select category");
    if (!newItem.name.trim()) return alert("Item name required");

    const price = Number(newItem.price);
    if (!price || price <= 0) return alert("Invalid price");

    await addItemApi({
      category: newItem.categoryId,
      name: newItem.name.trim(),
      price,
    }).unwrap();

    setToast({
      type: "success",
      message: `Item "${newItem.name}" added successfully ✅`,
    });

    setNewItem({ categoryId: "", name: "", price: "" });
    setShowItemForm(false);

    setTimeout(() => setToast(null), 3000);
  };


  const handleRemoveCategory = async (categoryId, categoryName) => {
    if (!window.confirm(`Delete "${categoryName}" category?`)) return;
    await removeCategoryApi({ id: categoryId }).unwrap();
  };

  const handleRemoveItem = async (itemId, itemName) => {
    if (!window.confirm(`Delete "${itemName}"?`)) return;
    await removeMenuItemApi({ id: itemId }).unwrap();
  };

  if (isLoading)
    return <div className="text-center mt-20 text-xl">Loading Menu...</div>;

  if (error)
    return (
      <div className="text-red-600 text-center mt-10">
        Something went wrong!
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gray-100 py-10 px-4"
    >
      <h1 className="text-4xl font-bold text-center text-red-600 mb-8">
        Our Menu
      </h1>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
        <button
          onClick={() => {
            setShowCategoryForm(!showCategoryForm);
            setShowItemForm(false);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          {showCategoryForm ? "Cancel" : "Add Category"}
        </button>

        <button
          onClick={() => {
            setShowItemForm(!showItemForm);
            setShowCategoryForm(false);
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
        >
          {showItemForm ? "Cancel" : "Add Menu Item"}
        </button>
      </div>

      {/* Category Form */}
      <AnimatePresence>
        {showCategoryForm && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg mb-10"
          >
            <input
              className="border w-full px-4 py-3 rounded-lg mb-4"
              placeholder="Category name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <button
              onClick={addCategory}
              className="w-full bg-blue-600 text-white py-3 rounded-lg"
            >
              Add Category
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Item Form */}
      <AnimatePresence>
        {showItemForm && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg mb-12"
          >
            <div className="grid sm:grid-cols-3 gap-4">
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

            <button
              onClick={addMenuItem}
              className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg"
            >
              Add Item
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Menu Sections */}
      <div className="max-w-6xl mx-auto space-y-14">
        {/* Toast Notification */}
        <AnimatePresence>
          {toast && (
            <motion.div
              key="toast"
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="fixed top-6 right-6 z-50 bg-green-600 text-white px-6 py-4 rounded-xl shadow-2xl"
            >
              {toast.message}
            </motion.div>
          )}
        </AnimatePresence>

        {groupedMenu.map((section) => (
          <motion.div
            key={section.categoryId}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="bg-white rounded-xl shadow p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold border-l-4 border-red-500 pl-3">
                {section.category}
              </h2>

              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() =>
                  handleRemoveCategory(
                    section.categoryId,
                    section.category
                  )
                }
                className="bg-red-100 text-red-700 px-4 py-2 rounded-lg"
              >
                Delete Category
              </motion.button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.items.map((item) => {
                const itemId = item._id || item.id;
                return (
                  <motion.div
                    key={itemId}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -6, scale: 1.03 }}
                    className="bg-gray-50 p-5 rounded-lg border relative group"
                  >
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-green-700 font-bold mt-3 text-lg">
                      ₹{Number(item.price).toFixed(2)}
                    </p>

                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() =>
                        handleRemoveItem(itemId, item.name)
                      }
                      className="absolute top-3 right-3 bg-red-500 text-white w-8 h-8 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition"
                    >
                      ✕
                    </motion.button>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default MenuPage;
