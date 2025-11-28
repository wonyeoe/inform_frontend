import MockData from "../../mocks/HOM/maincalendarMock.json";
import MiniCalendar from "./MiniCalendar";
import { parseDate, formatDateKey, formatMonthKey } from "../../utils/dateUtil";
import { useState, useMemo } from "react";

const MiniCalendarSet = () => {
  //const navigate = useNavigate();

  const [currentDate, setCurrentDate] = useState(() => {
    // 1. 초기 selectedDate : 오늘 날짜
    const today = new Date();
    return formatDateKey(today);
  });
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const today = new Date();
    return formatMonthKey(today); //'YYYY-MM' 형식
  });

  /** * React Query로 API 데이터 가져오기
  const { data, isLoading, error } = useQuery({
    queryKey: ["monthlyAll", calendarMonth], // calendarMonth가 바뀌면 재요청
    queryFn: () => getMonthlyAll({ calendarMonth }), // 함수로 래핑
  });
  */
  // API 데이터가 로드되면 사용, 아니면 빈 배열
  //const events = data || { articles: [] };
  const events = MockData; // Mock 데이터 사용 시

  // 2. eventsByDate : 일별로 이벤트 매핑
  const eventsByDate = useMemo(() => {
    const eventMap = {};

    events.articles.forEach((article) => {
      const startDate = parseDate(article.start_date);
      const endDate = parseDate(article.due_date);
      if (!startDate || !endDate) return;
      // 필요한 데이터만 추출한 경량 객체 생성
      const SingleEvent = {
        article_id: article.article_id,
        title: article.title,
        category_name: article.categories?.category_name || null,
        start_date: article.start_date,
        due_date: article.due_date,
      };
      // start_at부터 end_at까지 모든 날짜에 이벤트 추가
      const current = new Date(startDate);
      while (current <= endDate) {
        const key = formatDateKey(current); // "2025-11-01" 형식

        if (!eventMap[key]) {
          eventMap[key] = []; // 빈 배열 생성
        }
        eventMap[key].push(SingleEvent); // 경량 객체 추가
        // 다음 날로 이동
        current.setDate(current.getDate() + 1);
      }
    });
    return eventMap;
  }, [events]); // events가 변경될 때만 재계산

  // 날짜 클릭 핸들러 - CalendarCell에서 전달받은 날짜 처리
  const handleDateClick = (date) => {
    const dateKey = formatDateKey(date); // Date 객체 → "2025-11-16"
    setCurrentDate(dateKey);
  };
  // 월 변경 핸들러 - MainCalendar에서 호출
  const handleMonthChange = (monthKey) => {
    // monthKey: "2025-10" 형식
    setCalendarMonth(monthKey);

    // 현재 선택된 날짜도 해당 월의 1일로 변경
    const [yearStr, monthStr] = monthKey.split("-");
    const newDate = new Date(parseInt(yearStr), parseInt(monthStr) - 1, 1);
    setCurrentDate(formatDateKey(newDate));
  };
  /**로딩 상태 처리
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-600">로딩 중...</div>
      </div>
    );
  }

  // 에러 상태 처리
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-600">에러 발생: {error.message}</div>
      </div>
    );
  }
*/
  return (
    <MiniCalendar
      currentMonth={calendarMonth}
      selectedDate={currentDate}
      eventsByDate={eventsByDate}
      onSelectDate={handleDateClick}
      onMonthChange={handleMonthChange}
    />
  );
};

export default MiniCalendarSet;
