// src/components/LogoUploader.jsx
import React, { useContext, useState } from "react";
import { InvoiceContext } from "../invoice/InvoiceContext";

const LogoUploader = ({ onClose }) => {
  const { setInvoiceData } = useContext(InvoiceContext);
  const [logoURL, setLogoURL] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoURL(reader.result);
        // Save to context and localStorage
        setInvoiceData((prev) => ({ ...prev, logo: reader.result }));
        localStorage.setItem("logo", reader.result);
        onClose(); // close modal
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-black p-4 rounded-md w-[300px] text-center shadow-lg">
        <h2 className="font-bold text-lg mb-3">Upload Logo</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="mb-3"
        />
        {logoURL && (
          <img
            src={logoURL}
            alt="Preview"
            className="w-24 h-24 rounded-full mx-auto"
          />
        )}
        <button
          onClick={onClose}
          className="mt-3 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LogoUploader;
