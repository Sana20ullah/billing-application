// src/Conponents/ForgotPassword/ForgotPassword.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);
      alert("OTP sent to your email!");
      localStorage.setItem("resetEmail", email); // store email for next step
      navigate("/verify-otp");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-yellow-300">
      <form
        onSubmit={handleSubmit}
        className="bg-black/80 p-6 border border-yellow-400 rounded-xl space-y-4 max-w-md w-full"
      >
        <h2 className="text-2xl text-yellow-400 text-center font-bold">
          Forgot Password
        </h2>
        <input
          type="email"
          required
          placeholder="Enter your registered email"
          className="w-full px-4 py-3 bg-black border border-yellow-400 rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="w-full py-3 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-600"
        >
          Send OTP
        </button>
      </form>
    </div>
  );
}
