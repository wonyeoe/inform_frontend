import React, { useMemo, useState } from "react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MiniCalendar = () => {
  const [current, setCurrent] = useState(new Date()); // current: 지금 보고 있는 달의 날짜 정보

  const today = useMemo(() => new Date(), []); // 실제 오늘 날짜 (나중에 isToday 체크할 때 사용)

  const year = current.getFullYear(); // 연도
  const month = current.getMonth(); // 월

  // 이번 달 정보 로직 (6x7 칸)
  const { weeks } = useMemo(() => {
    const firstDay = new Date(year, month, 1); // 달의 첫 날
    const startWeekday = firstDay.getDay(); // 0(일) ~ 6(토) 의미
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // 이번 달 날짜 수

    const cells = [];

    // 앞쪽 빈 칸 채우기 
    for (let i = 0; i < startWeekday; i++) {
      cells.push(null);
    }

    // 이번 달 날짜 (1일 ~ 마지막 날) 채우기
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push(new Date(year, month, d));
    }

    // 6주(6x7=42칸) 채우도록 뒤쪽 빈칸 채우기
    while (cells.length < 42) {
      cells.push(null);
    }

    // 7개씩 끊어서 주 단위로 만들기 
    const weeksArr = [];
    for (let i = 0; i < cells.length; i += 7) {
      weeksArr.push(cells.slice(i, 7 + i));
    }

    return { weeks: weeksArr };
  }, [year, month]);

  // 월 이동 버튼
  const goPrevMonth = () => {
    setCurrent(new Date(year, month - 1, 1));
  };
  const goNextMonth = () => {
    setCurrent(new Date(year, month + 1, 1));
  };

  // 오늘 날짜 표시와 색상 처리
  const isSameDate = (a, b) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  return (
    <div className="w-full max-w-sm rounded-3xl bg-white shadow-md p-6">
      {/* 상단: 월 이동 + 라벨 */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={goPrevMonth}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <IoChevronBackOutline className="text-gray-500" />
        </button>

        <div className="text-base font-semibold text-gray-800">
          {year}년 {month + 1}월
        </div>

        <button
          type="button"
          onClick={goNextMonth}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <IoChevronForwardOutline className="text-gray-500" />
        </button>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 text-center text-xs mb-2">
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
      <div className="grid grid-cols-7 text-center gap-y-2 text-sm">
        {weeks.map((week, i) =>
          week.map((date, j) => {
            if (!date) {
              return <div key={`${i}-${j}`} />;
            }

            const isToday = isSameDate(date, today);
            const isSunday = j === 0;
            const isSaturday = j === 6;

            let textColor = "text-gray-700";
            if (isSunday) textColor = "text-red-500";
            if (isSaturday) textColor = "text-blue-500";

            return (
              <div key={`${i}-${j}`} className="flex justify-center">
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full ${
                    isToday ? "bg-blue-500 text-white" : ""
                  } ${!isToday ? textColor : ""}`}
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

export default MiniCalendar;
