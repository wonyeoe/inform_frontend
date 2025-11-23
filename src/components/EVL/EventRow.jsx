import React from "react";

const EventRow = ({ id, status, title, date, onClick }) => {
  const getBadgeColor = (status) => {
    if (status === "진행중") return "text-blue-500 border-blue-300 bg-blue-50";
    if (status === "마감") return "text-gray-500 border-gray-300 bg-gray-50";
    if (status === "예정") return "text-green-500 border-green-300 bg-green-50";
    return "text-red-500 border-red-300";
  };

  return (
    <div 
      className="w-full cursor-pointer hover:bg-gray-50 transition-colors" 
      onClick={onClick}
    >
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <span className={`shrink-0 px-2.5 py-1 text-xs font-medium border rounded-full ${getBadgeColor(status)}`}>
            {status}
          </span>
          <span className="text-gray-800 text-sm">
            {title}
          </span>
        </div>
        <span className="text-gray-500 text-sm">{date}</span>
      </div>
      <div className="border-b border-gray-200" />
    </div>
  );
};

export default EventRow;
