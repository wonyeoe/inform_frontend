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
        onClick={() => navigate("/modules/tabBar")}
        className="w-full bg-blue-500 text-white py-3 px-4 rounded hover:bg-blue-600"
      >
        TabBar
      </button>
      <button
        onClick={() => navigate("/modules/searchBar")}
        className="w-full bg-blue-500 text-white py-3 px-4 rounded hover:bg-blue-600"
      >
        SearchBar
      </button>
      <button
        onClick={() => navigate("/modules/header")}
        className="w-full bg-blue-500 text-white py-3 px-4 rounded hover:bg-blue-600"
      >
        Header
      </button>
      <button
        onClick={() => navigate("/modules/miniCalendar")}
        className="w-full bg-blue-500 text-white py-3 px-4 rounded hover:bg-blue-600"
      >
        MiniCalendar
      </button>
      <button
        onClick={() => navigate("/modules/eventRow")}
        className="w-full bg-blue-500 text-white py-3 px-4 rounded hover:bg-blue-600"
      >
        EventRow
      </button>
      <button
        onClick={() => navigate("/modules/mainCalendar")}
        className="w-full bg-blue-500 text-white py-3 px-4 rounded hover:bg-blue-600"
      >
        MainCalendar
      </button>
      <button
        onClick={() => navigate("/modules/eventDetail")}
        className="w-full bg-blue-500 text-white py-3 px-4 rounded hover:bg-blue-600"
      >
        EventDetail
      </button>
      <button
        onClick={() => navigate("/modules/serviceLink")}
        className="w-full bg-blue-500 text-white py-3 px-4 rounded hover:bg-blue-600"
      >
        ServiceLink
      </button>
    </div>
  );
};

export default TestPage;
