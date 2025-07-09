import React, { useEffect, useState } from "react";

export default function DayAmountForm() {
  const [daySales, setDaySales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch("https://billing-backend-mp2p.onrender.com/api/daysales")
      .then((res) => res.json())
      .then((data) => {
        setDaySales(data);
        const sum = data.reduce((acc, item) => acc + item.totalAmount, 0);
        setTotal(sum);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch day sales", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white w-[400px] rounded-xl p-6 text-black shadow-lg max-h-[90vh] overflow-auto">
        <h2 className="text-xl font-bold mb-4 text-center">📆 Day Sales Records</h2>

        <table className="w-full border-collapse text-left">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="border px-3 py-2">Date</th>
              <th className="border px-3 py-2">Total Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {daySales.map((record, idx) => (
              <tr
                key={idx}
                className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="border px-3 py-2">
                  {new Date(record.date).toLocaleDateString()}
                </td>
                <td className="border px-3 py-2">
                  ₹{record.totalAmount.toFixed(2)}
                </td>
              </tr>
            ))}
            <tr className="bg-blue-600 text-white font-extrabold text-lg">
              <td className="border px-3 py-3">Total</td>
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
