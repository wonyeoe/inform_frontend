import React from "react";
import { NavLink } from "react-router-dom";

/*
    파일이름이 COM3으로 설정이 안됨,, (못 사용하는 이름인듯)

    COM3 - 상단 탭 네비게이션 모듈
    탭: 캘린더(/), 게시판(/events), 동아리(/clubs)
 */

const COM3TabBar = () => {
  const tabs = [
    { id: "calendar", label: "캘린더", to: "/" },
    { id: "board", label: "게시판", to: "/events" },
    { id: "club", label: "동아리", to: "/clubs" },
  ];

  return (
    <nav className="w-full bg-white"> {/* 전체 배경색 */}
      <div className="flex justify-center"> {/* 가운데 정렬 */}
        <div className="flex gap-20"> {/* 탭 간 간격 */}
          {tabs.map((tab) => ( // 탭 렌더링
            <NavLink key={tab.id} to={tab.to}>
              {({ isActive }) => ( // isActive가 true(현재 페이지)인지 false(다른 페이지)인지 확인
                <div className="flex flex-col items-center pt-4 pb-3">
                  <span
                    className={`text-sm md:text-base font-medium ${
                      isActive ? "text-gray-900" : "text-gray-400" // 현재 탭이면 짙은 회색
                    }`}
                  >
                    {tab.label}
                  </span>
                  <span
                    className={`mt-2 h-0.5 w-8 rounded-full transition-all ${
                      isActive ? "bg-gray-400" : "bg-transparent" // 현재 탭이면 연하게 밑줄
                    }`}
                  />
                </div>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default COM3TabBar;