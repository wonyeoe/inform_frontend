import { CATEGORY_COLORS } from "../../constants/tagColors";

const DaySelectEvent = ({ event, isMini = false }) => {
  let category;
  let categoryColor;

  switch (event.category_name) {
    case "LECTURE":
      category = "특강";
      categoryColor = CATEGORY_COLORS.LECTURE;
      break;
    case "CLUB":
      category = "동아리";
      categoryColor = CATEGORY_COLORS.CLUB;
      break;
    case "COMPETITION":
      category = "대회";
      categoryColor = CATEGORY_COLORS.COMPETITION;
      break;
    case "CONTEST":
      category = "공모전";
      categoryColor = CATEGORY_COLORS.CONTEST;
      break;
    default:
      category = "기타";
      categoryColor = CATEGORY_COLORS.DEFAULT;
  }
  if (isMini) {
    return (
      <div className="flex items-center gap-3 p-2 mb-2 bg-white border border-gray-100 rounded-2xl shadow-xs">
        {/* 카테고리 원형 배지 */}
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center  ${categoryColor}`}
        ></div>

        {/* 이벤트 제목 */}
        <div className="text-[10px] font-normal text-gray-800 truncate ">
          {event.title}
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex items-center gap-3 p-4 border-b border-gray-300">
        {/* 카테고리 태그 */}
        <div
          className={`w-20 h-8 flex items-center justify-center rounded-md text-sm font-semibold ${categoryColor}`}
        >
          {category}
        </div>

        {/* 이벤트 제목 */}
        <div className="text-base font-medium">{event.title}</div>
      </div>
    );
  }
};

export default DaySelectEvent;
