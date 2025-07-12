import React, { createContext, useState, useEffect } from "react";

export const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
  const [invoiceData, setInvoiceData] = useState(() => {
    const saved = localStorage.getItem("invoiceData");
    return saved
      ? JSON.parse(saved)
      : {
          items: [{ item: "", qty: 1, rate: 0, amount: 0 }],
          vat: 0,
          discount: 0,
          changeMoney: 0,
          customerName: "",
          shop: {
            name: "Shop Name",
            address: "123 Main Street",
            phone: "+966 123 456 789",
          },
          invoiceNumber: 1,
        };
  });

  // Save invoice data to localStorage on every change
  useEffect(() => {
    localStorage.setItem("invoiceData", JSON.stringify(invoiceData));
  }, [invoiceData]);

  // ✅ Add new product to invoice (barcode result)
  const addProductToInvoice = (product) => {
    const updatedItems = [...invoiceData.items, product];
    setInvoiceData((prev) => ({
      ...prev,
      items: updatedItems,
    }));
  };

  return (
    <InvoiceContext.Provider value={{ invoiceData, setInvoiceData, addProductToInvoice }}>
      {children}
    </InvoiceContext.Provider>
  );
};