import { useState, useEffect } from "react";
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
  }, [images.length]);

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

      <div className="w-full aspect-[4/5] bg-gray-100 rounded-lg overflow-hidden relative">
        <img
          src={images[currentIndex]}
          alt="동아리 포스터"
          className="w-full h-full object-cover transition-opacity duration-500"
        />

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
