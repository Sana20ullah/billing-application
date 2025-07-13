import React, { useContext, useEffect, useState } from "react";
import { InvoiceContext } from "../invoice/InvoiceContext";

const Header = ({ onLogout }) => {
  const { invoiceData } = useContext(InvoiceContext);
  const [logo, setLogo] = useState(null);



  useEffect(() => {
  const loadLogo = async () => {
    if (invoiceData.logo) return; // prevent overwriting
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/logo`);
      const json = await res.json();
      if (json?.data) {
        setInvoiceData(prev => ({ ...prev, logo: json.data }));
      }
    } catch (err) {
      console.error("Failed to load logo from backend", err);
    }
  };
  loadLogo();
}, []);


  return (
    <header className="header-main bg-black text-white px-8 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
  {invoiceData?.logo ? (
  <img
    src={invoiceData.logo}
    alt="Logo"
    className="w-12 h-12 rounded-full object-cover"
  />
) : (
  <div className="text-xl font-bold tracking-wide bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
    SaNa
  </div>
)}

        <div className="text-2xl font-semibold hidden sm:block bg-gradient-to-r from-red-500 via-pink-500 to-yellow-500 bg-clip-text text-transparent">
          Billing App
        </div>
        <button
          onClick={onLogout}
          className="px-6 py-2 rounded-lg font-semibold text-white
            bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500"
        >
          Log out
        </button>
      </div>
    </header>
  );
};

export default Header;
