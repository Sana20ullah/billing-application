import React, { useState, useEffect } from "react";

const ShopNameForm = ({ shopDetails, setShopDetails }) => {
  // Local state for the form inputs
  const [shopData, setShopData] = useState(shopDetails);

  // Keep local state in sync if parent shopDetails changes
  useEffect(() => {
    setShopData(shopDetails);
  }, [shopDetails]);

  const handleChange = (e) => {
    const updated = { ...shopData, [e.target.name]: e.target.value };
    setShopData(updated);
    setShopDetails(updated); // live update parent state immediately
  };

  const handleShopFormSubmit = (e) => {
    e.preventDefault();
    console.log("Shop Data saved:", shopData);
    // You can optionally do something else on submit
  };

  return (
    <form onSubmit={handleShopFormSubmit} className="space-y-4">
      <input
        name="name"
        value={shopData.name}
        onChange={handleChange}
        placeholder="Shop Name"
        className="border p-2 w-full"
      />
      <input
        name="address"
        value={shopData.address}
        onChange={handleChange}
        placeholder="Address"
        className="border p-2 w-full"
      />
      <input
        name="phone"
        value={shopData.phone}
        onChange={handleChange}
        placeholder="Phone"
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Save
      </button>
    </form>
  );
};

export default ShopNameForm;
