import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { InvoiceContext } from "../invoice/InvoiceContext";
import BillingPage from "../Manu/BillingPage";


const Print = () => {
  const navigate = useNavigate();
  const { invoiceData, setInvoiceData } = useContext(InvoiceContext);

  const formatInvoiceNumber = (num) => `INV-${String(num).padStart(4, "0")}`;

  useEffect(() => {
    const current = parseInt(localStorage.getItem("invoiceNumber")) || 1;
    const formatted = formatInvoiceNumber(current);

    setInvoiceData(prev => ({
      ...prev,
      invoiceNumber: formatted,
    }));

    const timeout = setTimeout(() => {
      window.print();
      localStorage.setItem("invoiceNumber", current + 1);
      navigate("/");
    }, 500);

    return () => clearTimeout(timeout);
  }, [setInvoiceData, navigate]);

  return (
    <div className="p-5">
      <BillingPage invoiceOverride={invoiceData} />
    </div>
  );
};


export default Print;
