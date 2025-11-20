import React from "react";

const EventDetail = ({ title, vendor, startDate, dueDate, created_at, content, linkUrl }) => {
  const getStatus = () => {
    const today = new Date(); 
    const start = new Date(startDate);
    const end = new Date(dueDate);

    today.setHours(0,0,0,0); 
    start.setHours(0,0,0,0); 
    end.setHours(23,59,59,999);

    if (today < start) return { text: "예정", color: "text-green-600 bg-green-50 border-green-200" };
    if (today > end) return { text: "마감", color: "text-gray-500 bg-gray-100 border-gray-200" };
    return { text: "진행중", color: "text-blue-600 bg-blue-50 border-blue-200" };
  };
  const status = getStatus();

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <span className={`px-3 py-1 text-xs font-bold border rounded-full ${status.color}`}>{status.text}</span>
        </div>
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight mb-6">{title}</h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-gray-600 bg-gray-50 p-4 rounded-xl">
          <div className="flex items-center gap-2"><span className="font-semibold text-gray-800">주관:</span><span>{vendor}</span></div>
          <div className="hidden sm:block w-px h-3 bg-gray-300" />
          <div className="flex items-center gap-2"><span className="font-semibold text-gray-800">게시일자:</span><span>{created_at}</span></div>
        </div>
      </div>
      <div className="p-6 md:p-8 min-h-[200px]">
        <div className="prose text-gray-800 whitespace-pre-line leading-relaxed">{content}</div>
      </div>
      {linkUrl && (
        <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-center">
          <a href={linkUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-lg text-white bg-blue-600 hover:bg-blue-700 shadow-sm text-sm font-bold transition-colors">
            원문 공지 보러가기 →
          </a>
        </div>
      )}
    </div>
  );
};

export default EventDetail;
