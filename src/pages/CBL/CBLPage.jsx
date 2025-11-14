import React from "react";
import { useNavigate } from "react-router-dom";

const CBLPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-500 text-white p-4">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-8">CBL Page</h1>
        <button
          onClick={() => navigate("/evd")}
          className="px-8 py-4 bg-white text-yellow-600 font-semibold rounded-lg shadow-md hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 transform hover:scale-105 transition-transform duration-200"
        >
          Go to EVD Page
        </button>
      </div>
    </div>
  );
};

export default CBLPage;
