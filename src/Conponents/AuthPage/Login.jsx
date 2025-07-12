// ✅ All imports go here at the top
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export default function Login({ setUser }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${backendURL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      navigate("/");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-black text-white">
      <form onSubmit={handleSubmit} className="bg-black border border-yellow-500 p-6 rounded-lg w-[400px] space-y-4 shadow-xl">
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <input
          name="email"
          type="email"
          placeholder="EMAIL"
          onChange={handleChange}
          required
          className="w-full bg-transparent border-b border-yellow-500 p-2 placeholder-yellow-500 focus:outline-none"
        />

        <div className="relative">
          <input
            name="password"
            type={showPass ? "text" : "password"}
            placeholder="PASSWORD"
            onChange={handleChange}
            required
            className="w-full bg-transparent border-b border-yellow-500 p-2 placeholder-yellow-500 focus:outline-none"
          />
          <span
            className="absolute right-3 top-2 text-yellow-500 cursor-pointer"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="text-right text-yellow-500 text-sm cursor-pointer hover:underline">
          Forgot password?
        </div>

        <button className="w-full bg-yellow-500 text-black py-2 rounded font-bold">
          Login
        </button>

        {/* ✅ This is valid now */}
        <p className="text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-yellow-500 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
