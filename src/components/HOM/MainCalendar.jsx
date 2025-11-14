// 미니 캘린더와 거의 유사
import React, { useMemo, useState } from "react";
import {
  IoChevronBackOutline,
  IoChevronForwardOutline,
} from "react-icons/io5";

const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MainCalendar = () => {
  const [current, setCurrent] = useState(new Date());
  const today = useMemo(() => new Date(), []);

  const year = current.getFullYear();
  const month = current.getMonth();

  // 6x7 그리드용 날짜 데이터
  const weeks = useMemo(() => {
    const firstDay = new Date(year, month, 1);
    const startWeekday = firstDay.getDay(); 

    const daysInCurrent = new Date(year, month + 1, 0).getDate();
    const daysInPrev = new Date(year, month, 0).getDate();

    const cells = [];

    // 1) 앞쪽: 지난 달 날짜
    for (let i = startWeekday - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, daysInPrev - i);
      cells.push({ date, inCurrentMonth: false });
    }

    // 2) 이번 달 날짜
    for (let d = 1; d <= daysInCurrent; d++) {
      const date = new Date(year, month, d);
      cells.push({ date, inCurrentMonth: true });
    }

    // 3) 뒤쪽: 다음 달 날짜
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
    return weeksArr;
  }, [year, month]);

  const goPrevMonth = () => setCurrent(new Date(year, month - 1, 1));
  const goNextMonth = () => setCurrent(new Date(year, month + 1, 1));

  const isSameDate = (a, b) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  return (
    <div className="w-full rounded-[32px] bg-white shadow-md p-10">
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

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 text-center gap-y-7 text-base">
        {weeks.map((week, i) =>
          week.map(({ date, inCurrentMonth }, j) => {
            const isToday = inCurrentMonth && isSameDate(date, today);
            const isSunday = j === 0;
            const isSaturday = j === 6;

            let textColor = "text-gray-700";
            if (!inCurrentMonth) textColor = "text-gray-300";
            else if (isSunday) textColor = "text-red-500";
            else if (isSaturday) textColor = "text-blue-500";

            return (
              <div key={`${i}-${j}`} className="flex justify-center">
                <div
                  className={`w-9 h-9 flex items-center justify-center rounded-full ${
                    isToday ? "bg-blue-500 text-white" : textColor
                  }`}
                >
                  {date.getDate()}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MainCalendar;
