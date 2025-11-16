import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import MainCalendar from "../../components/HOM/MainCalendar";
import TabBar from "../../components/common/TabBar";

const HOMPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <TabBar />
      <MainCalendar />
      <Footer />
    </div>
  );
};

export default HOMPage;
