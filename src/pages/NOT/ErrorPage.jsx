import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-bold mb-4">404</h1>
        <p className="text-gray-400 mb-8">문제가 발생했습니다.</p>
        <button
          onClick={() => navigate("/")}
          className="px-8 py-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transform hover:scale-105 transition-transform duration-200"
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
