import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ReturnSaleForm({ onClose }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    productName: "",
    quantity: 1,
    reason: "",
  });

  const [returns, setReturns] = useState([]);
  const [error, setError] = useState(null);

  // ✅ Always use backend hosted on Render (MongoDB live)
  const backendURL = "https://billing-backend-mp2p.onrender.com";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchReturns = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/returns`);
      if (Array.isArray(res.data)) {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const filteredReturns = res.data.filter((item) => {
          const returnDate = new Date(item.createdAt);
          return returnDate >= oneWeekAgo;
        });

        setReturns(filteredReturns);
        setError(null);
      } else {
        setReturns([]);
        setError("Data format error: Expected an array.");
      }
    } catch (err) {
      console.error("Error fetching returns:", err);
      setError("Failed to load returned products.");
    }
  };

  useEffect(() => {
    fetchReturns();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${backendURL}/api/returns`, formData);
      alert("Return submitted successfully!");
      setFormData({
        customerName: "",
        productName: "",
        quantity: 1,
        reason: "",
      });
      setShowForm(false);
      fetchReturns();
    } catch (error) {
      console.error("Error submitting return:", error);
      setError("Failed to submit return.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded shadow-md max-w-4xl w-full max-h-[90vh] overflow-auto text-black relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-xl text-gray-500 hover:text-red-600"
          aria-label="Close Return Form"
        >
          ✖
        </button>

        <h2 className="text-2xl font-semibold mb-4">🛠 Return Product</h2>

        <button
          onClick={() => setShowForm(!showForm)}
          className="mb-6 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {showForm ? "Hide Return Form" : "➕ Add New Return"}
        </button>

        {showForm && (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <input
              type="text"
              name="customerName"
              placeholder="Customer Name"
              value={formData.customerName}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              name="productName"
              placeholder="Product Name"
              value={formData.productName}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleChange}
              min={1}
              required
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              name="reason"
              placeholder="Reason"
              value={formData.reason}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="md:col-span-4 bg-green-600 text-white rounded px-6 py-2 hover:bg-green-700 transition"
            >
              Submit Return
            </button>
          </form>
        )}

        <h3 className="font-bold text-lg mb-3">📦 Returned Products (Last 7 Days)</h3>

        {error && <p className="text-red-600 mb-3">{error}</p>}

        {Array.isArray(returns) && returns.length > 0 ? (
          <div className="overflow-x-auto max-h-[40vh] border border-gray-300 rounded">
            <table className="min-w-full divide-y divide-gray-200 text-left">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="px-4 py-2 text-sm font-semibold">Customer Name</th>
                  <th className="px-4 py-2 text-sm font-semibold">Product Name</th>
                  <th className="px-4 py-2 text-sm font-semibold">Quantity</th>
                  <th className="px-4 py-2 text-sm font-semibold">Reason</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {returns.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{item.customerName}</td>
                    <td className="px-4 py-2">{item.productName}</td>
                    <td className="px-4 py-2">{item.quantity}</td>
                    <td className="px-4 py-2">{item.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">No return records found.</p>
        )}
      </div>
    </div>
  );
}
