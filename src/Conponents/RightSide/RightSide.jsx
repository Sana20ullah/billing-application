import React, { useContext, useState, useEffect } from "react";
import { InvoiceContext } from "../invoice/InvoiceContext";
import BillingPage from "../Manu/BillingPage";
import LogoUploader from "../LogoUploader/LogoUploader"; // adjust path if needed


import {
  FaEye,
  FaUserShield,
  FaQrcode,
  FaPrint,
  FaShareAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./RightSide.css";
import InvoiceShare from "../share/InvoiceShare";

const RightSide = () => {
  const navigate = useNavigate();
  const { invoiceData, setInvoiceData } = useContext(InvoiceContext);

  const [showShare, setShowShare] = useState(false);
  const [showBarcodeForm, setShowBarcodeForm] = useState(false);
  const [showInvoicePopup, setShowInvoicePopup] = useState(false);
  const [showLogoUploader, setShowLogoUploader] = useState(false);


  const [barcodeForm, setBarcodeForm] = useState({
    link: "",
    phone: "",
    address: "",
  });

  // Save invoiceData to localStorage whenever it changes
  useEffect(() => {
    if (invoiceData) {
      localStorage.setItem("invoiceData", JSON.stringify(invoiceData));
    }
  }, [invoiceData]);

  const handlePreview = () => {
    // Your preview logic here (if any)
  };

  const handleAdminClick = () => {
    alert("Admin clicked");
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset the invoice?")) {
      localStorage.removeItem("invoiceData");
      window.location.reload();
    }
  };

  const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onloadend = async () => {
    const base64 = reader.result;

 await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/logo`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ data: base64 }), // <--- must be `data`, not `logo`
});


    setInvoiceData(prev => ({ ...prev, logo: base64 }));
    localStorage.setItem("logo", base64); // optional cache
  };

  reader.readAsDataURL(file);
};


  const handlePrintAndSave = async () => {
    const total = invoiceData.items.reduce((acc, cur) => acc + cur.amount, 0);

    const backendURL =
      import.meta.env.VITE_BACKEND_URL ||
      (window.location.hostname === "localhost" ? "http://localhost:5000" : "");

    try {
      await fetch(`${backendURL}/api/daysales`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ totalAmount: total }),
      });
    } catch (error) {
      console.error("Failed to save day sale:", error);
    }

    navigate("/print");
  };

  const iconClasses =
    "w-6 h-6 text-purple-500 group-hover:text-white transition-colors duration-300";

  return (
    <div className=" width-right-page mobile-scroll-wrapper  w-64  h-160 bg-black text-white p-4 flex flex-col gap-4 shadow-lg relative sm:-mt-2  ">

      {/* Preview Button */}
  <button 
  onClick={() => setShowLogoUploader(true)}
  className="bt1 mobile-full-btn relative px-8 py-3 mt-4 bg-black text-white font-semibold rounded-lg border-2 border-purple-500 hover:border-purple-400 transition-all duration-300 group flex items-center gap-2"
>
  <FaEye className={iconClasses} />
  <span className="bg-gradient-to-r from-teal-400 via-emerald-500 to-lime-500 bg-clip-text text-transparent font-semibold text-lg">
    Add Logo
  </span>
</button>
{showLogoUploader && (
  <LogoUploader onClose={() => setShowLogoUploader(false)} />
)}



      {/* Admin Button */}
      <button
        onClick={handleAdminClick}
        className="bt1 mobile-full-btn relative px-8 py-3 mt-4 bg-black text-white font-semibold rounded-lg border-2 border-purple-500 hover:border-purple-400 transition-all duration-300 hover:shadow-[0_0_20px_10px_rgba(168,85,247,0.6)] active:scale-95 active:shadow-[0_0_10px_5px_rgba(168,85,247,0.4)] group flex items-center gap-2"
      >
        <FaUserShield className={iconClasses} />
        <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-bold text-lg">
          Admin
        </span>

        <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-purple-500/20 to-indigo-500/20"></span>
      </button>

      {/* Add QR Code Button */}
      <button
        onClick={() => setShowBarcodeForm(true)}
        className="bt1 mobile-full-btn relative px-8 py-3 mt-4 bg-black text-white font-semibold rounded-lg border-2 border-purple-500 hover:border-purple-400 transition-all duration-300 hover:shadow-[0_0_20px_10px_rgba(168,85,247,0.6)] active:scale-95 active:shadow-[0_0_10px_5px_rgba(168,85,247,0.4)] group flex items-center gap-2"
      >
        <FaQrcode className={iconClasses} />
        <span className="bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 bg-clip-text text-transparent font-semibold text-lg">
          Add QR Code
        </span>

        <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-purple-500/20 to-indigo-500/20"></span>
      </button>

      {/* Share Button */}
      <button
        onClick={() => setShowShare((prev) => !prev)}
        className="bt1 share-button relative px-8 py-3  mt-4 bg-black text-white font-semibold rounded-lg border-2 border-purple-500 hover:border-purple-400 transition-all duration-300 hover:shadow-[0_0_20px_10px_rgba(168,85,247,0.6)] active:scale-95 active:shadow-[0_0_10px_5px_rgba(168,85,247,0.4)] group flex items-center gap-2"
      >
        <FaShareAlt className={`ml-9 ${iconClasses}`} />

        <span className="bg-gradient-to-r from-green-400 ml- via-blue-500 to-purple-500 bg-clip-text text-transparent font-semibold">
          Share
        </span>

        <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-purple-500/20 to-indigo-500/20"></span>
      </button>

      {/* Barcode Form Modal */}
      {showBarcodeForm && (
        <>
          <div
            onClick={() => setShowBarcodeForm(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black p-5 rounded shadow-md z-50 w-[300px]">
            <h2 className="text-lg font-bold mb-3">Add Barcode Info</h2>

            <input
              type="text"
              placeholder="Link"
              value={barcodeForm.link}
              onChange={(e) =>
                setBarcodeForm({ ...barcodeForm, link: e.target.value })
              }
              className="border w-full px-3 py-1 mb-2 rounded"
            />
            <input
              type="text"
              placeholder="Phone"
              value={barcodeForm.phone}
              onChange={(e) =>
                setBarcodeForm({ ...barcodeForm, phone: e.target.value })
              }
              className="border w-full px-3 py-1 mb-2 rounded"
            />
            <input
              type="text"
              placeholder="Address"
              value={barcodeForm.address}
              onChange={(e) =>
                setBarcodeForm({ ...barcodeForm, address: e.target.value })
              }
              className="border w-full px-3 py-1 mb-4 rounded"
            />

            <button
              onClick={() => {
                const combined = JSON.stringify(barcodeForm);
                const updated = { ...invoiceData, barcodeValue: combined };
                setInvoiceData(updated);
                localStorage.setItem("invoiceData", JSON.stringify(updated));
                setShowBarcodeForm(false);
              }}
              className="bg-blue-600 text-white px-4 py-1 rounded w-full"
            >
              Generate QR Code
            </button>
          </div>
        </>
      )}

      {/* Invoice Button for Mobile Only */}
<div className="bt1 sm:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
  <button
    onClick={() => setShowInvoicePopup(true)}
    className="px-6 py-3 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition"
  >
    Invoice
  </button>
</div>


      {/* Print and Reset Buttons stacked vertically */}
      <div className="flex flex-col gap-4 mt-3">

        {/* Print Button */}
        <button
          onClick={handlePrintAndSave}
          className=" print-button-size mobile-full-btn relative w-[225px] h-[50px] bg-black text-white font-semibold rounded-lg border-2 border-purple-500 hover:border-purple-400 transition-all duration-300 hover:shadow-[0_0_20px_10px_rgba(168,85,247,0.6)] active:scale-95 active:shadow-[0_0_10px_5px_rgba(168,85,247,0.4)] group flex items-center gap-2"
        >
          <FaPrint className=" print-icon-size w-10 ml-15 h-6 text-purple-500 group-hover:text-white transition-colors duration-300 " />
          <span className=" print-text-size bg-gradient-to-r text-22 from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent font-semibold ">
            Print
          </span>

          <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-purple-500/20 to-indigo-500/20"></span>
        </button>

        {/* Reset Button */}
        <button
          onClick={handleReset}
          className=" mobile-full-btn relative w-32 mt-17 h-12 text-[14px] font-bold text-white ml-15
            bg-gradient-to-r from-red-500 via-pink-600 to-red-700
            rounded-lg shadow-lg transition-all duration-300
            hover:from-red-600 hover:via-pink-700 hover:to-red-800
            active:scale-95 focus:outline-none"
          title="Reset Invoice"
        >
          Reset
          <div
            className="pointer-events-none absolute inset-0 rounded-lg
              border-4 border-double
              border-gradient-to-r from-pink-500 via-red-600 to-pink-500
              shadow-[0_0_15px_5px_rgba(255,105,135,0.8)]
              clip-path-[polygon(30%_0%,70%_0%,100%_30%,100%_70%,70%_100%,30%_100%,0%_70%,0%_30%)]"
          ></div>
          <span className="icon-reset absolute right-1 top-1 w-5 h-5 border-l-4 border-t-4 border-pink-400 rotate-45"></span>
          <span className="icon-reset absolute left-1 bottom-1 w-5 h-5 border-r-4 border-b-4 border-pink-400 -rotate-45"></span>
        </button>

      </div>
      
      {/* Fullscreen BillingPage Popup */}
{showInvoicePopup && (
  <>
    <div
      onClick={() => setShowInvoicePopup(false)}
      className="fixed inset-0 bg-black bg-opacity-60 z-40"
    />
    <div className="fixed inset-0 z-50 overflow-y-auto bg-white">
      <div className="flex justify-end p-4">
        <button
          onClick={() => setShowInvoicePopup(false)}
          className="text-black text-xl font-bold"
        >
          ✕
        </button>
      </div>
      <BillingPage />
    </div>
  </>
)}

      {/* Floating share modal and overlay */}
      {showShare && (
        <>
          <div
            onClick={() => setShowShare(false)}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              zIndex: 999,
            }}
          />
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#1f2937",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              zIndex: 1000,
              minWidth: "320px",
              maxWidth: "90vw",
            }}
          >
            <InvoiceShare
              invoiceData={invoiceData}
              onClose={() => setShowShare(false)}
            />
          </div>
        </>
      )}


    </div>
  );
};

export default RightSide;
