import React from "react";
import { useNavigate } from "react-router-dom";

const TestPage = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8 space-y-4">
      <button
        onClick={() => navigate("/")}
        className="w-full bg-blue-500 text-white py-3 px-4 rounded hover:bg-blue-600"
      >
        HOM
      </button>
      <button
        onClick={() => navigate("/clubs/detail")}
        className="w-full bg-blue-500 text-white py-3 px-4 rounded hover:bg-blue-600"
      >
        CBD
      </button>
      <button
        onClick={() => navigate("/clubs")}
        className="w-full bg-blue-500 text-white py-3 px-4 rounded hover:bg-blue-600"
      >
        CBL
      </button>
      <button
        onClick={() => navigate("/events")}
        className="w-full bg-blue-500 text-white py-3 px-4 rounded hover:bg-blue-600"
      >
        EVL
      </button>
      <button
        onClick={() => navigate("/events/detail")}
        className="w-full bg-blue-500 text-white py-3 px-4 rounded hover:bg-blue-600"
      >
        EVD
      </button>
       <button
        onClick={() => navigate("/modules/com3")}
        className="w-full bg-blue-500 text-white py-3 px-4 rounded hover:bg-blue-600"
      >
        COM3
      </button>

    </div>
  );
};

export default TestPage;
