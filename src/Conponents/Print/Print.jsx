import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { InvoiceContext } from "../invoice/InvoiceContext";
import BillingPage from "../Manu/BillingPage";

const Print = () => {
  const { invoiceData, setInvoiceData } = useContext(InvoiceContext);
  const navigate = useNavigate();

  useEffect(() => {
    const current = parseInt(localStorage.getItem("invoiceNumber")) || 1;
    const formatted = `INV-${String(current).padStart(4, "0")}`;

    if (!invoiceData.invoiceNumber) {
      setInvoiceData((prev) => ({
        ...prev,
        invoiceNumber: formatted,
      }));
      localStorage.setItem("invoiceNumber", current + 1);
    }

    const printTimeout = setTimeout(() => {
      window.print();
    }, 500);

    const handleAfterPrint = () => {
      navigate("/");
    };

    window.addEventListener("afterprint", handleAfterPrint);

    return () => {
      clearTimeout(printTimeout);
      window.removeEventListener("afterprint", handleAfterPrint);
    };
  }, [invoiceData.invoiceNumber, setInvoiceData, navigate]);

  return (
    <div className="p-5">
      <BillingPage invoiceOverride={invoiceData} />
    </div>
  );
};

export default Print;
