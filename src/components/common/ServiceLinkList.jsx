import ServiceLink from "./ServiceLink";

const ServiceLinkList = () => {
  //8개 정도릐 링크 배치
  const Links = [
    {
      label: "Inha", // 인하대학교 홈페이지
      content: "인하대학교 홈페이지",
      href: "https://www.inha.ac.kr/",
    },
    {
      label: "Sugang", //수강 신청 홈페이지
      content: "수강 신청 홈페이지",
      href: "https://sugang.inha.ac.kr/sugang/",
    },
    {
      label: "Library", // 도서관 홈페이지
      content: "도서관 홈페이지",
      href: "https://lib.inha.ac.kr/",
    },
    {
      label: "Iclass", // 아이클래스 홈페이지
      content: "아이클래스 홈페이지",
      href: "https://learn.inha.ac.kr/",
    },
  ]; // 여기에 링크 데이터 추가 가능

  return (
    <div className="flex flex-col flex-wrap gap-4  bg-white shadow-md p-6 max-w-80 rounded-3xl">
      <div className="text-center font-semibold">주요 SSO</div>
      {Links.map((link, index) => (
        <ServiceLink
          key={index}
          label={link.label}
          href={link.href}
          content={link.content}
        />
      ))}
    </div>
  );
};
export default ServiceLinkList;
