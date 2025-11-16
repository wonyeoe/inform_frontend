import React from "react";

const EventDetail = ({ title, source, date, content, linkUrl }) => {
  return (
    <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-8">
      {/* 제목 */}
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h1>

      {/* 공지 출처 / 날짜 */}
      <div className="text-sm text-gray-500 mb-4">
        {source} · {date}
      </div>

      {/* 얇은 선 */}
      <div className="border-b border-gray-200 mb-6" />

      {/* 행사 내용 */}
      <div className="text-sm leading-relaxed text-gray-800 whitespace-pre-line mb-8">
        {content}
      </div>

      {/* 원문 링크 */}
      {linkUrl && (
        <div className="text-sm">
          <a
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            실제 공지 페이지 바로가기
          </a>
        </div>
      )}
    </div>
  );
};

export default EventDetail;
