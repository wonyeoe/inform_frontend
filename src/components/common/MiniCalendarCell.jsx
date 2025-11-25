import React from "react";
import { CATEGORY_COLORS } from "../../constants/tagColors";

// 카테고리별 색상 매핑 (점 표시용 - bg만 추출)
const getCategoryDotColor = (categoryName) => {
  const colorClass = CATEGORY_COLORS[categoryName] || CATEGORY_COLORS.DEFAULT;
  // "bg-blue-500 text-white"에서 bg-blue-500만 추출
  return colorClass.split(" ")[0];
};

const MiniCalendarCell = ({ date, events, isToday, isSunday, isSaturday }) => {
  if (!date) {
    return <div />;
  }

  // 해당 날짜의 이벤트 필터링
  const dayEvents = events.filter((event) => {
    const eventStart = new Date(event.start_date);
    const eventEnd = new Date(event.due_date);

    // 날짜만 비교 (시간 제거)
    eventStart.setHours(0, 0, 0, 0);
    eventEnd.setHours(23, 59, 59, 999);
    date.setHours(0, 0, 0, 0);

    // start_date ~ due_date 범위 내에 있는지 확인
    return date >= eventStart && date <= eventEnd;
  });

  // 최대 4개까지만 표시
  const displayEvents = dayEvents.slice(0, 4);

  // 텍스트 색상 결정
  let textColor = "text-gray-700";
  if (isSunday) textColor = "text-red-500";
  if (isSaturday) textColor = "text-blue-500";

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center gap-1">
        {/* 날짜 숫자 */}
        <div
          className={`w-8 h-8 flex items-center justify-center rounded-full ${
            isToday ? "bg-blue-500 text-white" : ""
          } ${!isToday ? textColor : ""}`}
        >
          {date.getDate()}
        </div>

        {/* 이벤트 점 표시 (2x2 그리드) */}
        {displayEvents.length > 0 && (
          <div className="grid grid-cols-2 gap-0.5">
            {displayEvents.map((event, index) => (
              <span
                key={`${event.article_id}-${index}`}
                className={`w-1.5 h-1.5 rounded-full ${getCategoryDotColor(
                  event.categories?.category_name
                )}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MiniCalendarCell;
