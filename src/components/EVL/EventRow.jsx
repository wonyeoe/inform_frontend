import React from "react";

const EventRow = ({ status, title, date }) => {
  const getBadgeColor = (status) => {
    if (status === "진행중") return "text-blue-500 border-blue-300 bg-blue-50";
    if (status === "마감") return "text-gray-500 border-gray-300 bg-gray-50";
    if (status === "예정") return "text-green-500 border-green-300 bg-green-50";
    return "text-red-500 border-red-300";
  };

  return (
    <div className="w-full">
      {/* 한 줄 */}
      <div className="flex items-center justify-between py-3">
        
        {/* 왼쪽: 상태 + 제목 */}
        <div className="flex items-center gap-3">

          {/* 상태 배지 */}
          <span className={`shrink-0 px-2.5 py-1 text-xs font-medium border rounded-full ${getBadgeColor(status)}`}>
            {status}
          </span>

          {/* 제목 */}
          <span className="text-gray-800 text-sm">
            {title}
          </span>
        </div>

        {/* 오른쪽: 시간 */}
        <span className="text-gray-500 text-sm">{date}</span>
      </div>

      {/* 구분선 */}
      <div className="border-b border-gray-200" />
    </div>
  );
};

export default EventRow;
