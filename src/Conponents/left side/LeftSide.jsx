import React, { useState, useEffect, useContext } from "react";
import {
  FaBars,
  FaPlus,
  FaCalculator,
  FaCalendarDay,
  FaCalendarAlt,
  FaPercentage,
  FaUsers,
  FaPrint,
  FaFilePdf,
} from "react-icons/fa";
import Calculator from "../Calculator/Calculator";
import Barcode from "react-barcode";
import { InvoiceContext } from "../invoice/InvoiceContext";
import ProductsList from "../ProductsList/ProductsList";
import DayAmountForm from "../DayAmountForm/DayAmountForm";
import ReturnSaleForm from "../ReturnSaleForm/ReturnSaleForm";
import MonthAmountForm from "../MonthAmountForm/MonthAmountForm";
import { useNavigate } from "react-router-dom";

const LeftSide = ({ onShopDetailsChange }) => {
  const { addProductToInvoice } = useContext(InvoiceContext);
  const [showProductsList, setShowProductsList] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showShopForm, setShowShopForm] = useState(false);
  const [showDayForm, setShowDayForm] = useState(false);
  const [showBarcodePopup, setShowBarcodePopup] = useState(false);
  const [text, setText] = useState("");
  const [showItemForm, setShowItemForm] = useState(false);
  const [showReturnForm, setShowReturnForm] = useState(false);
  const [showMonthForm, setShowMonthForm] = useState(false);

  const [itemFormData, setItemFormData] = useState({
    item: "",
    qty: "",
    rate: "",
    barcode: "",
  });
  const [barcodeInput, setBarcodeInput] = useState("");
  const [shopData, setShopData] = useState(null); // fetch only from MongoDB

  // Use environment variable for backend URL; fallback to localhost for dev
  const backendURL = import.meta.env.VITE_BACKEND_URL || (window.location.hostname === "localhost" ? "http://localhost:5000" : "");





  useEffect(() => {
    // Load shop info from MongoDB only once
    const fetchShop = async () => {
      try {
        const res = await fetch(`${backendURL}/api/shop`);
        if (!res.ok) throw new Error("Failed to fetch shop");
        const data = await res.json();
        setShopData(data);
        onShopDetailsChange(data);
      } catch (err) {
        console.error("Failed to load shop:", err);
        alert("Unable to load shop data.");
      }
    };

    fetchShop();
  }, [backendURL, onShopDetailsChange]);

  const toggleCalculator = () => setShowCalculator((prev) => !prev);
  const toggleShopForm = () => setShowShopForm((prev) => !prev);
  const toggleBarcodePopup = () => {
    setShowBarcodePopup((prev) => !prev);
    setText("");
  };
  const toggleItemForm = () => {
    setShowItemForm((prev) => !prev);
    setItemFormData({ item: "", qty: "", rate: "", barcode: "" });
  };

  const handleItemInputChange = (e) => {
    const { name, value } = e.target;
    setItemFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${backendURL}/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemFormData),
      });
      if (!res.ok) throw new Error("Failed to add item");
      alert("Item added successfully!");
      toggleItemForm();
    } catch (err) {
      console.error("Add item failed:", err);
      alert("Error adding item.");
    }
  };

  const handleShopFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${backendURL}/api/shop`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(shopData),
      });

      if (!res.ok) throw new Error("Failed to save shop data");
      const updated = await res.json();
      onShopDetailsChange(updated);
      setShowShopForm(false);
      alert("Shop info saved successfully!");
    } catch (err) {
      console.error("Failed to update shop:", err);
      alert("Error saving shop info.");
    }
  };

  const handleShopInputChange = (e) => {
    const { name, value } = e.target;
    setShopData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBarcodeSubmit = async (e) => {
    e.preventDefault();
    if (!barcodeInput) return;
    try {
      const res = await fetch(`${backendURL}/api/products/barcode/${barcodeInput}`);
      if (!res.ok) throw new Error("Product not found");
      const product = await res.json();
      addProductToInvoice(product);
      setBarcodeInput("");
    } catch (err) {
      alert("Failed to find product for this barcode.");
      console.error(err);
    }
  };

  const buttonBaseClasses =
    "mobile-full-btn relative px-8 py-3 mt-4 bg-black text-white font-semibold rounded-lg border-2 border-purple-500 hover:border-purple-400 transition-all duration-300 hover:shadow-[0_0_20px_10px_rgba(168,85,247,0.6)] active:scale-95 active:shadow-[0_0_10px_5px_rgba(168,85,247,0.4)] flex items-center gap-2";

  return (
    <div className=" ">
     <div className="width-left-page mobile-scroll-wrapper  w-64 h-[40rem] bg-black text-white p-4 flex flex-col gap-4 shadow-2xl  sm:ml-4 mt-0 ">


        {showProductsList && <ProductsList onClose={() => setShowProductsList(false)} />}

        <button 
          onClick={() => setShowProductsList(true)}
          className={` bt1 absolute top--1 left-1 ${buttonBaseClasses}`}
        >
          <FaBars className="mr-2" />
          <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent font-bold text-xl">
            Products List
          </span>
        </button>

         {/* Admin-only: Add Item */}
       
          <button
            onClick={toggleItemForm}
            className={`bt1 absolute -top-7 left-1 ${buttonBaseClasses}`}
          >
            <FaPlus />
            <span className="bg-gradient-to-r from-green-400 via-lime-400 to-yellow-400 bg-clip-text text-transparent font-semibold text-lg">
              Items Add
            </span>
          </button>
        
        <button
          onClick={toggleCalculator}
          className={`bt1 absolute -top-14 left-1 ${buttonBaseClasses} ${showCalculator ? "bg-purple-700" : ""}`}
        >
          <FaCalculator />
          <span className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 bg-clip-text text-transparent font-bold text-lg">
            Calculator
          </span>
        </button>

        <button
          onClick={() => setShowDayForm(true)}
          className={`bt1 absolute -top-21 -right-1 ${buttonBaseClasses}`}
        >
          <FaCalendarDay />
          <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent font-semibold text-lg">
            Daily sales
          </span>
        </button>

        {showDayForm && <DayAmountForm />}

        <button
          onClick={() => setShowMonthForm(true)}
          className={`bt1 absolute bottom-28 -right-1 ${buttonBaseClasses}`}
        >
          <FaCalendarAlt />
          <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent font-semibold text-lg">
            Monthly sales
          </span>
        </button>
        {showMonthForm && (
          <MonthAmountForm onClose={() => setShowMonthForm(false)} />
        )}


       {/* Admin-only: Shop Info Edit */}
        
       
        
         <button
  onClick={toggleShopForm}

            className={`bt1 absolute -top-35 left-0 ${buttonBaseClasses}`}
          >
            <FaPercentage />
            <span className="bg-gradient-to-r from-green-400 via-teal-500 to-cyan-500 bg-clip-text text-transparent font-semibold text-lg">
              Edit Shop Info
            </span>
          </button>
      

      
        {/* Admin-only: Sales Return */}
        
          <button
            onClick={() => setShowReturnForm(true)}
            className={`bt1 absolute -top-42 -left0 ${buttonBaseClasses}`}
          >
            <FaUsers />
            <span className="bg-gradient-to-r from-rose-500 via-red-500 to-orange-500 bg-clip-text text-transparent font-bold text-lg">
              Sales Return
            </span>
          </button>

        {showReturnForm && <ReturnSaleForm onClose={() => setShowReturnForm(false)} />}

        <button
          onClick={() => navigate("/document")}
          className={`bt1 absolute -top-49 left-0 ${buttonBaseClasses}`}
        >
          📄
          <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 bg-clip-text text-transparent font-semibold text-lg">
            Document
          </span>
        </button>

        <button
          onClick={toggleBarcodePopup}
          className={`bt1 absolute -top-56 left-0 ${buttonBaseClasses}`}
        >
          <FaFilePdf />
          <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent font-bold text-lg">
            Create Barcode
          </span>
        </button>
      </div>

      {showCalculator && (
        <div className="cl1 fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
          <Calculator />
        </div>
      )}

      {showShopForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <form
            onSubmit={handleShopFormSubmit}
            className="bg-white p-6 rounded shadow-md w-80 space-y-4 text-black"
          >
            <h3 className="text-lg font-bold">Shop Info</h3>
            <input
              type="text"
              name="name"
              placeholder="Shop Name"
              value={shopData.name}
              onChange={handleShopInputChange}
              className="w-full border border-gray-300 px-3 py-2 rounded"
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={shopData.address}
              onChange={handleShopInputChange}
              className="w-full border border-gray-300 px-3 py-2 rounded"
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={shopData.phone}
              onChange={handleShopInputChange}
              className="w-full border border-gray-300 px-3 py-2 rounded"
              required
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button
                type="button"
                onClick={() => setShowShopForm(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {showBarcodePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-96 text-black relative">
            <h2 className="text-xl font-bold mb-4">Generate Barcode</h2>
            <input
              type="text"
              placeholder="Enter Product ID or Name"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded mb-4"
            />
            {text && (
              <div className="bg-gray-100 p-3 rounded mb-4 text-center">
                <div className="text-lg font-semibold mb-2">{text}</div>
                <Barcode value={text} height={60} width={1.5} fontSize={14} displayValue={true} />
              </div>
            )}
            <div className="flex justify-end gap-4">
              <button
                onClick={() => window.print()}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Print
              </button>
              <button
                onClick={toggleBarcodePopup}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showItemForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <form
            onSubmit={handleItemFormSubmit}
            className="bg-white p-6 rounded shadow-md w-96 space-y-4 text-black"
          >
            <h3 className="text-lg font-bold">🆕 Add New Item</h3>
            <input
              type="text"
              name="item"
              placeholder="🛒 Item Name"
              value={itemFormData.item}
              onChange={handleItemInputChange}
              className="w-full border border-gray-300 px-3 py-2 rounded"
              required
            />
            <input
              type="number"
              name="qty"
              placeholder="🔢 Quantity"
              value={itemFormData.qty}
              onChange={handleItemInputChange}
              className="w-full border border-gray-300 px-3 py-2 rounded"
              required
              min={1}
            />
            <input
              type="number"
              name="rate"
              placeholder="💰 Rate"
              value={itemFormData.rate}
              onChange={handleItemInputChange}
              className="w-full border border-gray-300 px-3 py-2 rounded"
              required
              min={0}
              step="0.01"
            />
            <input
              type="text"
              name="barcode"
              placeholder="📦 Barcode"
              value={itemFormData.barcode}
              onChange={handleItemInputChange}
              className="w-full border border-gray-300 px-3 py-2 rounded"
            />
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={toggleItemForm}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default LeftSide;
