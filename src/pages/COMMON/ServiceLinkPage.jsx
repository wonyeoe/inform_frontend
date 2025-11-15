import { IoSchoolOutline, IoPersonCircleOutline } from "react-icons/io5";
import ServiceBadge from "../../components/common/ServiceLink";

const ServiceLinkPage = () => {
  return (
    <div className="p-8 flex flex-col gap-3">
      <ServiceBadge
        icon={<IoSchoolOutline size={28} className="text-gray-600" />}
        href="https://www.inha.ac.kr/kr/index.do"
      />

      <ServiceBadge
        icon={<IoPersonCircleOutline size={30} className="text-gray-600" />}
        href="https://sugang.inha.ac.kr/sugang/"
      />

      <ServiceBadge
        label="LIB"
        href="https://lib.inha.ac.kr/"
      />
    </div>
  );
};

export default ServiceLinkPage;