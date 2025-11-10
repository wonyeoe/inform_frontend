import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import HOM from "./pages/HOM/HOM.jsx";
import IVL from "./pages/IVL/IVL.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <IVL />
  </StrictMode>
);
