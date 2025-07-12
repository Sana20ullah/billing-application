// MainPage.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import Login from "./Conponents/AuthPage/Login";
import SignUp from "./Conponents/AuthPage/SignUp";
import App from "./App";

export default function MainPage() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const publicPaths = ["/login", "/signup"];
    const isPublic = publicPaths.includes(location.pathname);

    if (!user && !isPublic) {
      navigate("/login");
    }
  }, [user, navigate, location.pathname]);

  return (
    <Routes>
      <Route path="/login" element={<Login setUser={setUser} />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/*"
        element={
          user ? (
            <App
              onLogout={() => {
                localStorage.removeItem("user");
                setUser(null);
                navigate("/login");
              }}
              userRole={user?.role}
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
}
