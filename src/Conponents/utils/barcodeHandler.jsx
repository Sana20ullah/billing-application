export async function fetchProductByBarcode(barcode) {
  const backendURL =
    import.meta.env.VITE_BACKEND_URL ||
    (window.location.hostname === "localhost"
      ? "http://localhost:5000"
      : "");

  try {
    const res = await fetch(`${backendURL}/api/products/barcode/${barcode}`);
    if (!res.ok) throw new Error("Product not found");

    const data = await res.json();

    return {
      item: data.name,
      qty: 1,
      rate: data.rate,
      amount: data.rate * 1,
    };
  } catch (err) {
    console.error("Error fetching barcode product:", err);
    alert("Product not found.");
    return null;
  }
}
