import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import MainCalendar from "../../components/HOM/MainCalendar";
import TabBar from "../../components/common/TabBar";
import maincalendarMock from "../../mocks/HOM/maincalendarMock.json";
import { parseDate, formatDateKey } from "../../utils/dateUtil";
import DaySelectEventList from "../../components/HOM/DaySelectEventList";
import ServiceLinkList from "../../components/common/ServiceLinkList";
import ClubCarousel from "../../components/common/ClubCarousel";

const HOMPage = () => {
  const navigate = useNavigate();

  const [events, setEvents] = useState(maincalendarMock); // 초기에는 mock 데이터 사용
  const [currentDate, setCurrentDate] = useState(() => {
    // 1. 초기 selectedDate : 오늘 날짜
    const today = new Date();
    return formatDateKey(today);
  });

  // 2. eventsByDate : 일별로 이벤트 매핑
  const eventsByDate = useMemo(() => {
    const eventMap = {};

    events.articles.forEach((article) => {
      const startDate = parseDate(article.start_at);
      const endDate = parseDate(article.end_at);
      if (!startDate || !endDate) return;
      // 필요한 데이터만 추출한 경량 객체 생성
      const SingleEvent = {
        article_id: article.article_id,
        title: article.title,
        category_name: article.categories?.category_name || null,
        start_at: article.start_at,
        end_at: article.end_at,
      };
      // start_at부터 end_at까지 모든 날짜에 이벤트 추가
      const current = new Date(startDate);
      while (current <= endDate) {
        const key = formatDateKey(current); // "2025-11-01" 형식

        if (!eventMap[key]) {
          eventMap[key] = []; // 빈 배열 생성
        }
        eventMap[key].push(SingleEvent); // 경량 객체 추가
        // 다음 날로 이동
        current.setDate(current.getDate() + 1);
      }
    });

    console.log("📅 날짜별 이벤트 매핑 완료:", eventMap);
    return eventMap;
  }, [events]); // events가 변경될 때만 재계산

  // 날짜 클릭 핸들러 - CalendarCell에서 전달받은 날짜 처리
  const handleDateClick = (date) => {
    const dateKey = formatDateKey(date); // Date 객체 → "2025-11-16"
    setCurrentDate(dateKey);
  };
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <TabBar />

      {/* 배너 이미지 - 중앙 정렬 */}
      <div className="w-full flex justify-center px-4 mt-6">
        <img
          src="/assets/header/headertest.png"
          alt="HOM 배너"
          className="w-full max-w-6xl h-40 object-cover rounded-lg"
        />
      </div>

      {/* SSO 링크 + 캘린더 - 중앙 정렬 */}
      <div className="w-full flex justify-center px-4 py-6">
        <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-6">
          <div className="flex-shrink-0 lg:w-auto w-full flex justify-center lg:justify-start">
            <ServiceLinkList />
          </div>
          <div className="flex-1 min-w-0">
            <MainCalendar
              selectedDate={currentDate}
              eventsByDate={eventsByDate}
              onSelectDate={handleDateClick}
            />
          </div>
        </div>
      </div>

      {/* 하단: 이벤트 리스트 - 중앙 정렬 */}
      <div className="w-full flex justify-center px-4">
        <div className="w-full max-w-6xl">
          <DaySelectEventList
            events={eventsByDate[currentDate]}
            currentDate={currentDate}
          />
        </div>
      </div>
      <ClubCarousel />
      <Footer />
    </div>
  );
};

export default HOMPage;
