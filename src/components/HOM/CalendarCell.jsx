const CalendarCell = ({ date, inCurrentMonth, isToday, onClick }) => {
  // 요일 계산 (0: 일요일, 6: 토요일)
  const dayOfWeek = date.getDay();
  const isSunday = dayOfWeek === 0;
  const isSaturday = dayOfWeek === 6;

  // 텍스트 색상 결정
  let textColor = "text-gray-700";
  if (!inCurrentMonth) textColor = "text-gray-300";
  else if (isSunday) textColor = "text-red-500";
  else if (isSaturday) textColor = "text-blue-500";

  // 날짜 클릭 핸들러 - date를 명시적으로 전달
  const handleClick = () => {
    if (onClick) {
      onClick(date); // Date 객체를 전달!
    }
  };

  return (
    <div className="flex justify-center pt-2">
      <div // 날이 오늘 일 때의 디자인
        className={`w-12 h-9 flex flex-col items-center justify-center rounded-2xl
          ${isToday ? "bg-blue-500 text-white" : textColor}
          ${inCurrentMonth ? "cursor-pointer hover:bg-gray-100" : "cursor-default"}
          ${isToday && inCurrentMonth ? "hover:bg-blue-600" : ""}
        `}
        onClick={handleClick}
      >
        <span className="text-base">{date.getDate()}</span>
      </div>
    </div>
  );
};

export default CalendarCell;
