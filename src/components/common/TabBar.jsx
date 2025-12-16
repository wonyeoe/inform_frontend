import React from "react";
import { NavLink } from "react-router-dom";

const TabBar = () => {
  const tabs = [
    { id: "home", label: "홈", to: "/" },
    { id: "board", label: "이벤트", to: "/events" },
    { id: "club", label: "동아리", to: "/clubs" },
  ];

  return (
    <nav className="w-full bg-white shadow-sm">
      {" "}
      <div className="flex justify-center">
        {" "}
        <div className="flex gap-20">
          {" "}
          {tabs.map(
            (
              tab // 탭 렌더링
            ) => (
              <NavLink key={tab.id} to={tab.to}>
                {(
                  { isActive } // isActive가 true(현재 페이지)인지 false(다른 페이지)인지 확인
                ) => (
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
            )
          )}
        </div>
      </div>
    </nav>
  );
};

export default TabBar;
