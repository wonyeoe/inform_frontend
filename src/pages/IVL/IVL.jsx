import { useState } from "react";

function IVL() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [activeFilter, setActiveFilter] = useState("전체");

  // 2025년 6월 달력 데이터
  const daysInMonth = 30;
  const firstDayOfWeek = 0; // 일요일부터 시작
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfWeek }, (_, i) => i);

  // 더미 이벤트 데이터
  const events = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    title:
      "2026학년도 성남지 재정여력제 일학습병행(IPP) 참단심앙 아카데미 학생모집 안내",
    time: "20:00",
    tag: i % 3 === 0 ? "대외" : i % 3 === 1 ? "행사" : null,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-indigo-600 text-white p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">In:Form</h1>
          <div className="w-12 h-12 bg-indigo-400 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </header>

      {/* 네비게이션 */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8 py-4">
            <button className="text-gray-600 hover:text-gray-900">홈</button>
            <button className="text-gray-900 font-semibold border-b-2 border-indigo-600 pb-1">
              이벤트
            </button>
            <button className="text-gray-600 hover:text-gray-900">
              동아리
            </button>
          </div>
        </div>
      </nav>

      {/* 메인 컨텐츠 */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 왼쪽: 달력 */}
          <div className="lg:col-span-1 space-y-6">
            {/* 이벤트 달력 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold mb-4">이벤트</h2>
              <div className="mb-4">
                <div className="text-center font-semibold mb-2">2025년 6월</div>
                <div className="grid grid-cols-7 gap-1 text-center text-sm">
                  <div className="text-red-500">Sun</div>
                  <div>Mon</div>
                  <div>Thu</div>
                  <div>Wed</div>
                  <div>Thu</div>
                  <div>Fri</div>
                  <div className="text-blue-500">Sat</div>
                </div>
                <div className="grid grid-cols-7 gap-1 mt-2">
                  {emptyDays.map((_, i) => (
                    <div key={`empty-${i}`} className="aspect-square" />
                  ))}
                  {days.map((day) => (
                    <button
                      key={day}
                      onClick={() => setSelectedDate(day)}
                      className={`aspect-square flex items-center justify-center text-sm rounded hover:bg-gray-100 ${
                        selectedDate === day ? "bg-indigo-600 text-white" : ""
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 마감임박 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold">마감임박</h2>
            </div>
          </div>

          {/* 오른쪽: 이벤트 목록 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold mb-4">이벤트/행사 목록</h2>

              {/* 검색창 */}
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="검색..."
                  className="w-full px-4 py-3 bg-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg
                    className="w-5 h-5 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>

              {/* 필터 버튼 */}
              <div className="flex gap-2 mb-4">
                {["전체", "대외", "행사"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 rounded-full text-sm ${
                      activeFilter === filter
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* 이벤트 리스트 */}
              <div className="space-y-2">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="bg-gray-100 p-4 rounded flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2 flex-1">
                      {event.tag && (
                        <span className="px-3 py-1 bg-white text-red-500 text-xs rounded-full border border-red-300">
                          {event.tag}
                        </span>
                      )}
                      <span className="text-sm text-gray-700">
                        {event.title}
                      </span>
                      <span className="text-blue-600 text-xs">[10]</span>
                    </div>
                    <span className="text-sm text-gray-600">{event.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IVL;
