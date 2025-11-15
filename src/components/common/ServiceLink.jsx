import React from "react";

const ServiceLink = ({
  icon, // 아이콘
  label, // 아이콘 대신 텍스트로 표시
  size = 56,   // 원 크기
  bgColor = "bg-gray-200", // 원 배경색
  textColor = "text-gray-700", // label 글자색
  href, // 외부링크
  onClick, // 클릭 이벤트
}) => {
  const content = (
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
  );

  // 링크(다른 사이트)로 이동하는 경우
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  // 클릭으로 이동 (서비스 내부 페이지 이동)
  return <div onClick={onClick}>{content}</div>;
};

export default ServiceLink;
