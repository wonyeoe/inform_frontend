import { Route, Routes } from "react-router-dom";
import CBLPage from "./pages/CBL/CBLPage";
import EVLPage from "./pages/EVL/EVLPage";
import EVDPage from "./pages/EVD/EVDPage";
import CBDPage from "./pages/CBD/CBDPage";
import HOMPage from "./pages/HOM/HOMPage";
import TestPage from "./pages/TEST/TestPage";
import NotFoundPage from "./pages/NOT/NotFoundPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HOMPage />} />
        <Route path="clubs">
          <Route index element={<CBLPage />} />
          <Route path="detail/:id" element={<CBDPage />} />
        </Route>
        <Route path="events">
          <Route index element={<EVLPage />} />
          <Route path="detail/:id" element={<EVDPage />} />
        </Route>
        <Route path="test" element={<TestPage />} />
        <Route path="" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
