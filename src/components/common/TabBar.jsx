import { NavLink } from "react-router-dom";

const TabBar = () => {
  const tabs = [
    { id: "home", label: "홈", to: "/" },
    { id: "board", label: "이벤트", to: "/events" },
    { id: "club", label: "동아리", to: "/clubs" },
  ];

  return (
    <div>
      <nav className="w-full pt-6 max-w-6xl mx-auto px-4">
        <div className="flex justify-items-start">
          <div className="flex gap-20">
            {tabs.map((tab) => {
              // 탭 라벨 길이에 따라 밑줄 너비 결정
              const underlineWidth = tab.label.length === 3 ? "w-16" : "w-8";

              return (
                <NavLink key={tab.id} to={tab.to}>
                  {(
                    { isActive } // isActive가 true(현재 페이지)인지 false(다른 페이지)인지 확인
                  ) => (
                    <div className="flex flex-col items-center pt-2 pb-0">
                      <span
                        className={`text-xl font-semibold ${
                          isActive ? "text-gray-900" : "text-gray-400" // 현재 탭이면 짙은 회색
                        }`}
                      >
                        {tab.label}
                      </span>
                      <span
                        className={`mt-1 h-0.5 ${underlineWidth} rounded-full transition duration-300 ${
                          isActive ? "bg-gray-400" : "bg-transparent" // 현재 탭이면 연하게 밑줄
                        }`}
                      />
                    </div>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default TabBar;
