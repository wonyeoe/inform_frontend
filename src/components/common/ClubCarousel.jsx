import React, { useState, useEffect, useMemo } from "react";
import mockData from "../../mocks/CBL/ClubRowMock.json";

const ClubCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const randomImages = useMemo(() => {
    // attachment_url이 있는 것만
    const validImages = mockData.club_articles
      .map((article) => article.attachment_url)
      .filter((url) => url !== null && url !== "");

    // 랜덤하게 섞기
    for (let i = validImages.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [validImages[i], validImages[j]] = [validImages[j], validImages[i]];
    }

    // 5개 정도 추려서 보여주기
    return validImages.slice(0, 5);
  }, []); 

  // 타이머 설정
  useEffect(() => {
    if (randomImages.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === randomImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); 

    return () => clearInterval(timer);
  }, [randomImages.length]);

  if (randomImages.length === 0) {
    return (
      <div className="p-4 rounded-3xl bg-white shadow-md flex flex-col items-center">
        <div className="text-lg font-bold text-gray-800 mb-2">동아리 소식</div>
        <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-400 rounded-lg">
          등록된 포스터 없음
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 w-full rounded-3xl bg-white shadow-md flex flex-col items-center">
      <div className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-2">
        📢 동아리 소식
      </div>

      <div className="w-full aspect-[4/5] bg-gray-100 rounded-lg overflow-hidden relative">
        <img
          src={randomImages[currentIndex]}
          alt="동아리 홍보 포스터"
          className="w-full h-full object-cover transition-opacity duration-500"
        />
        
        {/* 하단 점 */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
          {randomImages.map((_, idx) => (
            <div
              key={idx}
              className={`w-1.5 h-1.5 rounded-full ${
                idx === currentIndex ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClubCarousel;