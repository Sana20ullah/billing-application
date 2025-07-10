import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

const ProductsList = ({ onClose }) => {
  const [products, setProducts] = useState([]);

  // Use the env variable or localhost fallback
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || (window.location.hostname === "localhost" ? "http://localhost:5000" : "");

  const fetchProducts = () => {
    fetch(`${BACKEND_URL}/api/products`)
      .then((res) => res.json())
      .then(setProducts)
      .catch((err) => {
        alert("Failed to load products");
        console.error(err);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`${BACKEND_URL}/api/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      alert("Product deleted!");
      fetchProducts(); // Refresh the product list
    } catch (err) {
      alert("Error deleting product");
      console.error(err);
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-auto">
      <div className="bg-white text-black p-6 rounded shadow-lg w-[600px] max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">📦 All Products</h2>
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1 text-left">#</th>
              <th className="border px-2 py-1 text-left">Item</th>
              <th className="border px-2 py-1 text-left">Qty</th>
              <th className="border px-2 py-1 text-left">Rate</th>
              <th className="border px-2 py-1 text-left">Barcode</th>
              <th className="border px-2 py-1 text-center">🗑</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr key={p._id}>
                <td className="border px-2 py-1">{i + 1}</td>
                <td className="border px-2 py-1">{p.name}</td>
                <td className="border px-2 py-1">{p.qty}</td>
                <td className="border px-2 py-1">{p.rate}</td>
                <td className="border px-2 py-1">{p.barcode}</td>
                <td className="border px-2 py-1 text-center">
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
