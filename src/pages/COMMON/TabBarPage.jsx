import React from "react";
import COM3TabBar from "../../components/common/TabBar";

const TabBarPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 위에 파란 헤더는 제거하고 기존 헤더 사용 / 탭바가 하얘서 구별되도록 넣어둠*/}
      <header className="h-16 bg-blue-500 flex items-center px-8">
        <span className="text-white text-lg font-semibold">In:Form</span>
      </header>

      <COM3TabBar />

      <main className="p-8">
        <p className="text-gray-600 text-sm">
          COM3 탭바 모듈 데모 페이지. 실제 서비스에선 
          원하는 페이지 상단에 &lt;TabBarPage /&gt;를 배치해서 사용
        </p>
      </main>
    </div>
  );
};

export default TabBarPage;
