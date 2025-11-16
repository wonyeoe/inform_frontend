// 카테고리별 색상 매핑
const EVENT_COLORS = {
  CLUB: "bg-red-400", //동아리
  COMPETITION: "bg-green-400", //대회
  CONTEST: "bg-purple-400", //공모전
  LECTURE: "bg-blue-400", // 특강
  default: "bg-gray-300",
};

// 이벤트 카테고리에 따른 색상 반환
const getEventColor = (event) => {
  const categoryName = event?.categories?.category_name;
  return EVENT_COLORS[categoryName] || EVENT_COLORS.default;
};

/**
 * EventBar - 이벤트를 나타내는 가로 바
 * @param {Object} event - 이벤트 데이터
 * @param {number} startCol - 시작 컬럼 (0-6, 일요일=0)
 * @param {number} span - 차지하는 컬럼 수
 * @param {number} row - 세로 위치 (같은 날 여러 이벤트가 있을 때 층)(0~n)
 */
const EventBar = ({ event, startCol, span, row }) => {
  const bgColor = getEventColor(event);
  return (
    <div
      className={`${bgColor} text-white text-xs px-2 py-1 rounded truncate`}
      style={{
        gridColumn: `${startCol + 1} / span ${span}`, // CSS Grid column 위치
        gridRow: row + 1, // CSS Grid row 위치 (1-based)
      }}
    >
      {event.title}
    </div>
  );
};

export default EventBar;
