import React from "react";

const ImminentEvents = ({ events = [] }) => {
  return (
    <div className="w-full bg-white rounded-3xl shadow-md p-8 min-h-[300px]">
      {/* 제목 */}
      <h2 className="text-xl font-semibold text-gray-800 text-center mb-6">
        마감임박
      </h2>

      {/* 이벤트 목록 */}
      <div className="space-y-5">
        {events.length === 0 && (
          <div className="text-gray-400 text-center">마감 임박 행사가 없습니다</div>
        )}

        {events.map((ev, idx) => (
          <div key={idx} className="pb-4 border-b border-gray-200">
            <p className="text-gray-900 font-medium text-sm mb-1">
              {ev.title}
            </p>
            <p className="text-gray-500 text-xs">{ev.source}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImminentEvents;
