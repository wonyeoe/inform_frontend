import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import MainCalendar from "../../components/HOM/MainCalendar";
import TabBar from "../../components/common/TabBar";
import CalendarCell from "../../components/HOM/CalendarCell";
import maincalendarMock from "../../mocks/HOM/maincalendarMock.json";
import { parseDate, formatDateKey } from "../../utils/dateUtil";

const HOMPage = () => {
  const navigate = useNavigate();

  // 1. 이벤트 데이터 상태 관리
  const [events, setEvents] = useState(maincalendarMock);
  const [currentDate, setCurrentDate] = useState(() => {
    const today = new Date();
    return formatDateKey(today);
  });

  // 2. eventsByDate : 일별로 매핑된 배열
  const eventsByDate = useMemo(() => {
    const eventMap = {};

    events.articles.forEach((article) => {
      const startDate = parseDate(article.start_at);
      const endDate = parseDate(article.end_at);

      if (!startDate || !endDate) return;

      // 필요한 데이터만 추출한 경량 객체 생성
      const SingleEvent = {
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
    console.log("📌 날짜 선택됨:", dateKey);
    console.log("📋 이 날의 이벤트:", eventsByDate[dateKey] || "이벤트 없음");
  };
  return (
    <div>
      <Header />
      <TabBar />
      <MainCalendar
        selectedDate={currentDate}
        eventsByDate={eventsByDate}
        onSelectDate={handleDateClick}
      />
      <Footer />
    </div>
  );
};

export default HOMPage;
