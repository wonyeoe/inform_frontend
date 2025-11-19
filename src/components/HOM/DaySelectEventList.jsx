import DaySelectEvent from "./DaySelectEvent";

const DaySelectEventList = ({ events }) => {
  return (
    <div className="border-1 border-gray-300 rounded-2xl overflow-hidden m-8 p-4 flex flex-col w-full max-w-1/2">
      <div className="font-semibold text-center mb-2 ">선택한 일자의 행사</div>
      {!events || events.length === 0 ? (
        <p className="p-4 text-center text-gray-500">
          선택된 날짜에 이벤트가 없습니다.
        </p>
      ) : (
        <div className="border-t border-gray-300">
          {events.map((event) => (
            <DaySelectEvent key={event.article_id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};
export default DaySelectEventList;
