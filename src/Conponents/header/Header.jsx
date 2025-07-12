// src/Conponents/header/Header.jsx
import React from 'react';

const Header = ({ onLogout }) => {
  return (
    <header className="bg-black text-white px-8 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-xl font-bold tracking-wide bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          SaNa
        </div>

        <div className="text-2xl font-semibold hidden sm:block bg-gradient-to-r from-red-500 via-pink-500 to-yellow-500 bg-clip-text text-transparent">
          Billing App
        </div>

        <button
          onClick={onLogout}
          className="px-6 py-2 rounded-lg font-semibold text-white
            bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500
            hover:from-pink-500 hover:via-purple-600 hover:to-indigo-600
            transition-all duration-500 shadow-md hover:shadow-[0_0_15px_5px_rgba(219,112,147,0.7)]"
        >
          Log out
        </button>
      </div>
    </header>
  );
};

export default Header;
