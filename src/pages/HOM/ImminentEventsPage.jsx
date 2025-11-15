import ImminentEvents from "../../components/HOM/ImminentEvents";

const ImminentEventsPage = () => {
  const sampleEvents = [
    {
      title: "2025년 학부연구생 지원 안내",
      source: "산학협력단 공지사항",
    },
    {
      title: "2025 제4회 AI·데이터 분석 경진대회",
      source: "컴퓨터공학부 게시판",
    },
    {
      title: "취업박람회 사전 접수 안내",
      source: "대학일자리플러스센터",
    },
  ];

  return (
    <div className="p-8 flex justify-center">
      <ImminentEvents events={sampleEvents} />
    </div>
  );
};

export default ImminentEventsPage;
