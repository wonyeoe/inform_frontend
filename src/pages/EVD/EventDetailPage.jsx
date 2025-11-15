import EventDetail from "../../components/EVD/EventDetail";

const EventDetailPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center p-8">
      <EventDetail
        title="제5회 TEXTOM 빅데이터 분석 공모전"
        source="산학협력단 공지사항"
        date="2022-08-01"
        content={`빅데이터 솔루션 TEXTOM 분석툴을 활용한 다양한 자유 주제에 대한 분석 공모전입니다.

- 참가 대상: 대학(원)생, 일반인
- 접수 기간: 2022.08.01 ~ 2022.11.30
- 시상 내역: 대상, 최우수상, 우수상 등`}
        linkUrl="https://example.com/event/123"
      />
    </div>
  );
};

export default EventDetailPage;