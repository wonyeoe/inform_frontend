import { useNavigate } from "react-router-dom";

/*
    Header - 상단 헤더 모듈
    로고 클릭 시 홈으로 이동
*/

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="h-16 bg-blue-500 flex items-center justify-between px-6 shadow-md">
      <button
        onClick={() => navigate("/")}
        className="text-white text-xl font-bold hover:text-blue-100 transition-colors"
      >
        In:Form
      </button>
    </header>
  );
};

export default Header;
