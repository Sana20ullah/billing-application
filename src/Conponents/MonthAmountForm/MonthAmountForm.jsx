import React, { useEffect, useState } from "react";

export default function MonthAmountForm({ onClose }) {
  const [monthSales, setMonthSales] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/monthsales")
      .then((res) => res.json())
      .then((data) => {
        // 👇 Validate the response
        if (!Array.isArray(data)) {
          throw new Error("Invalid data format received");
        }

        setMonthSales(data);
        const sum = data.reduce((acc, item) => acc + (item.totalAmount || 0), 0);
        setTotal(sum);
      })
      .catch((err) => {
        console.error("Failed to fetch month sales:", err);
        setError("Failed to load monthly sales data.");
        setMonthSales([]); // Ensure .map won't crash
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white w-[450px] rounded-xl p-6 text-black shadow-lg max-h-[90vh] overflow-auto">
        <h2 className="text-xl font-bold mb-4 text-center">📅 Monthly Sales</h2>

        <table className="w-full border-collapse text-left">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="border px-3 py-2">Date</th>
              <th className="border px-3 py-2">Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {monthSales.length > 0 ? (
              monthSales.map((record, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="border px-3 py-2">
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                  <td className="border px-3 py-2">
                    ₹{record.totalAmount?.toFixed(2) || "0.00"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border px-3 py-2 text-center text-gray-500" colSpan={2}>
                  No monthly sales found.
                </td>
              </tr>
            )}

            <tr className="bg-green-600 text-white font-bold text-lg">
              <td className="border px-3 py-3">Total</td>
              <td className="border px-3 py-3">₹{total.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mt-6"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
