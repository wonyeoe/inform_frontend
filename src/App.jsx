import { Route, Routes } from "react-router-dom";
import CBLPage from "./pages/CBL/CBLPage";
import EVLPage from "./pages/EVL/EVLPage";
import EVDPage from "./pages/EVD/EVDPage";
import CBDPage from "./pages/CBD/CBDPage";
import HOMPage from "./pages/HOM/HOMPage";
import TestPage from "./pages/TEST/TestPage";
import TabBarPage from "./pages/COMMON/TabBarPage";
import SearchBarPage from "./pages/COMMON/SearchBarPage";

import COM3Page from "./pages/COMMON/COM3Page";
import HeaderPage from "./pages/COMMON/HeaderPage";
import NotFoundPage from "./pages/NOT/NotFoundPage";

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
          <Route path="tabBar" element={<TabBarPage />} />
          <Route path="searchBar" element={<SearchBarPage />} />
          <Route path="com3" element={<COM3Page />} />
          <Route path="header" element={<HeaderPage />} />
        </Route>
        <Route path="test" element={<TestPage />} />
        <Route path="" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
