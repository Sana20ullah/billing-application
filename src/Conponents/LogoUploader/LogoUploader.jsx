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
        setInvoiceData((prev) => ({ ...prev, logo: reader.result }));
        localStorage.setItem("logo", reader.result);
        onClose();
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-2xl w-full max-w-sm animate-fadeIn">
        <h2 className="text-2xl font-semibold text-center text-zinc-800 dark:text-white mb-4">
          Upload Your Logo
        </h2>

        <label className="block cursor-pointer w-full border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl p-4 text-center hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <p className="text-zinc-600 dark:text-zinc-300 text-sm">
            Click to select an image (JPG, PNG, etc.)
          </p>
        </label>

        {logoURL && (
          <div className="mt-4">
            <img
              src={logoURL}
              alt="Preview"
              className="w-24 h-24 mx-auto rounded-full border-4 border-zinc-300 dark:border-zinc-600 shadow-lg object-cover"
            />
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-6 w-full py-2 rounded-lg bg-gradient-to-r from-pink-500 to-red-500 text-white font-medium hover:scale-105 transition-transform"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LogoUploader;
