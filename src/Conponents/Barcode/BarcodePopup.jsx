import React, { useState } from "react";
import Barcode from "react-barcode";

const BarcodePopup = ({ onClose }) => {
  const [text, setText] = useState("");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 barcode-popup">
      <div className="bg-white p-6 rounded shadow-md w-96 text-black relative print:shadow-none print:bg-white print:p-0">

        {/* ✅ Print-only area */}
        {text && (
          <div className="print-only text-center mb-4">
            <div className="font-bold text-lg mb-1">{text}</div>
            <Barcode value={text} height={60} width={1.5} />
          </div>
        )}

        {/* ✅ Normal screen-only content */}
        <div className="no-print">
          <h2 className="text-xl font-bold mb-4">Generate Barcode</h2>
          <input
            type="text"
            placeholder="Enter Product ID or Name"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded mb-4"
          />

          <div className="flex justify-end gap-4">
            <button
              onClick={() => window.print()}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Print
            </button>
            <button
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarcodePopup;
