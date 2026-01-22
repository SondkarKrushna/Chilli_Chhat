import React, { useState, useMemo } from "react";
import {
  useGetItemsQuery,
  useAddCategoryMutation,
  useAddItemMutation,
  useGetCategoriesQuery,
} from "../store/api/menuApi";

const MenuPage = () => {
  // 🔹 FETCH DISHES
  const { data, isLoading, error } = useGetItemsQuery();

  // 🔹 FETCH CATEGORIES (NEW)
  const { data: categoriesData = [] } = useGetCategoriesQuery();

  // ✅ HANDLE ANY API RESPONSE SHAPE
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
  console.log("categories raw response:", categoriesData);
  console.log("categories processed array length:", categories.length);
  console.log("first category object (if exists):", categories[0]);
  const [addCategoryApi] = useAddCategoryMutation();
  const [addItemApi] = useAddItemMutation();

  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showItemForm, setShowItemForm] = useState(false);

  const [newCategory, setNewCategory] = useState("");
  const [newItem, setNewItem] = useState({
    categoryId: "", // will store categoryId
    name: "",
    price: "",
    // desc: "",
  });

  // ✅ GROUP ITEMS BY CATEGORY (FOR DISPLAY ONLY)
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
          items: [],
        };
      }

      map[categoryName].items.push(item);
    }

    return Object.values(map);
  }, [menuData]);

  // ✅ ADD CATEGORY
  const addCategory = async () => {
    if (!newCategory.trim()) return alert("Enter category name");

    try {
      await addCategoryApi({ name: newCategory }).unwrap();
      setNewCategory("");
      setShowCategoryForm(false);
    } catch (err) {
      console.error(err);
      alert("Failed to add category");
    }
  };

  // ✅ ADD MENU ITEM
  // const addMenuItem = async () => {
  //   if (!newItem.categoryId || !newItem.name || !newItem.price) {
  //     return alert("Fill all required fields");
  //   }

  //   try {
  //     await addItemApi({
  //       category: newItem.categoryId, // ✅ categoryId
  //       name: newItem.name,
  //       price: Number(newItem.price),
  //       // desc: newItem.desc,
  //     }).unwrap();

  //     setNewItem({ category: "", name: "", price: "", desc: "" });
  //     setShowItemForm(false);
  //   } catch (err) {
  //     console.error("ADD ITEM ERROR:", err);
  //     alert("Failed to add item");
  //   }
  // };
  const addMenuItem = async () => {
    if (!newItem.categoryId?.trim()) {
      alert("Please select a category");
      return;
    }

    if (!newItem.name?.trim()) {
      alert("Item name is required");
      return;
    }

    const priceNum = Number(newItem.price);
    if (!newItem.price || isNaN(priceNum) || priceNum <= 0) {
      alert("Please enter a valid price (> 0)");
      return;
    }

    try {
      console.log("→ Sending to backend:", {
        category: newItem.categoryId,
        name: newItem.name,
        price: Number(newItem.price),
      });
      await addItemApi({
        category: newItem.categoryId,
        name: newItem.name.trim(),
        price: priceNum,
        // description: newItem.description?.trim() || undefined,
      }).unwrap();

      setNewItem({
        categoryId: "",
        name: "",
        price: "",
        // description: "",   
      });

      setShowItemForm(false);
      alert("Item added successfully!");
    } catch (err) {
      console.error("ADD ITEM ERROR:", err);
      // Better error message
      const msg = err?.data?.message || err?.message || "Failed to add item";
      alert(msg);
    }
  };
  // 🔄 STATES
  if (isLoading) {
    return (
      <div className="text-center mt-20 text-xl font-semibold">
        Loading Menu...
      </div>
    );
  }

  if (error) {
    return (
      <pre className="text-red-600 p-6">
        {JSON.stringify(error, null, 2)}
      </pre>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-4xl font-bold text-center text-red-600 mb-8">
        Our Menu
      </h1>

      {/* ACTION BUTTONS */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
        <button
          onClick={() => {
            setShowCategoryForm(!showCategoryForm);
            setShowItemForm(false);
          }}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Add Category
        </button>

        <button
          onClick={() => {
            setShowItemForm(!showItemForm);
            setShowCategoryForm(false);
          }}
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          Add Menu Item
        </button>
      </div>

      {/* ADD CATEGORY FORM */}
      {showCategoryForm && (
        <div className="max-w-xl mx-auto bg-white p-6 rounded shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Add New Category
          </h2>
          <input
            className="border w-full px-4 py-2 rounded mb-4"
            placeholder="Category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <button
            onClick={addCategory}
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            Add Category
          </button>
        </div>
      )}

      {/* ADD ITEM FORM */}
      {showItemForm && (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow mb-10">
          <h2 className="text-xl font-semibold mb-4">
            Add New Menu Item
          </h2>

          <div className="grid grid-cols-1 bordersm:grid-cols-2 gap-4">
            <select className="border rounded px-4 py-2"
              value={newItem.categoryId}
              onChange={(e) => setNewItem({ ...newItem, categoryId: e.target.value })}
            >
              <option value="">Select Category</option>

              {categories.map((cat, index) => (
                <option
                  key={cat._id || cat.id || `cat-${index}`}
                  value={cat._id || cat.id || ""}
                >
                  {cat.name}
                </option>
              ))}
            </select>

            <input
              className="border rounded px-4 py-2"
              placeholder="Item name"
              value={newItem.name}
              onChange={(e) =>
                setNewItem({ ...newItem, name: e.target.value })
              }
            />

            <input
              type="number"
              className="border rounded px-4 py-2"
              placeholder="Price"
              value={newItem.price}
              onChange={(e) =>
                setNewItem({ ...newItem, price: e.target.value })
              }
            />

            {/* <input
              className="border rounded px-4 py-2"
              placeholder="Description"
              value={newItem.desc}
              onChange={(e) =>
                setNewItem({ ...newItem, desc: e.target.value })
              }
            /> */}
          </div>

          <button
            onClick={addMenuItem}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded"
          >
            Add Item
          </button>
        </div>
      )}

      {/* MENU DISPLAY */}
      <div className="max-w-6xl mx-auto space-y-12">
        {groupedMenu.map((section) => (
          <div key={section.category}>
            <h2 className="text-2xl font-semibold mb-6 border-l-4 border-red-500 pl-3">
              {section.category}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.items.map((item) => (
                <div
                  key={item._id}
                  className="bg-white p-5 rounded-xl shadow"
                >
                  <h3 className="text-xl font-semibold">
                    {typeof item.name === "string"
                      ? item.name
                      : item.name?.name}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {typeof item.desc === "string"
                      ? item.desc
                      : item.desc?.text}
                  </p>
                  <p className="text-green-600 font-bold mt-2">
                    ₹{item.price}
                  </p>
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
