import React from "react";
import { useNavigate } from "react-router-dom";

const CBDPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-500 text-white p-4">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-8">CBD Page</h1>
      </div>
    </div>
  );
};

export default CBDPage;
