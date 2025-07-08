
import React from "react";

const DiscountPage = ({ total, discount, setDiscount }) => {
  const discountedTotal = total - (parseFloat(discount) || 0);

  return (
    <div className="p-4 bg-white rounded shadow w-[500px] mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Apply Discount</h2>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Enter Discount Amount:</label>
        <input
          type="number"
          placeholder="e.g. 50"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />
      </div>

      <div className="mt-4">
        <p className="text-gray-600">
          Original Total: <span className="font-semibold">${total.toFixed(2)}</span>
        </p>
        <p className="text-gray-800 mt-1">
          Final Total After Discount:{" "}
          <span className="text-green-600 font-bold">${discountedTotal.toFixed(2)}</span>
        </p>
      </div>
    </div>
  );
};

export default DiscountPage;
