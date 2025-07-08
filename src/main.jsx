import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { InvoiceProvider } from "./Conponents/invoice/InvoiceContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <InvoiceProvider>
      <App />
    </InvoiceProvider>
  </BrowserRouter>
);
