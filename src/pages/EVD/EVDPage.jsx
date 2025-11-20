import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/common/Header"
import TabBar from "../../components/common/TabBar";
import Footer from "../../components/common/Footer";
import EventDetail from "../../components/EVD/EventDetail";
import mockData from "../../mocks/EVD/EventDetailMock.json";


const EVDPage = () => {
  const navigate = useNavigate();
  const event = mockData;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <TabBar/>
      <div className="flex-1 w-full max-w-6xl mx-auto px-4 py-6">
        <EventDetail 
          title={event.title}
          vendor={event.vendors.vendor_name}
          startDate={event.start_date}
          dueDate={event.due_date}
          created_at={event.created_at}
          content={event.content}
          linkUrl={event.original_url}
        />
      </div>
      <Footer />
    </div>
  );
};

export default EVDPage;
