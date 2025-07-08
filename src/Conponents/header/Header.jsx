import React from 'react';

const Header = () => {
  return (
    <header className="bg-black from-indigo-500 to-purple-600 text-white px-8 py-3 h-vh shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
      <div className="text-xl font-bold tracking-wide bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
  SaNa
</div>


        {/* Center Title */}
 <div className="text-2xl font-semibold tracking-wide hidden sm:block
                bg-gradient-to-r from-red-500 via-pink-500 to-yellow-500 bg-clip-text text-transparent">
  Billing App
</div>




        {/* Right - Sign/Login */}
        <div className="flex gap-4">
         <button className="px-6 py-2 rounded-lg font-semibold text-white
  bg-gradient-to-r from-purple-600 via-pink-500 to-red-500
  hover:from-red-500 hover:via-pink-600 hover:to-purple-600
  transition-all duration-500 shadow-md hover:shadow-[0_0_15px_5px_rgba(255,105,180,0.7)] ">
  Sign In
</button>

        <button className="px-6 py-2 rounded-lg font-semibold text-white
  bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500
  hover:from-pink-500 hover:via-purple-600 hover:to-indigo-600
  transition-all duration-500 shadow-md hover:shadow-[0_0_15px_5px_rgba(219,112,147,0.7)]">
  Login
</button>

        </div>
      </div>
    </header>
  );
};

export default Header;
