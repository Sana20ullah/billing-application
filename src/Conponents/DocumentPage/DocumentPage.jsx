import React from "react";
import { useNavigate } from "react-router-dom";

export default function DocumentPage() {
  const navigate = useNavigate();

  return (
    <div className="p-8 max-w-4xl mx-auto text-gray-800 bg-white min-h-screen">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-600 hover:underline"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-6 text-center">📖 Billing App Documentation</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">🔍 Overview</h2>
        <p>
          This billing application is designed to simplify shop billing, print receipts, and track daily and monthly sales.
          It’s built using <strong>React</strong> for the frontend and <strong>Node.js + MongoDB</strong> for the backend.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">🧾 Invoice Printing</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>When "Print" is clicked, the total bill is saved to MongoDB.</li>
          <li>The system triggers <code>window.print()</code> to open the browser’s print window.</li>
          <li>Buttons and controls are hidden during printing using <code>print:hidden</code> CSS classes.</li>
          <li>QR/barcode can be printed if configured properly.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">📅 Day Sales Logic</h2>
        <p>
          Every print saves the total of the day into the <code>DaySales</code> collection.
          Only the total of the day is stored — not every invoice.
        </p>
        <ul className="list-disc list-inside mt-2">
          <li>At the end of the day, the record is created once.</li>
          <li>Each entry auto-deletes after 7 days using MongoDB TTL index.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">📊 Monthly Amount Form</h2>
        <p>
          The total from all daily records within the month is shown here.
          No detailed invoices are shown—just daily totals.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">🛠 Technologies Used</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Frontend: React, Tailwind CSS</li>
          <li>Backend: Node.js, Express.js</li>
          <li>Database: MongoDB Atlas</li>
          <li>Print: Browser <code>window.print()</code></li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">📦 Collections</h2>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>DaySales:</strong> Stores one total per day</li>
          <li><strong>Invoices:</strong> Stores individual invoices (optional)</li>
          <li><strong>Products:</strong> Stores product data for selection</li>
        </ul>
      </section>

      <footer className="text-center text-sm text-gray-500 mt-12 mb-6">
        Last updated: {new Date().toLocaleDateString()}
      </footer>
    </div>
  );
}
