import { Route, Routes } from "react-router-dom";
import CBLPage from "./pages/CBL/CBLPage";
import EVLPage from "./pages/EVL/EVLPage";
import EVDPage from "./pages/EVD/EVDPage";
import CBDPage from "./pages/CBD/CBDPage";
import HOMPage from "./pages/HOM/HOMPage";
import TestPage from "./pages/TEST/TestPage";
import TabBarPage from "./pages/COMMON/TabBarPage";
import SearchBarPage from "./pages/COMMON/SearchBarPage";
import HeaderPage from "./pages/COMMON/HeaderPage";
import NotFoundPage from "./pages/NOT/NotFoundPage";
import MiniCalendarPage from "./pages/COMMON/MiniCalendarPage";
import EventRowPage from "./pages/EVL/EventRowPage";
import MainCalendarPage from "./pages/HOM/MainCalendarPage";
import EventDetailPage from "./pages/EVD/EventDetailPage";
import ServiceLinkPage from "./pages/COMMON/ServiceLinkPage";
import ImminentEventsPage from "./pages/HOM/ImminentEventsPage";


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
          <Route path="detail/:id" element={<EVDPage />} />
        </Route>
        <Route path="modules">
          <Route path="tabBar" element={<TabBarPage />} />
          <Route path="searchBar" element={<SearchBarPage />} />
          <Route path="header" element={<HeaderPage />} />
          <Route path="miniCalendar" element={<MiniCalendarPage/>}/>
          <Route path="eventRow" element={<EventRowPage />} />        
          <Route path="mainCalendar" element={<MainCalendarPage/>}/>
          <Route path="eventDetail" element={<EventDetailPage />} />   
          <Route path="serviceLink" element={<ServiceLinkPage/>} />
          <Route path="imminentEvents" element={<ImminentEventsPage/>} />     
        </Route>

        <Route path="test" element={<TestPage />} />
        <Route path="" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
