import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  return (
    <div className="w-full min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl px-8 py-6">
        <h1 className="text-2xl font-bold mb-3 text-slate-900">INFORM</h1>
        <button className="px-4 py-2 rounded-lg shadow-lg bg-slate-900 text-white">
          테스트 버튼
        </button>
      </div>
    </div>
  );
}

export default App;
