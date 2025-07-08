export async function fetchProductByBarcode(barcode) {
  try {
    const res = await fetch(`http://localhost:5000/api/products/barcode/${barcode}`);
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
