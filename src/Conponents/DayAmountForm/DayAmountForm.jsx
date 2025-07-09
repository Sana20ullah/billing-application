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

        // Calculate total of all daySales amounts if available
        const sum = data.reduce((acc, item) => acc + (item.totalAmount || 0), 0);
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
      <div className="bg-white w-full max-w-6xl rounded-xl p-6 text-black shadow-lg max-h-[90vh] overflow-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">📆 Day Sales Records</h2>

        <table className="w-full border-collapse text-left">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Time</th>
              <th className="border px-4 py-2">Product Name</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Price (₹)</th>
            </tr>
          </thead>
          <tbody>
            {daySales.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-600">
                  No sales records found.
                </td>
              </tr>
            )}
            {daySales.map((record, idx) => {
              const saleDate = new Date(record.date);
              return record.products && record.products.length > 0 ? (
                record.products.map((prod, pidx) => (
                  <tr
                    key={`${idx}-${pidx}`}
                    className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    {/* Show date/time only for the first product row */}
                    {pidx === 0 && (
                      <>
                        <td className="border px-4 py-2" rowSpan={record.products.length}>
                          {saleDate.toLocaleDateString()}
                        </td>
                        <td className="border px-4 py-2" rowSpan={record.products.length}>
                          {saleDate.toLocaleTimeString()}
                        </td>
                      </>
                    )}
                    <td className="border px-4 py-2">{prod.name}</td>
                    <td className="border px-4 py-2">{prod.qty}</td>
                    <td className="border px-4 py-2">
                      ₹{prod.price ? prod.price.toFixed(2) : "0.00"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="border px-4 py-2">{saleDate.toLocaleDateString()}</td>
                  <td className="border px-4 py-2">{saleDate.toLocaleTimeString()}</td>
                  <td className="border px-4 py-2 text-gray-500 italic">No products</td>
                  <td className="border px-4 py-2">-</td>
                  <td className="border px-4 py-2">-</td>
                </tr>
              );
            })}
          </tbody>
          {/* Optional footer showing total sales */}
          {total > 0 && (
            <tfoot>
              <tr className="bg-blue-600 text-white font-extrabold text-lg">
                <td colSpan="4" className="border px-4 py-3 text-right">
                  Total Amount
                </td>
                <td className="border px-4 py-3">₹{total.toFixed(2)}</td>
              </tr>
            </tfoot>
          )}
        </table>

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded mt-6"
          onClick={() => window.location.reload()}
        >
          Close
        </button>
      </div>
    </div>
  );
}
