import React, { useState } from "react";
import { FaWhatsapp, FaFacebookF, FaTimes, FaArrowLeft, FaSnapchatGhost, FaComments } from "react-icons/fa";




const InvoiceShare = ({ invoiceData, onClose }) => {
  const [shareType, setShareType] = useState(null); // 'img' or 'pdf'

  // Social media platforms with their icons and share URLs
const socialMedia = [
  {
    name: "WhatsApp",
    icon: <FaWhatsapp size={24} />,
    url: "https://wa.me/?text=Check%20this%20invoice!", // customize URL
  },
  {
    name: "Facebook",
    icon: <FaFacebookF size={24} />,
    url: "https://www.facebook.com/sharer/sharer.php?u=https://example.com", // customize URL
  },
 {
  name: "IMO",
  icon: <FaComments size={28} />,  // fallback icon (chat bubble)
  url: "https://imo.im",
},

  {
    name: "Snapchat",
    icon: <FaSnapchatGhost size={24} />,
    url: "https://www.snapchat.com", // Snapchat share links are tricky; you can link to homepage or customize
  },
];


  return (
<div className="flex justify-center mt-2 m-6 gap-3  border border-yellow-400 p-4 ">

      {!shareType && (
        <div className="flex justify-center gap-8 mb-0 p-5 border border-yellow-400 rounded-xl">
          <button
            aria-label="Share as Image"
            onClick={() => setShareType("img")}
            className="bg-blue-600 p-3  rounded-full hover:bg-blue-700 transition"
          >
            {/* You can put a relevant icon here if you want */}
            IMG
          </button>
          <button
            aria-label="Share as PDF"
            onClick={() => setShareType("pdf")}
            className="bg-green-600 p-3 rounded-full hover:bg-green-700 transition"
          >
            PDF
          </button>
          
        </div>
        
      )}

      {shareType && (
        <>
          <div className="flex justify-between h-8 items-center mb-5 -w-12 p-5 ">

            <button
              aria-label="Back"
              onClick={() => setShareType(null)}
              className="p-2 -ml-20 mt-13 text-yellow-400 rounded-full hover:bg-gray-700 transition"
            >
              <FaArrowLeft size={20} />
            </button>

            <button
              aria-label="Close"
              onClick={onClose}
              className="p-2 -mr-67 mt-13 text-yellow-400 rounded-full hover:bg-gray-700 transition"
              >
              <FaTimes size={20} />
            </button>
          </div>

         <div className="flex justify-center -ml-6 mt-2 m-6 gap-3 border border-yellow-400 rounded-xl bg-white/5 backdrop-blur-md p-5 shadow-lg">

            {socialMedia.map(({ name, icon, url }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Share on ${name}`}
                className="text-yellow-500 hover:text-yellow-200 transition-transform transform hover:scale-125 drop-shadow-lg"

              >
                {icon}
              </a>
            ))}
          </div>
        </>
      )}

      
    </div>
  );
};

export default InvoiceShare;
