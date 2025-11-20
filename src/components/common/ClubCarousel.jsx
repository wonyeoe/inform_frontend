import ClubImage001 from "../../assets/clubmocks/club001.png";
import ClubImage002 from "../../assets/clubmocks/club002.png";
import ClubImage003 from "../../assets/clubmocks/club003.png";
import ClubImage004 from "../../assets/clubmocks/club004.png";
import { useEffect, useState } from "react";
const ClubCarousel = ({
  images = [ClubImage001, ClubImage002, ClubImage003, ClubImage004],
}) => {
  const [index, setIndex] = useState(0);
  const handlePrev = () => {
    if (index > 0) {
      setIndex(index - 1);
    } else {
      setIndex(images.length - 1);
    }
  };

  const handleNext = () => {
    if (index < images.length - 1) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }

    useEffect(() => {
      setInterval(() => {
        handleNext();
      }, 3000);
    }, []);
  };

  return (
    <div className="p-4 max-w-100  rounded-lg  gap-4 mt-6 bg-white shadow-md pt-5">
      <div>동아리/행사 포스터</div>
      <button onClick={handlePrev}>이전</button>
      <img
        src={images[`${index}`]}
        alt="carousel"
        className="w-full max-w-68"
      />
      <button onClick={handleNext}>다음</button>
    </div>
  );
};
export default ClubCarousel;
