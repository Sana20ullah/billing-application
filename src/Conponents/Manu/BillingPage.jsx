import React, { useState, useEffect, useContext } from "react";
import { FaTrash } from "react-icons/fa";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate } from "react-router-dom";
import "./Manu.css";
import { InvoiceContext } from "../invoice/InvoiceContext";

const BillingPage = ({ invoiceOverride }) => {
  const navigate = useNavigate();
  const { invoiceData, setInvoiceData } = useContext(InvoiceContext);
  const [allProducts, setAllProducts] = useState([]);
  const [suggestions, setSuggestions] = useState({});
  const items = invoiceData.items || [];

  const [shop, setShop] = useState(invoiceOverride?.shop || null);
  const [vat, setVat] = useState(invoiceOverride?.vat || 0);
  const [discount, setDiscount] = useState(invoiceOverride?.discount || 0);
  const [changeMoney, setChangeMoney] = useState(invoiceOverride?.changeMoney || 0);
  const [customerName, setCustomerName] = useState(invoiceOverride?.customerName || "");

  const backendURL =
    import.meta.env.VITE_BACKEND_URL ||
    (window.location.hostname === "localhost" ? "http://localhost:5000" : "");

  useEffect(() => {
    if (!invoiceOverride) {
      fetch(`${backendURL}/api/shop`)
        .then((res) => res.json())
        .then(setShop)
        .catch((err) => console.error("Failed to load shop from MongoDB", err));
    }
  }, [backendURL, invoiceOverride]);

useEffect(() => {
  if (!invoiceOverride) {
    const defaultInvoice = {
      customerName: "",
      items: [],
    };
    setInvoiceData(defaultInvoice);
  }
}, [setInvoiceData, invoiceOverride]);


  useEffect(() => {
    fetch(`${backendURL}/api/products`)
      .then((res) => res.json())
      .then(setAllProducts)
      .catch((err) => console.error("Failed to load products", err));
  }, [backendURL]);

  useEffect(() => {
    if (!invoiceOverride && !invoiceData.invoiceNumber) {
      const current = parseInt(localStorage.getItem("invoiceNumber")) || 1;
      const formatted = `INV-${String(current).padStart(4, "0")}`;
      setInvoiceData((prev) => ({
        ...prev,
        invoiceNumber: formatted,
      }));
    }
  }, [invoiceOverride, invoiceData.invoiceNumber, setInvoiceData]);

  useEffect(() => {
    if (!invoiceOverride && shop) {
      setInvoiceData((prev) => ({
        ...prev,
        vat,
        discount,
        changeMoney,
        customerName,
        shop,
      }));
    }
  }, [vat, discount, changeMoney, customerName, shop, invoiceOverride, setInvoiceData]);

  const total = items.reduce((acc, cur) => acc + (cur.amount || 0), 0);
  const discounted = total - (total * (parseFloat(discount) || 0)) / 100;
  const finalTotal = discounted + (discounted * (parseFloat(vat) || 0)) / 100;
  const remaining = changeMoney - finalTotal;

  const addItem = () => {
    const newItem = { item: "", qty: 1, rate: 0, amount: 0 };
    setInvoiceData((prev) => ({
      ...prev,
      items: [...(prev.items || []), newItem],
    }));
  };

  const removeItem = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setInvoiceData((prev) => ({
      ...prev,
      items: updated,
    }));
  };

  const updateItem = (index, key, value) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [key]: value };

    if (key === "item") {
      if (value.trim() === "") {
        setSuggestions((prev) => ({ ...prev, [index]: [] }));
      } else {
        const filtered = allProducts.filter((p) =>
          p.name.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions((prev) => ({ ...prev, [index]: filtered }));
      }
    } else {
      const qty = parseFloat(updated[index].qty) || 0;
      const rate = parseFloat(updated[index].rate) || 0;
      updated[index].amount = qty * rate;
      setSuggestions((prev) => ({ ...prev, [index]: [] }));
    }

    setInvoiceData((prev) => ({
      ...prev,
      items: updated,
    }));
  };

  const handleSuggestionClick = (index, product) => {
    const updated = [...items];
    updated[index] = {
      ...updated[index],
      item: product.name,
      qty: 1,
      rate: product.rate,
      barcode: product.barcode,
      amount: product.rate * 1,
    };
    setInvoiceData((prev) => ({ ...prev, items: updated }));
    setSuggestions((prev) => ({ ...prev, [index]: [] }));
  };

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("scanner", { fps: 10, qrbox: 250 });

    scanner.render(
      async (decodedText) => {
        try {
          const res = await fetch(`${backendURL}/api/products/${decodedText}`);
          if (!res.ok) throw new Error("Product not found");
          const product = await res.json();
          setInvoiceData((prev) => ({
            ...prev,
            items: [...(prev.items || []), {
              item: product.name,
              qty: 1,
              rate: product.rate,
              barcode: product.barcode,
              amount: product.rate,
            }],
          }));
        } catch (err) {
          alert("Scan failed: " + err.message);
        }
      },
      (error) => {
        console.warn(error);
      }
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, [backendURL, setInvoiceData]);

  const handleSaveAndPrint = async () => {
    const productsPayload = items.map(item => ({
      name: item.item || "Unnamed",
      qty: Number(item.qty) || 1,
      price: Number(item.rate) || 0,
    }));

    const payload = {
      invoiceNumber: invoiceData.invoiceNumber,
      products: productsPayload,
      totalAmount: finalTotal,
      customerName,
      shop,
      vat,
      discount,
      changeMoney,
      date: new Date(),
    };

    try {
      const response = await fetch(`${backendURL}/api/daysales`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to save day sale");

      await response.json();
      alert("✅ Sale saved successfully!");
      navigate("/print");
    } catch (error) {
      console.error("❌ Save error:", error);
      alert("Error saving sale: " + error.message);
    }
  };

  return (
    <div className="flex-1 flex justify-center items-start overflow-hidden print:p-5">
      <div className="print-area w-[900px] print:w-[300px] max-h-[100vh] print:max-h-full print:h-auto overflow-y-auto print:overflow-visible overflow-x-hidden print:overflow-x-hidden bg-white p-5 rounded shadow-md text-gray-800 print:break-words">
        <h1 className="text-3xl mb-5 font-bold text-center mb-0">INVOICE</h1>

        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="font-semibold">{shop?.name || "Loading Shop..."}</p>
            <p>Address : {shop?.address || "-"}</p>
            <p>Phone : {shop?.phone || "-"}</p>
            <p>Invoice #: {invoiceOverride?.invoiceNumber || invoiceData.invoiceNumber || "INV-XXXX"}</p>


            <p>Date: {new Date().toLocaleString()}</p>
            <p className="flex items-center gap-2">
              Bill To:
              <input
                type="text"
                placeholder="Customer Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="border-gray-400 outline-none font-semibold w-48"
              />
            </p>
          </div>
        </div>

        <hr className="border-dotted border-t-2 border-gray-400 mb-1 print:mb-1" />

        <div className="grid-cols-header">
          <div>SN</div>
          <div>Item</div>
          <div className="print:ml-7">Qty</div>
          <div>Rate</div>
          <div>Amount</div>
          <div className="remove-header print-hidden">Trash</div>
        </div>

        <div className=" max-h-64 overflow-y-auto custom-scroll pr-2 print:-mt-10">
          {items.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-6 gap-2 items-center mb-2 text-sm"
            >
              <div>{index + 1}</div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Item name"
                  className="abcd1 px-2 py-1 -ml-10 w-52 border-b border-gray-400 outline-none bg-transparent print:border-none print:-ml-3"
                  value={item.item}
                  onChange={(e) => updateItem(index, "item", e.target.value)}
                />

                {suggestions[index] && suggestions[index].length > 0 && (
                  <ul className="absolute top-full left-0 z-50 bg-white border border-gray-300 w-52 max-h-40 overflow-auto shadow-md rounded mt-1">
                    {suggestions[index].map((prod) => (
                      <li
                        key={prod._id}
                        className="cursor-pointer px-2 py-1 hover:bg-blue-100"
                        onClick={() => handleSuggestionClick(index, prod)}
                      >
                        {prod.name} - ₹{prod.rate}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <input
                type="number"
                className="abcd2 px-2 py-1 ml-22 w-14 border-b border-gray-400 outline-none bg-transparent print:border-none print:ml-7"
                value={item.qty}
                onChange={(e) => updateItem(index, "qty", e.target.value)}
                min={0}
              />
              <input
                type="number"
                className="abcd3 px-2 py-1 ml-16 w-22 border-b border-gray-400 outline-none bg-transparent print:border-none print:ml-4"
                placeholder="0"
                value={item.rate === 0 ? "" : item.rate}
                onChange={(e) => updateItem(index, "rate", e.target.value)}
                min={0}
                step="0.01"
              />
              <div className="abcd5 text-right pr-2 ml-10 w-25 print:-ml-5">
                {(item.amount || 0).toFixed(2)}
              </div>
              {!invoiceOverride && (
                <button
                  className="abcd4 text-red-600 hover:text-red-800 ml-18 print:hidden"
                  onClick={() => removeItem(index)}
                >
                  <FaTrash />
                </button>
              )}
            </div>
          ))}

          {!invoiceOverride && (
            <button
              onClick={addItem}
              className="text-sm text-blue-600 hover:underline mt-2"
            >
              + Add Item
            </button>
          )}
        </div>

        <hr className="border-dotted border-t-2 border-gray-400 mb-4" />

        <div className="flex justify-between">
          <span>VAT/Tax (%)</span>
          <input
            type="number"
            placeholder="0"
            value={vat === 0 ? "" : vat}
            onChange={(e) =>
              setVat(e.target.value === "" ? 0 : parseFloat(e.target.value))
            }
            className="border-b border-gray-400 px-3 py-1 w-32 text-right outline-none bg-transparent print:border-none"
            disabled={!!invoiceOverride}
            min={0}
          />
        </div>

        <div className="flex justify-between">
          <span>Discount (%)</span>
          <input
            type="number"
            placeholder="0"
            value={discount === 0 ? "" : discount}
            onChange={(e) =>
              setDiscount(e.target.value === "" ? 0 : parseFloat(e.target.value))
            }
            className="border-b border-gray-400 px-3 py-1 w-32 text-right outline-none print:border-0"
            disabled={!!invoiceOverride}
            min={0}
          />
        </div>

        <div className="flex justify-between font-bold text-lg border-t pt-2">
          <span>Total Amount</span>
          <input
            type="text"
            value={finalTotal.toFixed(2)}
            readOnly
            className="border-0 border-b border-solid border-black px-3 py-1 w-32 text-right rounded-none print-no-underline"
          />
        </div>

        <div className="flex justify-between">
          <span>Amount Paid</span>
          <input
            type="number"
            placeholder="0"
            value={changeMoney === 0 ? "" : changeMoney}
            onChange={(e) => setChangeMoney(parseFloat(e.target.value) || 0)}
            className="border-0 border-b border-solid border-black px-3 py-1 w-32 text-right rounded-none print:border-b-0"
            disabled={!!invoiceOverride}
            min={0}
          />
        </div>

        <div className="flex justify-between font-bold text-lg border-t pt-2">
          <span>Change</span>
          <input
            type="text"
            value={remaining.toFixed(2)}
            readOnly
            className="border px-3 py-1 w-32 text-right rounded-none print:border-0"
          />
        </div>

        {/* NEW Save & Print button */}
    

        <p className="mt-2 text-sm text-gray-600 text-center">
          Thank you for your purchase! We appreciate your business.
          <br />
          Come again soon! Have a great day!
        </p>

        <div className="barcode-mobile w-24 h-24 ml-70 mt-8 print:ml-25">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
              invoiceData.barcodeValue || "No Data"
            )}&size=100x100`}
            alt="QR Code"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Scanner section */}
        <div className="print:hidden">
          <h2>Scan Product</h2>
          <div id="scanner" />
        </div>
      </div>
    </div>
  );
};

export default BillingPage;