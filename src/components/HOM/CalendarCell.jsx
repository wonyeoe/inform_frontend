const CalendarCell = ({
  date,
  inCurrentMonth,
  isToday,
  isSunday,
  isSaturday,
  events = [],
}) => {
  // 텍스트 색상 결정
  let textColor = "text-gray-700";
  if (!inCurrentMonth) textColor = "text-gray-300";
  else if (isSunday) textColor = "text-red-500";
  else if (isSaturday) textColor = "text-blue-500";

  return (
    <div className="flex justify-center pt-2">
      <div // 날이 오늘 일 때의 디자인
        className={`w-9 h-9 flex flex-col items-center justify-center rounded-full ${
          isToday ? "bg-blue-500 text-white" : textColor
        }`}
      >
        {/* 날짜 숫자 */}
        <span className="text-base">{date.getDate()}</span>
      </div>
    </div>
  );
};

export default CalendarCell;
