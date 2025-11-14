import React from "react";

const EventRow = ({ status, title, time }) => {
  return (
    <div className="w-full">
      {/* 한 줄 */}
      <div className="flex items-center justify-between py-3">
        
        {/* 왼쪽: 상태 + 제목 */}
        <div className="flex items-center gap-3">

          {/* 상태 배지 */}
          <span className="px-3 py-[2px] text-sm border rounded-full text-red-500 border-red-300">
            {status}
          </span>

          {/* 제목 */}
          <span className="text-gray-800 text-sm">
            {title}
          </span>
        </div>

        {/* 오른쪽: 시간 */}
        <span className="text-gray-500 text-sm">{time}</span>
      </div>

      {/* 구분선 */}
      <div className="border-b border-gray-200" />
    </div>
  );
};

export default EventRow;
