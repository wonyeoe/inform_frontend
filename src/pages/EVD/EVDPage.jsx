import React from "react";
import { useNavigate } from "react-router-dom";

const EVDPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-200 text-slate-800 p-4">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-8">EVD Page</h1>
        <button
          onClick={() => navigate("/evl")}
          className="px-8 py-4 bg-slate-800 text-white font-semibold rounded-lg shadow-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-75 transform hover:scale-105 transition-transform duration-200"
        >
          Go to EVL Page
        </button>
      </div>
    </div>
  );
};

export default EVDPage;
