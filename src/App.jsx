import React, { useState, useEffect, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from './Conponents/header/Header';
import LeftSide from './Conponents/left side/LeftSide';
import RightSide from './Conponents/RightSide/RightSide';
import BillingPage from "./Conponents/Manu/BillingPage";
import Print from "./Conponents/Print/Print";
import Calculator from "./Conponents/Calculator/Calculator";
import ShopNameForm from "./Conponents/shopnameChange/ShopNameForm";
import DocumentPage from './Conponents/DocumentPage/DocumentPage';

import { InvoiceContext } from "./Conponents/invoice/InvoiceContext";

function App({ onLogout, userRole }) {
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
          setInvoiceData((prev) => ({ ...prev, shop: data }));
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
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex">
              <LeftSide onShopDetailsChange={setShopDetails} />
              <div className="flex-1 flex flex-col min-h-screen bg-gray-100 overflow-y-auto">
                <Header onLogout={onLogout} />
                <div className="flex justify-center p-4">
                  <BillingPage shopDetails={shopDetails} />
                </div>
              </div>
              <RightSide />
            </div>
          }
        />

        <Route path="/print" element={<Print shopDetails={shopDetails} />} />

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

        <Route path="/calculator" element={<Calculator />} />
        <Route path="/document" element={<DocumentPage />} />

        {/* Redirect all unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <SvgFilters />
    </>
  );
}

export default App;

// SVG Filters component unchanged...


// SVG Filters unchanged
function SvgFilters() {
  return (
    <svg style={{ position: "absolute", width: 0, height: 0 }}>
      <filter id="unopaq" y="-100%" height="300%" x="-100%" width="300%">
        <feColorMatrix
          values="1 0 0 0 0 
                  0 1 0 0 0 
                  0 0 1 0 0 
                  0 0 0 9 0"
        />
      </filter>
      <filter id="unopaq2" y="-100%" height="300%" x="-100%" width="300%">
        <feColorMatrix
          values="1 0 0 0 0 
                  0 1 0 0 0 
                  0 0 1 0 0 
                  0 0 0 3 0"
        />
      </filter>
      <filter id="unopaq3" y="-100%" height="300%" x="-100%" width="300%">
        <feColorMatrix
          values="1 0 0 0.2 0 
                  0 1 0 0.2 0 
                  0 0 1 0.2 0 
                  0 0 0 2 0"
        />
      </filter>
    </svg>
  );
}
