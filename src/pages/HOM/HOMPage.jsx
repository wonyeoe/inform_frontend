import React from "react";
import { useNavigate } from "react-router-dom";

const HOMPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-500 text-white p-4">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-8">HOM Page</h1>
        <button
          onClick={() => navigate("clubs/detail")}
          className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transform hover:scale-105 transition-transform duration-200"
        >
          Go to CBD Page
        </button>
      </div>
    </div>
  );
};

export default HOMPage;
