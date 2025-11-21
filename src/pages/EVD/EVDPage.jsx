import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/common/Header";
import TabBar from "../../components/common/TabBar";
import Footer from "../../components/common/Footer";
import EventDetail from "../../components/EVD/EventDetail";
import EVLMockData from "../../mocks/EVL/EventRowMock.json"
import EVDMockData from "../../mocks/EVD/EventDetailMock.json";


const EVDPage = () => {
  const navigate = useNavigate();
  
  // URL 파라미터에서 id값 가져오기
  const { id } = useParams(); 
  const [event, setEvent] = useState(null);

  useEffect(() => {
    // 일치하는 id 없으면 1번 ID를 강제로 사용 (테스트용!!!! 나중에 바꾸기)
    const targetId = id ? parseInt(id) : 1;

    // 전체 리스트에서 ID 일치하는 행사 찾기
    const foundEvent = EVLMockData.school_articles.find(
      (item) => item.article_id === targetId
    );

    if (foundEvent) {
      // 찾았으면 리스트 정보 +  상세 내용을 합치기
      setEvent({
        ...EVDMockData, // 기본 틀(content 등)
        ...foundEvent,        // 실제 정보(title, date 등)
        vendors: foundEvent.vendors || EVDMockData.vendors 
      });
    } else {
      setEvent(EVDMockData);
    }
  }, [id]);

  if (!event) return <div className="min-h-screen bg-gray-50 pt-20 text-center">로딩중...</div>;

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
