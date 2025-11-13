import { Route, Routes } from "react-router-dom";
import "./App.css";
import CBLPage from "./pages/CBL/CBLPage";
import EVLPage from "./pages/EVL/EVLPage";
import EVDPage from "./pages/EVD/EVDPage";
import CBDPage from "./pages/CBD/CBDPage";
import HOMPage from "./pages/HOM/HOMPage";
import TestPage from "./pages/TEST/TestPage";
import COM3Page from "./pages/COMMON/COM3Page";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HOMPage />} />
        <Route path="clubs">
          <Route index element={<CBLPage />} />
          <Route path="detail" element={<CBDPage />} />
        </Route>
        <Route path="events">
          <Route index element={<EVLPage />} />
          <Route path="detail" element={<EVDPage />} />
        </Route>
        <Route path="modules">
          <Route path="com3" element={<COM3Page />} />
        </Route>
        <Route path="test" element={<TestPage />} />
      </Routes>
    </>
  );
}

export default App;
