import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

type Sweet = {
  _id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
};

const SweetsPage: React.FC = () => {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [q, setQ] = useState("");
  const [editingSweet, setEditingSweet] = useState<Sweet | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    category: "",
    price: 0,
    quantity: 0,
  });
  const { user } = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    fetchSweets();
  }, []);

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (q.trim()) {
        performSearch(q);
      } else {
        fetchSweets();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [q]);

  const fetchSweets = async () => {
    try {
      const res = await axios.get(`${API}/api/sweets`, {
        withCredentials: true,
      });
      setSweets(res.data);
    } catch (err) {
      showToast("Failed to fetch sweets", "error");
    }
  };

  const performSearch = async (searchQuery: string) => {
    try {
      const res = await axios.get(
        `${API}/api/sweets/search?name=${encodeURIComponent(searchQuery)}`,
        { withCredentials: true }
      );
      setSweets(res.data);
    } catch (err) {
      showToast("Search failed", "error");
    }
  };

  const purchase = async (id: string, sweetName: string) => {
    try {
      await axios.post(
        `${API}/api/sweets/${id}/purchase`,
        {},
        { withCredentials: true }
      );
      showToast(`Successfully purchased ${sweetName}!`, "success");
      fetchSweets();
    } catch (err) {
      const errorMessage =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message
          : undefined;
      showToast(errorMessage || "Purchase failed", "error");
    }
  };

  const startEdit = (sweet: Sweet) => {
    setEditingSweet(sweet);
    setEditForm({
      name: sweet.name,
      category: sweet.category,
      price: sweet.price,
      quantity: sweet.quantity,
    });
  };

  const cancelEdit = () => {
    setEditingSweet(null);
    setEditForm({ name: "", category: "", price: 0, quantity: 0 });
  };

  const saveEdit = async () => {
    if (!editingSweet) return;

    try {
      await axios.put(`${API}/api/sweets/${editingSweet._id}`, editForm, {
        withCredentials: true,
      });
      showToast("Sweet updated successfully!", "success");
      setEditingSweet(null);
      fetchSweets();
    } catch (err) {
      const errorMessage =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message
          : undefined;
      showToast(errorMessage || "Failed to update sweet", "error");
    }
  };

  const deleteSweet = async (id: string, sweetName: string) => {
    if (!confirm(`Are you sure you want to delete "${sweetName}"?`)) return;

    try {
      await axios.delete(`${API}/api/sweets/${id}`, { withCredentials: true });
      showToast(`"${sweetName}" deleted successfully`, "success");
      fetchSweets();
    } catch (err) {
      const errorMessage =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message
          : undefined;
      showToast(errorMessage || "Failed to delete sweet", "error");
    }
  };

  const clearSearch = () => {
    setQ("");
  };

  const getSweetIcon = (category: string) => {
    const categoryLower = category.toLowerCase();
    if (categoryLower.includes("chocolate")) return "🍫";
    if (categoryLower.includes("candy")) return "🍬";
    if (categoryLower.includes("cake")) return "🎂";
    if (categoryLower.includes("cookie")) return "🍪";
    if (
      categoryLower.includes("ice cream") ||
      categoryLower.includes("icecream")
    )
      return "🍦";
    if (categoryLower.includes("donut") || categoryLower.includes("doughnut"))
      return "🍩";
    if (categoryLower.includes("lollipop")) return "🍭";
    if (categoryLower.includes("gummy")) return "🐻";
    if (categoryLower.includes("pie")) return "🥧";
    if (categoryLower.includes("cupcake")) return "🧁";
    return "🍰"; // default sweet icon
  };

  return (
    <div>
      {/* Search Bar */}
      <div className="mb-6 relative">
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            🔍
          </span>
          <input
            className="w-full p-3 pl-10 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Search sweets by name... (auto-search as you type)"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        {q && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg"
          >
            ❌
          </button>
        )}
      </div>

      {/* Edit Modal */}
      {editingSweet && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              ✏️ Edit Sweet
            </h3>
            <div className="space-y-4">
              <input
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Name"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
              />
              <input
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Category"
                value={editForm.category}
                onChange={(e) =>
                  setEditForm({ ...editForm, category: e.target.value })
                }
              />
              <input
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Price"
                type="number"
                step="0.01"
                value={editForm.price}
                onChange={(e) =>
                  setEditForm({ ...editForm, price: Number(e.target.value) })
                }
              />
              <input
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Quantity"
                type="number"
                value={editForm.quantity}
                onChange={(e) =>
                  setEditForm({ ...editForm, quantity: Number(e.target.value) })
                }
              />
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={saveEdit}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors"
              >
                Save Changes
              </button>
              <button
                onClick={cancelEdit}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-md transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sweets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sweets.map((s) => (
          <div
            key={s._id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-l-pink-400"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                {getSweetIcon(s.category)} {s.name}
              </h3>
              <span className="text-2xl opacity-20">🍭</span>
            </div>
            <p className="text-gray-600 mb-2 flex items-center gap-2">
              <span className="bg-gray-100 px-2 py-1 rounded-full text-xs font-medium">
                📂 {s.category}
              </span>
              <span className="text-green-600 font-bold flex items-center gap-1">
                💰 ₹{s.price}
              </span>
            </p>
            <p className="text-sm text-gray-500 mb-4 flex items-center gap-1">
              📦 Stock:{" "}
              <span
                className={
                  s.quantity > 0
                    ? "text-green-600 font-semibold"
                    : "text-red-600 font-semibold"
                }
              >
                {s.quantity} {s.quantity === 1 ? "piece" : "pieces"}
              </span>
              {s.quantity <= 5 && s.quantity > 0 && (
                <span className="text-orange-500 text-xs ml-2">
                  ⚠️ Low stock!
                </span>
              )}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => purchase(s._id, s.name)}
                disabled={s.quantity === 0}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-2 px-4 rounded-md transition-colors font-medium flex items-center justify-center gap-2"
              >
                {s.quantity === 0 ? <>❌ Out of Stock</> : <>🛒 Buy Now</>}
              </button>
              {user?.role === "admin" && (
                <>
                  <button
                    onClick={() => startEdit(s)}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-md transition-colors hover:scale-105"
                    title="Edit Sweet"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => deleteSweet(s._id, s.name)}
                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-md transition-colors hover:scale-105"
                    title="Delete Sweet"
                  >
                    🗑️
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {sweets.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">{q ? "🔍" : "🍭"}</div>
          <p className="text-gray-500 text-lg">
            {q
              ? `No sweets found matching "${q}" 😔`
              : "No sweets available yet 🏪"}
          </p>
          {!q && user?.role === "admin" && (
            <p className="text-gray-400 text-sm mt-2">
              ➕ Add some delicious sweets to get started!
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SweetsPage;
