const DaySelectEvent = ({ event }) => {
  let category;
  let categoryColor;

  switch (event.category_name) {
    case "LECTURE":
      category = "특강";
      categoryColor = "bg-blue-500 text-white";
      break;
    case "CLUB":
      category = "동아리";
      categoryColor = "bg-green-500 text-white";
      break;
    case "COMPETITION":
      category = "대회";
      categoryColor = "bg-purple-500 text-white";
      break;
    case "CONTEST":
      category = "공모전";
      categoryColor = "bg-orange-500 text-white";
      break;
    default:
      category = "기타";
      categoryColor = "bg-gray-300 text-black";
  }

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
};

export default DaySelectEvent;
