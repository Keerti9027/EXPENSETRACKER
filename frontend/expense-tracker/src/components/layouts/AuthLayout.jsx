import React from 'react';
import loginGif from '../../assets/images/Login.GIF'; // Save your GIF with this name in the correct folder
import Navbar from './Navbar';

const AuthLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-blue-200 to-green-200 items-center justify-center px-2 sm:px-4">
        {/* Left Side - Form */}
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-md md:w-[60%] lg:w-[40%] p-6 sm:p-8 md:mx-10 my-8 md:my-10">
          <h2 className="text-lg md:text-xl font-medium text-black mb-4 text-center md:text-left">Expense Tracker</h2>
          {children}
        </div>
        {/* Right Side - GIF Animation */}
        <div className="hidden md:flex w-[40%] h-full items-center justify-center">
          <img
            src={loginGif}
            alt="Login Animation"
            className="w-[220px] sm:w-[320px] md:w-[400px] lg:w-[500px] h-auto object-contain"
          />
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
