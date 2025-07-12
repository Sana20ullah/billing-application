import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export default function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    shopName: "",
    role: "admin",
  });
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${backendURL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      alert("Sign up successful!");
      navigate("/login");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center text-white px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-black border border-yellow-500 p-8 rounded-xl shadow-lg space-y-4">
        <h2 className="text-3xl font-bold text-center text-yellow-500">Sign Up</h2>

        {["name", "email", "shopName"].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            onChange={handleChange}
            required
            className="w-full p-3 bg-transparent border-b border-yellow-500 text-yellow-500 placeholder-yellow-500 focus:outline-none"
          />
        ))}

        <select
          name="role"
          onChange={handleChange}
          className="w-full p-3 bg-black border-b border-yellow-500 text-yellow-500"
        >
          <option value="admin">Admin</option>
          <option value="saler">Saler</option>
          <option value="cashier">Cashier</option>
        </select>

        {["password", "confirmPassword"].map((field) => (
          <div key={field} className="relative">
            <input
              name={field}
              type={showPass ? "text" : "password"}
              placeholder={field === "confirmPassword" ? "Confirm Password" : "Password"}
              onChange={handleChange}
              required
              className="w-full p-3 bg-transparent border-b border-yellow-500 text-yellow-500 placeholder-yellow-500 focus:outline-none"
            />
            <span
              className="absolute right-3 top-3 text-yellow-500 cursor-pointer"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-yellow-500 text-black py-3 rounded font-bold hover:bg-yellow-600"
        >
          Register
        </button>

        <p className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
