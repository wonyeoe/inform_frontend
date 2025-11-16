// 미니 캘린더와 거의 유사
import React, { useMemo, useState } from "react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import MainCalendarMock from "../../mocks/HOM/maincalendarMock.json";
import WeekRow from "./WeekRow";

const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// 날짜 문자열을 Date 객체로 변환 (다양한 포맷 처리)
const parseDate = (dateStr) => {
  if (!dateStr) return null;
  // "2025-03-10." 또는 "2025.11.10." 형식 처리
  const cleaned = dateStr.replace(/\.$/, "").replace(/\./g, "-");
  const date = new Date(cleaned);
  return isNaN(date.getTime()) ? null : date;
};

// 날짜를 YYYY-MM-DD 형식으로 변환
const formatDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const MainCalendar = () => {
  const [current, setCurrent] = useState(new Date()); //현재 날짜와 시간이 저장된 Date 객체 반환
  const today = useMemo(() => new Date(), []);
  const [event, setEvent] = useState(MainCalendarMock);

  const year = current.getFullYear(); //오늘의 년도 반환
  const month = current.getMonth(); // 오늘의 월 반환(0~11)

  // 이벤트 배열을 날짜별로 매핑 (start_at ~ end_at 기간 동안 모두 표시)
  const eventsByDate = useMemo(() => {
    const eventMap = {};

    event.articles.forEach((article) => {
      const startDate = parseDate(article.start_at);
      const endDate = parseDate(article.end_at);

      if (!startDate || !endDate) return;

      // start_at부터 end_at까지 모든 날짜에 이벤트 추가
      const current = new Date(startDate);
      while (current <= endDate) {
        const key = formatDateKey(current);
        if (!eventMap[key]) {
          eventMap[key] = [];
        }
        eventMap[key].push(article);

        // 다음 날로 이동
        current.setDate(current.getDate() + 1);
      }
    });

    return eventMap;
  }, [event]);

  // 6x7 그리드용 날짜 데이터
  const weeks = useMemo(() => {
    const firstDay = new Date(year, month, 1); //현재 일 기준 년도 월 가져오고 일은 1일로 지정
    const startWeekday = firstDay.getDay(); //해당 월의 1일의 요일을 가져옴 (0(일요일) ~ 6(토요일))

    const daysInCurrent = new Date(year, month + 1, 0).getDate(); //이번 달의 마지막 날(30 or 31)
    console.log("daysInCurrent : ", daysInCurrent);
    const daysInPrev = new Date(year, month, 0).getDate(); //지난달의 마지말 날 (30 or 31)

    const cells = []; //달력에 보여줄 날짜 객체를 담는 배열
    /**
     * {
     *  date : {
     *  year : 2025,
     *  month : 11,
     *  day : 15
     * }
     *  isCurrentMonth : false
     * },
     * {
     *  date : {}
     * }
     */

    // 1) 앞쪽: 지난 달 날짜 - 흐릿하게 표현되는 날짜
    for (let i = startWeekday - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, daysInPrev - i);
      cells.push({ date, inCurrentMonth: false });
    }

    // 2) 이번 달 날짜
    for (let d = 1; d <= daysInCurrent; d++) {
      //이번달의 날의 수만큼 반복하여 화면에 보일 셸을 지정
      const date = new Date(year, month, d);
      cells.push({ date, inCurrentMonth: true });
    }

    // 3) 뒤쪽: 다음 달 날짜 - 흐릿하게 표현되는 날짜
    const remaining = 42 - cells.length;
    for (let d = 1; d <= remaining; d++) {
      const date = new Date(year, month + 1, d);
      cells.push({ date, inCurrentMonth: false });
    }

    // 7개씩 잘라서 주 단위 배열로
    const weeksArr = [];
    for (let i = 0; i < cells.length; i += 7) {
      weeksArr.push(cells.slice(i, i + 7));
    }
    console.log("weeksArr : ", weeksArr);
    return weeksArr;
  }, [year, month]); //useMemo hook을 사용해 해와 년이 바뀔 때 마다 재 랜더링

  const goPrevMonth = () => setCurrent(new Date(year, month - 1, 1)); // 직전 월의 1일로 현재 날짜 변경
  const goNextMonth = () => setCurrent(new Date(year, month + 1, 1)); // 다음 월의 1일로 현재날짜 변경

  return (
    <div className="w-full rounded-4xl bg-white shadow-md p-10">
      {/* 상단: 월 네비게이션 */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={goPrevMonth}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <IoChevronBackOutline className="text-gray-400 text-xl" />
        </button>

        <div className="text-2xl font-semibold text-gray-800">
          {year}년 {month + 1}월
        </div>

        <button
          type="button"
          onClick={goNextMonth}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <IoChevronForwardOutline className="text-gray-400 text-xl" />
        </button>
      </div>

      <div className="border-b border-gray-200 mb-8" />

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 text-center text-sm mb-6">
        {dayLabels.map((label, idx) => (
          <div
            key={label}
            className={
              idx === 0
                ? "text-red-500"
                : idx === 6
                  ? "text-blue-500"
                  : "text-gray-400"
            }
          >
            {label}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 + 이벤트 바 (주 단위) */}
      <div>
        {weeks.map((week, i) => (
          <WeekRow
            key={i}
            week={week}
            eventsByDate={eventsByDate}
            today={today}
          />
        ))}
      </div>
    </div>
  );
};

export default MainCalendar;
