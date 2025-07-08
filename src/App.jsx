import React, { useState, useEffect, useContext } from "react";

import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Header from './Conponents/header/Header';
import LeftSide from './Conponents/left side/LeftSide';
import RightSide from './Conponents/RightSide/RightSide';
import BillingPage from "./Conponents/Manu/BillingPage";
import Print from "./Conponents/Print/Print";
import Calculator from "./Conponents/Calculator/Calculator";
import ShopNameForm from "./Conponents/shopnameChange/ShopNameForm"; // Make sure path is correct
import DocumentPage from './Conponents/DocumentPage/DocumentPage';

import { InvoiceContext } from "./Conponents/invoice/InvoiceContext"; // Adjust path as needed

function App() {
  const { setInvoiceData } = useContext(InvoiceContext);

  const [shopDetails, setShopDetails] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/shop")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setShopDetails(data);
          setInvoiceData(prev => ({ ...prev, shop: data }));  // <--- NEW LINE HERE (keep)
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load shop info", err);
        setLoading(false);
      });
  }, [setInvoiceData]);

  return (
    <>
      {/* KEEP: All route handling */}
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex">
              <LeftSide onShopDetailsChange={setShopDetails} />
              <div className="flex-1 flex flex-col min-h-screen bg-gray-100 overflow-y-auto">
                <Header />
                <div className="flex justify-center p-4">
                  <BillingPage shopDetails={shopDetails} />
                </div>
              </div>
              <RightSide />
            </div>
          }
        />

        <Route
          path="/edit-shop"
          element={
            <div className="p-6 max-w-lg mx-auto">
              <h2 className="text-2xl font-bold mb-4">Edit Shop Info</h2>
              <ShopNameForm
                shopDetails={shopDetails}
                setShopDetails={setShopDetails}
              />
            </div>
          }
        />
        <Route path="/print" element={<Print shopDetails={shopDetails} />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/document" element={<DocumentPage />} />
      </Routes>

      {/* ✅ GET: Added once to make glowing buttons work globally */}
      <SvgFilters />
    </>
  );
}

export default App;

/* ✅ KEEP: Reusable SVG filter component for glowing buttons */
function SvgFilters() {
  return (
    <svg style={{ position: "absolute", width: 0, height: 0 }}>
      <filter id="unopaq" y="-100%" height="300%" x="-100%" width="300%">
        <feColorMatrix
          values="
            1 0 0 0 0 
            0 1 0 0 0 
            0 0 1 0 0 
            0 0 0 9 0
          "
        />
      </filter>
      <filter id="unopaq2" y="-100%" height="300%" x="-100%" width="300%">
        <feColorMatrix
          values="
            1 0 0 0 0 
            0 1 0 0 0 
            0 0 1 0 0 
            0 0 0 3 0
          "
        />
      </filter>
      <filter id="unopaq3" y="-100%" height="300%" x="-100%" width="300%">
        <feColorMatrix
          values="
            1 0 0 0.2 0 
            0 1 0 0.2 0 
            0 0 1 0.2 0 
            0 0 0 2 0
          "
        />
      </filter>
    </svg>
  );
}
