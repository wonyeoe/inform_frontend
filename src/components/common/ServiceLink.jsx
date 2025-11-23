const ServiceLink = ({
  icon, // 아이콘
  label, // 아이콘 대신 텍스트로 표시
  size = 42, // 원 크기
  bgColor = "bg-white", // 원 배경색
  textColor = "text-gray-700", // label 글자색
  href, // 외부링크 (필수)
  content, // 설명 텍스트
}) => {
  const handleClick = () => {
    if (href) {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-2 cursor-pointer"
    >
      <div
        className={`
        rounded-full flex items-center justify-center
        cursor-pointer hover:opacity-80 transition
        ${bgColor}
      `}
        style={{ width: size, height: size }}
      >
        {icon ? (
          icon
        ) : (
          <span className={`text-sm font-medium ${textColor}`}>{label}</span>
        )}
      </div>
      <div className="text-sm">{content}</div>
    </div>
  );
};

export default ServiceLink;
