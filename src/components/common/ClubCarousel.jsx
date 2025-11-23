import ClubImage001 from "../../assets/clubmocks/club001.png";
import ClubImage002 from "../../assets/clubmocks/club002.png";
import ClubImage003 from "../../assets/clubmocks/club003.png";
import ClubImage004 from "../../assets/clubmocks/club004.png";
import { useEffect, useState } from "react";
const ClubCarousel = ({
  images = [ClubImage001, ClubImage002, ClubImage003, ClubImage004],
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="p-4 max-w-100 rounded-3xl bg-white shadow-md flex flex-col items-center">
      <div className="font-semibold items-center pt-3">동아리/행사 포스터</div>

      <img
        src={images[currentIndex]}
        alt="carousel"
        className="w-full max-w-60 min-w-48 py-4 "
      />
    </div>
  );
};
export default ClubCarousel;
