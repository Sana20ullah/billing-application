import React, { useEffect, useState } from "react";

export default function DayAmountForm() {
  const [daySales, setDaySales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    fetch(`${backendUrl}/api/daysales`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response not ok");
        return res.json();
      })
      .then((data) => {
        setDaySales(Array.isArray(data) ? data : []);
        const sum = (data || []).reduce(
          (acc, sale) => acc + (sale.totalAmount || 0),
          0
        );
        setTotal(sum);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch day sales", err);
        setDaySales([]);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-white">Loading...</div>;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl rounded-xl p-6 text-black shadow-lg max-h-[90vh] overflow-auto">
        <h2 className="text-xl font-bold mb-4 text-center">📆 Day Sales Summary</h2>

        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-gray-100 sticky top-0 text-xs">
            <tr>
              <th className="border px-3 py-2">Date & Time</th>
              <th className="border px-3 py-2">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {daySales.length > 0 ? (
              daySales.map((sale) => (
                <tr key={sale._id} className="bg-white">
                  <td className="border px-3 py-2">
                    {new Date(sale.date).toLocaleString()}
                  </td>
                  <td className="border px-3 py-2 font-semibold">
                    ₹{sale.totalAmount.toFixed(2)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="text-center py-4">
                  No sales data available.
                </td>
              </tr>
            )}
            <tr className="bg-blue-600 text-white font-bold text-base">
              <td className="border px-3 py-3 text-right">Grand Total</td>
              <td className="border px-3 py-3">₹{total.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mt-6"
          onClick={() => window.location.reload()}
        >
          Close
        </button>
      </div>
    </div>
  );
}
