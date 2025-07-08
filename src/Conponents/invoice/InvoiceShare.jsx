import React from "react";

const InvoiceShare = ({ onClose, invoiceData }) => {
  // Prepare invoice text for sharing - customize as needed
  const invoiceText = `
Invoice #${invoiceData.invoiceNumber}
Customer: ${invoiceData.customerName}
Items:
${invoiceData.items.map(
  (i, idx) => `${idx + 1}. ${i.item} - Qty: ${i.qty}, Rate: ${i.rate}, Amount: ${i.amount}`
).join("\n")}
VAT: ${invoiceData.vat}%
Discount: ${invoiceData.discount}%
Total: ... (calculate total here)
  `;

  // Share handlers using URL schemes for social apps
  const shareWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(invoiceText)}`;
    window.open(url, "_blank");
  };

  const shareFacebookMessenger = () => {
    // FB Messenger share usually requires SDK or Messenger app deep linking,
    // fallback to FB sharer for demo:
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      "https://yourwebsite.com/invoice/" + invoiceData.invoiceNumber
    )}`;
    window.open(url, "_blank");
  };

  const shareSMS = () => {
    const url = `sms:?body=${encodeURIComponent(invoiceText)}`;
    window.open(url);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#2d3748",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
        zIndex: 1000,
        width: "300px",
        color: "white",
        textAlign: "center",
      }}
    >
      <h3 style={{ marginBottom: "16px" }}>Share Invoice</h3>
      <button onClick={shareWhatsApp} style={buttonStyle}>
        📱 WhatsApp
      </button>
      <button onClick={shareFacebookMessenger} style={buttonStyle}>
        💬 Facebook Messenger
      </button>
      <button onClick={shareSMS} style={buttonStyle}>
        📩 SMS
      </button>
      <button
        onClick={onClose}
        style={{
          marginTop: "20px",
          padding: "10px",
          backgroundColor: "#e53e3e",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          color: "white",
          width: "100%",
        }}
      >
        Cancel
      </button>
    </div>
  );
};

const buttonStyle = {
  marginBottom: "12px",
  padding: "10px",
  width: "100%",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  fontSize: "16px",
};

export default InvoiceShare;
