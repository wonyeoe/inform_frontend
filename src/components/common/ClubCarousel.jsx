import { useState, useEffect } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import api from "../../api/axios";

const ClubCarousel = () => {
  const [images, setImages] = useState([]); // 포스터 URL 목록
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // API 호출
  useEffect(() => {
    const fetchClubPosters = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await api.get("api/v1/club_articles/random");

        console.log("club carousel data:", res.data);

        const articles = res.data.club_articles || res.data || [];

        const posters = articles
          .map((article) => article.attachment_url)
          .filter((url) => url && url.trim() !== "");

        setImages(posters);
        setCurrentIndex(0);
      } catch (err) {
        console.error("동아리 포스터 불러오기 실패:", err);
        setError("동아리 포스터를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchClubPosters();
  }, []);

  // 타이머
  useEffect(() => {
    if (images.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [images.length, currentIndex]);

  // 이전/다음 버튼 핸들러
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // 로딩/에러/데이터없음 처리
  if (loading) {
    return (
      <div className="p-4 rounded-3xl bg-white shadow-md flex flex-col items-center">
        <div className="text-lg font-bold text-gray-800 mb-2">동아리 소식</div>
        <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-400 rounded-lg">
          불러오는 중...
        </div>
      </div>
    );
  }

  if (error || images.length === 0) {
    return (
      <div className="p-4 rounded-3xl bg-white shadow-md flex flex-col items-center">
        <div className="text-lg font-bold text-gray-800 mb-2">동아리 소식</div>
        <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-400 rounded-lg">
          {error || "등록된 포스터 없음"}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 w-full rounded-3xl bg-white shadow-md flex flex-col items-center">
      <div className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-2">
        📢 동아리 소식
      </div>

      <div className="w-full aspect-[4/5] bg-gray-100 rounded-lg overflow-hidden relative group">
        <img
          src={images[currentIndex]}
          alt="동아리 포스터"
          className="w-full h-full object-cover transition-opacity duration-500"
        />

        {/* 좌측 버튼 */}
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-gray/60 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-label="이전 이미지"
        >
          <IoChevronBack size={20} />
        </button>

        {/* 우측 버튼 */}
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-gray/60 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-label="다음 이미지"
        >
          <IoChevronForward size={20} />
        </button>

        {/* 하단 점 */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
          {images.map((_, idx) => (
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
