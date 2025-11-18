import { useMemo } from "react";
import CalendarCell from "./CalendarCell";
import EventBar from "./EventBar";
import {
  formatDateKey,
  isSameDate,
  parseDate,
  isDateBefore,
  isDateAfter,
  isDateAfterOrEqual,
  isDateBeforeOrEqual,
} from "../../utils/dateUtil";

const WeekRow = ({ week, eventsByDate, today, onDateClick }) => {
  const eventBars = useMemo(
    () => calcEventBarsForWeek(week, eventsByDate),
    [week, eventsByDate]
  );

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

          return (
            <CalendarCell
              key={j}
              date={date}
              inCurrentMonth={inCurrentMonth}
              isToday={isToday}
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

function calcEventBarsForWeek(week, eventsByDate) {
  const uniqueEvents = collectUniqueEvents(week, eventsByDate); // 중복 제거된 이벤트 수집
  const bars = buildBars(week, uniqueEvents); // 이벤트 바 생성
  assignRows(bars); //행 할당
  return bars;
}

function collectUniqueEvents(week, eventsByDate) {
  // 중복 제거된 이벤트 수집
  const uniqueEvents = new Map();

  week.forEach((cellData) => {
    if (!cellData) return;

    const dateKey = formatDateKey(cellData.date);
    const dayEvents = eventsByDate[dateKey] || [];

    dayEvents.forEach((event) => {
      if (!uniqueEvents.has(event.article_id)) {
        uniqueEvents.set(event.article_id, event);
      }
    });
  });

  return Array.from(uniqueEvents.values());
}

function buildBars(week, events) {
  // 이벤트 바 생성
  const bars = [];
  const weekStart = week[0].date; // 주의 시작 날짜 {2025-11-02}
  const weekEnd = week[6].date; // 주의 끝 날짜 {2025-11-08}

  events.forEach((event) => {
    const eventStart = parseDate(event.start_at); //Date 객체
    const eventEnd = parseDate(event.end_at); //Date 객체
    if (!eventStart || !eventEnd) return;

    if (isDateBefore(eventEnd, weekStart) || isDateAfter(eventStart, weekEnd)) {
      // 주 밖 이벤트
      return;
    }

    let startCol = 0;
    if (
      isDateAfterOrEqual(eventStart, weekStart) &&
      isDateBeforeOrEqual(eventStart, weekEnd)
    ) {
      startCol = eventStart.getDay();
    }

    let endCol = 6;
    if (
      isDateAfterOrEqual(eventEnd, weekStart) &&
      isDateBeforeOrEqual(eventEnd, weekEnd)
    ) {
      endCol = eventEnd.getDay();
    }

    const span = endCol - startCol + 1;
    if (span > 0) {
      bars.push({ event, startCol, span });
    }
  });

  return bars;
}

function assignRows(bars) {
  bars.forEach((bar, index) => {
    //index는 0부터 시작해서 반복 할 때 마다 1씩 증가
    let row = 0;
    const barEnd = bar.startCol + bar.span - 1; //barEnd : 이 주에서 마지막으로 차지하는 칸 번호

    for (let i = 0; i < index; i++) {
      const prevBar = bars[i];
      const prevBarEnd = prevBar.startCol + prevBar.span - 1;

      const overlaps = // 겹치는지 확인
        (bar.startCol >= prevBar.startCol && bar.startCol <= prevBarEnd) ||
        (prevBar.startCol >= bar.startCol && prevBar.startCol <= barEnd);

      if (overlaps && prevBar.row === row) {
        //둘이 가로가 겹치는데 row도 같다(같은 행이면)
        row++; // 아래 줄로 내려주자
      }
    }
    bar.row = row; //겹치는 행이 없는 경우 최종 행 할당
  });
}
