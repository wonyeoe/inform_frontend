import React from "react";
import { useNavigate } from "react-router-dom";
import EventRow from "../../components/EVL/EventRow";
import mockData from "../../mocks/EVL/EventRowMock.json";

const EventRowPage = () => {
  const navigate = useNavigate();
  const events = mockData.school_articles;
  const getStatus = (startDate, dueDate) => {
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(dueDate);

    today.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
    
    if (today < start) return "예정";
    if (today > end) return "마감";
    return "진행중";
  };

  return (
    <div className="p-8 space-y-2">
      {events.map((event) => (
          <EventRow
            key={event.article_id}
            title={event.title}
            date={event.created_at} 
            status={getStatus(event.start_date, event.due_date)}
          />
        ))}
    </div>
  );
};

export default EventRowPage;
