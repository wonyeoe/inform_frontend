import ServiceLink from "./ServiceLink";

import chatGPT from "../../assets/SSO/chatGPT.png";
import DBpia from "../../assets/SSO/DBpia.png";
import everytime from "../../assets/SSO/everytime.png";
import iclass from "../../assets/SSO/iclass.png";
import Inha from "../../assets/SSO/Inha.png";
import Lib from "../../assets/SSO/Lib.png";
import portal from "../../assets/SSO/portal.png";

const ServiceLinkList = () => {
  const Links = [
    {
      label: "Inha",
      content: "인하대학교 홈페이지",
      href: "https://www.inha.ac.kr/",
      icon: <img src={Inha} alt="Inha" className="w-11 h-11" />,
    },
    {
      label: "Portal",
      content: "인하대학교 포털시스템",
      href: "https://portal.inha.ac.kr/",
      icon: <img src={portal} alt="Portal" className="w-11 h-11" />,
    },
    {
      label: "Library",
      content: "정석학술정보관",
      href: "https://lib.inha.ac.kr/",
      icon: <img src={Lib} alt="Library" className="w-11 h-11" />,
    },
    {
      label: "iClass",
      content: "I-Class",
      href: "https://learn.inha.ac.kr/",
      icon: <img src={iclass} alt="iClass" className="w-11 h-11" />,
    },
    {
      label: "Everytime",
      content: "에브리타임",
      href: "https://everytime.kr/",
      icon: <img src={everytime} alt="Everytime" className="w-11 h-11" />,
    },
    {
      label: "DBpia",
      content: "DBpia",
      href: "https://www.dbpia.co.kr/",
      icon: <img src={DBpia} alt="DBpia" className="w-11 h-11" />,
    },
    {
      label: "ChatGPT",
      content: "ChatGPT",
      href: "https://chat.openai.com/",
      icon: <img src={chatGPT} alt="ChatGPT" className="w-11 h-11" />,
    },
  ];

  return (
    <div className="flex flex-col flex-wrap gap-4 bg-white shadow-md p-6 max-w-80 rounded-3xl">
      <div className="text-center font-semibold">🌐 주요 서비스</div>
      {Links.map((link, index) => (
        <ServiceLink
          key={index}
          icon={link.icon}
          label={link.label}
          href={link.href}
          content={link.content}
        />
      ))}
    </div>
  );
};

export default ServiceLinkList;
