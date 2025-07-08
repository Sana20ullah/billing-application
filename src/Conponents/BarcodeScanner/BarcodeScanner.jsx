import React, { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function BarcodeScanner({ onScanSuccess }) {
  useEffect(() => {
    const scannerId = "scanner";
    const config = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
    };

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Camera access is not supported on this device/browser.");
      return;
    }

    const scanner = new Html5QrcodeScanner(scannerId, config, false);

    scanner.render(
      (decodedText, result) => {
        console.log("Scanned code:", decodedText);
        onScanSuccess(decodedText);
        // Comment this if you want continuous scanning:
        scanner.clear().catch((e) => console.error("Clear error:", e));
      },
      (error) => {
        console.warn("Scan error:", error);
      }
    );

    return () => {
      scanner.clear().catch((e) => console.warn("Scanner cleanup error:", e));
    };
  }, [onScanSuccess]);

  return (
    <div>
      <div id="scanner" className="w-full max-w-md mx-auto mt-5" />
    </div>
  );
}
