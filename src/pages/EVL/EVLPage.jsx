import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/common/Header"
import TabBar from "../../components/common/TabBar";
import Footer from "../../components/common/Footer";
import MiniCalendar from "../../components/common/MiniCalendar"
import EventRow from "../../components/EVL/EventRow"
import mockData from "../../mocks/EVL/EventRowMock.json";
import imminentEventsMockData from "../../mocks/EVL/ImminentEventMock.json"
import SearchBar from "../../components/common/SearchBar";
import ClubCarousel from "../../components/common/ClubCarousel";
import Imminent from "../../components/common/Imminent";


const EVLPage = () => {
  const navigate = useNavigate();
  const events = mockData.school_articles;
  const imminentEvents = imminentEventsMockData.school_articles;


  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchText, setSearchText] = useState("");

  const categories = [
    { id: "ALL", label: "전체" },
    { id: "LECTURE", label: "특강" },
    { id: "COMPETITION", label: "대회" },
    { id: "CONTEST", label: "공모전" },
  ];

  const filteredEvents = events.filter((event) => {
    const isCategoryMatch = 
      selectedCategory === "ALL" || 
      event.categories?.category_name === selectedCategory;

    const isSearchMatch =
      event.title.toLowerCase().includes(searchText.toLowerCase());

    return isCategoryMatch && isSearchMatch;
  });

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

  const handleRowClick = (id) => {
    navigate(`detail/${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <TabBar/>
      <div className="flex-1 w-full max-w-6xl mx-auto px-4 py-6">
        {/* FlexBox로 좌우 배치 */}
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* 왼쪽 사이드바 (캘린더 + 동아리 홍보) */}
          <aside className="w-full md:w-1/3 lg:w-1/4 space-y-6">
            <MiniCalendar />
            <ClubCarousel />
            <div className="p-4 max-w-100 rounded-3xl bg-white shadow-md flex flex-col items-center">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                🔥 마감 임박
              </h3>
              <div className="space-y-1">
                {imminentEvents.map((imminentEvent) => (
                  <Imminent
                    id={imminentEvent.article_id}
                    title={imminentEvent.title}
                    date={imminentEvent.due_date} // 마감일 표시 맞겠지..?
                    onClick={() => handleRowClick(imminentEvent.article_id)}
                  />
                ))}
              </div>
            </div>
          </aside>
          <main className="flex-1 w-full bg-white rounded-xl shadow-sm border border-gray-200 p-6 min-h-[500px]">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <h2 className="text-xl font-bold text-gray-800 w-full sm:w-auto">
                이벤트/행사 목록
              </h2>
              <div className="w-full sm:w-64">
                <SearchBar 
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="행사 제목 검색"
                />
              </div>
            </div>

            {/* 카테고리 탭 버튼 */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 
                    ${selectedCategory === cat.id 
                      ? "bg-blue-500 text-white shadow-md transform scale-105" // 선택됨
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200" // 선택 안됨
                    }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          
             <div className="space-y-1">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <EventRow
                    id={event.article_id}
                    title={event.title}
                    date={event.created_at} 
                    status={getStatus(event.start_date, event.due_date)}
                    onClick={() => handleRowClick(event.article_id)}
                  />
                ))
              ) : (
                // 검색 결과가 없을 때
                <div className="text-center py-20 text-gray-400 flex flex-col items-center">
                  <p>조건에 맞는 행사가 없습니다.</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EVLPage;