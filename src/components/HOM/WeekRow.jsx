import { useMemo } from "react";
import CalendarCell from "./CalendarCell";
import EventBar from "./EventBar";
import { formatDateKey, isSameDate, parseDate } from "../../utils/dateUtil";

/**
 * WeekRow - 한 주(7일)의 날짜와 이벤트 바들을 렌더링
 * @param {Array} week - 7개의 날짜 객체 배열 [{date, inCurrentMonth}, ...]
 * @param {Object} eventsByDate - 날짜별 이벤트 맵
 * @param {Date} today - 오늘 날짜
 * @param {Function} onDateClick - 날짜 클릭 핸들러
 */
const WeekRow = ({ week, eventsByDate, today, onDateClick }) => {
  // 이 주에 걸치는 이벤트들을 분석하고 배치 정보 계산
  const eventBars = useMemo(() => {
    const bars = [];
    const processedEvents = new Set(); // 이미 처리한 이벤트 추적

    week.forEach((cellData, colIndex) => {
      if (!cellData) return;

      const { date } = cellData;
      const dateKey = formatDateKey(date);
      const dayEvents = eventsByDate[dateKey] || []; //

      dayEvents.forEach((event) => {
        const eventId = `${event.title}-${event.start_at}`;

        // 이미 처리한 이벤트는 건너뛰기 (이번 주에서 이미 시작된 이벤트)
        if (processedEvents.has(eventId)) return;
        processedEvents.add(eventId);

        // 이벤트의 실제 시작/종료 날짜
        const eventStart = parseDate(event.start_at);
        const eventEnd = parseDate(event.end_at);

        // 이번 주의 첫날과 마지막날
        const weekStart = week[0].date;
        const weekEnd = week[6].date;

        // 이번 주에서 이벤트가 차지하는 시작/끝 컬럼 계산
        let startCol = 0;
        let endCol = 6;

        // 이벤트 시작일이 이번 주 안에 있으면 해당 요일부터
        if (eventStart >= weekStart && eventStart <= weekEnd) {
          startCol = colIndex;
        }

        // 이벤트 종료일이 이번 주 안에 있으면 해당 요일까지
        for (let i = 0; i < 7; i++) {
          if (week[i] && isSameDate(week[i].date, eventEnd)) {
            endCol = i;
            break;
          }
          if (week[i] && week[i].date > eventEnd) {
            endCol = i - 1;
            break;
          }
        }

        const span = endCol - startCol + 1;

        bars.push({
          event,
          startCol,
          span,
          eventId,
        });
      });
    });

    // Row 할당 (겹치는 이벤트 처리)
    bars.forEach((bar, index) => {
      let row = 0;
      const barEnd = bar.startCol + bar.span - 1;

      // 이전 바들과 겹치는지 확인
      for (let i = 0; i < index; i++) {
        const prevBar = bars[i];
        const prevBarEnd = prevBar.startCol + prevBar.span - 1;

        // 겹치는지 확인
        const overlaps =
          (bar.startCol >= prevBar.startCol && bar.startCol <= prevBarEnd) ||
          (prevBar.startCol >= bar.startCol && prevBar.startCol <= barEnd);

        if (overlaps && prevBar.row === row) {
          row++; // 겹치면 다음 row로
        }
      }

      bar.row = row;
    });

    return bars;
  }, [week, eventsByDate]);

  // 필요한 총 row 수 계산
  const maxRow =
    eventBars.length > 0 ? Math.max(...eventBars.map((b) => b.row)) : -1;

  return (
    <div className="mb-2">
      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 text-center text-base">
        {week.map((cellData, j) => {
          if (!cellData) return <div key={j} />;

          const { date, inCurrentMonth } = cellData;
          const isToday = inCurrentMonth && isSameDate(date, today);
          const isSunday = j === 0;
          const isSaturday = j === 6;

          return (
            <CalendarCell
              key={j}
              date={date}
              inCurrentMonth={inCurrentMonth}
              isToday={isToday}
              isSunday={isSunday}
              isSaturday={isSaturday}
              onClick={onDateClick}
            />
          );
        })}
      </div>

      {/* 이벤트 바들 */}
      {eventBars.length > 0 && (
        <div
          className="grid grid-cols-7 gap-x-0 gap-y-1 mt-1 px-1"
          style={{
            gridTemplateRows: `repeat(${maxRow + 1}, minmax(1.5rem, auto))`,
          }}
        >
          {eventBars.map((bar, idx) => (
            <EventBar
              key={idx}
              event={bar.event}
              startCol={bar.startCol}
              span={bar.span}
              row={bar.row}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WeekRow;
