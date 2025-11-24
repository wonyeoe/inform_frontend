// 미니 캘린더와 거의 유사
import React, { useMemo } from "react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import WeekRow from "./WeekRow";

const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MainCalendar = ({
  currentMonth, // "2025-11" 형식
  selectedDate,
  eventsByDate,
  onSelectDate,
  onMonthChange,
}) => {
  // currentMonth prop으로부터 year, month 추출
  const [yearStr, monthStr] = currentMonth.split("-");
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10) - 1; // "11" → 10 (0-based)
  // 3. 오늘 날짜 (고정) -- 필수는 아닌것 같기도
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
    console.log("📅 weeks 배열 생성:", weeksArr);
    return weeksArr;
  }, [year, month]); // ⬅️ year/month 바뀔 때마다 재계산

  // 4. 이전/다음 달 이동 - 부모에게 알림만
  const goPrevMonth = () => {
    const newMonth = month - 1;
    const newYear = newMonth < 0 ? year - 1 : year;
    const adjustedMonth = newMonth < 0 ? 11 : newMonth;
    onMonthChange(newYear, adjustedMonth);
  };

  const goNextMonth = () => {
    const newMonth = month + 1;
    const newYear = newMonth > 11 ? year + 1 : year;
    const adjustedMonth = newMonth > 11 ? 0 : newMonth;
    onMonthChange(newYear, adjustedMonth);
  };

  return (
    <div className="w-full rounded-3xl bg-white shadow-md p-6 sm:p-8 md:p-10">
      {/* 상단: 월 네비게이션 */}
      <div className="flex items-center justify-between mb-4 md:mb-5">
        <button
          type="button"
          onClick={goPrevMonth}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <IoChevronBackOutline className="text-gray-500 text-lg sm:text-xl" />
        </button>

        <div className="text-base sm:text-base md:text-lg font-semibold text-gray-800">
          {year}년 {month + 1}월
        </div>

        <button
          type="button"
          onClick={goNextMonth}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <IoChevronForwardOutline className="text-gray-500 text-lg sm:text-xl" />
        </button>
      </div>
      <div className="border-b border-gray-200 mb-4 md:mb-5" />
      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 text-center text-sm sm:text-base mb-2 md:mb-3">
        {dayLabels.map((label, idx) => (
          <div
            key={label}
            className={
              idx === 0
                ? "text-red-500 font-medium"
                : idx === 6
                  ? "text-blue-500 font-medium"
                  : "text-gray-400 font-medium"
            }
          >
            {label}
          </div>
        ))}
      </div>

      <div className="space-y-0 sm:space-y-1">
        {weeks.map((week, i) => (
          <WeekRow
            key={i}
            week={week}
            eventsByDate={eventsByDate}
            today={today}
            selectedDate={selectedDate}
            onSelectDate={onSelectDate}
          />
        ))}
      </div>
    </div>
  );
};

export default MainCalendar;
