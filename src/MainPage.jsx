// MainPage.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App";

export default function MainPage() {
  return (
    <Routes>
      <Route path="/*" element={<App />} />
    </Routes>
  );
}

