import React from "react";
import ListItem from "../../components/EVL/EventRow";

const EventRowPage = () => {
  return (
    <div className="p-8 space-y-2">
      <ListItem
        status="진행중"
        title="2026학년도 상반기 채용연계형 일학습병행(IPP)-첨단산업 아카데미 학생모집 안내"
        time="20:00"
      />
    </div>
  );
};

export default EventRowPage;
