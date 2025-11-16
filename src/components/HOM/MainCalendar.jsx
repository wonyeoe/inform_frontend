// 미니 캘린더와 거의 유사
import React, { useMemo, useState } from "react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import WeekRow from "./WeekRow";

const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MainCalendar = ({ selectedDate, eventsByDate, onSelectDate }) => {
  // 1. currentDate를 "현재 보고 있는 달의 아무 날짜"로 사용 (Date 객체)
  const [currentDate, setCurrentDate] = useState(
    () => new Date(`${selectedDate}T00:00:00`)
  );

  // 2. currentDate 기준으로 year, month(0~11) 뽑기
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0 = 1월

  // 3. 오늘 날짜 (고정)
  const today = useMemo(() => new Date(), []);

  // 3. weeks 계산
  const weeks = useMemo(() => {
    // 이번 달 1일
    const firstDayOfMonth = new Date(year, month, 1);

    // 이번 달 1일의 요일 (0:일 ~ 6:토)
    const startWeekday = firstDayOfMonth.getDay();

    // 이번 달 마지막 날 (28~31)
    const daysInCurrent = new Date(year, month + 1, 0).getDate();

    // 지난달 마지막 날
    const daysInPrev = new Date(year, month, 0).getDate();

    console.log("daysInCurrent:", daysInCurrent);
    console.log("daysInPrev:", daysInPrev);

    const cells = [];

    // 1) 앞쪽: 지난달 날짜들 ( 흐릿하게 표시할 칸 )
    for (let i = startWeekday - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, daysInPrev - i);
      cells.push({ date, inCurrentMonth: false });
    }

    // 2) 이번 달 날짜들
    for (let d = 1; d <= daysInCurrent; d++) {
      const date = new Date(year, month, d);
      cells.push({ date, inCurrentMonth: true });
    }

    // 3) 뒤쪽: 다음달 날짜들
    const remaining = 42 - cells.length; // 6주 * 7일 = 42칸 가정
    for (let d = 1; d <= remaining; d++) {
      const date = new Date(year, month + 1, d);
      cells.push({ date, inCurrentMonth: false });
    }

    // 7개씩 잘라서 주 단위 배열로 변환
    const weeksArr = [];
    for (let i = 0; i < cells.length; i += 7) {
      weeksArr.push(cells.slice(i, i + 7));
    }

    return weeksArr;
  }, [year, month]); // ⬅️ year/month 바뀔 때마다 재계산

  // 4. 이전/다음 달 이동
  const goPrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

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

      <div>
        {weeks.map((week, i) => (
          <WeekRow
            key={i}
            week={week}
            eventsByDate={eventsByDate}
            today={today}
            onDateClick={onSelectDate}
          />
        ))}
      </div>
    </div>
  );
};

export default MainCalendar;
