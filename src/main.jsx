import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";  // Make sure path and name match your App component file

import { InvoiceProvider } from "./Conponents/invoice/InvoiceContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <InvoiceProvider>
        <App />
      </InvoiceProvider>
    </BrowserRouter>
  </React.StrictMode>
);
