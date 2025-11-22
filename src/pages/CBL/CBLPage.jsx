import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/common/Header";
import TabBar from "../../components/common/TabBar";
import Footer from "../../components/common/Footer";
import MiniCalendar from "../../components/common/MiniCalendar";
import SearchBar from "../../components/common/SearchBar";
import ClubCarousel from "../../components/common/ClubCarousel";
import ClubRow from "../../components/CBL/ClubRow";
import mockData from "../../mocks/CBL/ClubRowMock.json";
import Imminent from "../../components/common/Imminent";
import imminentClubsMockData from "../../mocks/CBL/ImminentClubMock.json"



const CBLPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchText, setSearchText] = useState("");

  const clubs = mockData.club_articles;
  const imminentClubs = imminentClubsMockData.club_articles;

  const categories = [
    { id: "ALL", label: "전체" },
    { id: "GDGOC", label: "GDGOC" },
    { id: "IBAS", label: "IBAS" },
    { id: "토포키클럽", label: "토포키클럽" },
  ];

  const filteredClubs = clubs.filter((club) => {
    const isCategoryMatch = 
      selectedCategory === "ALL" || 
      club.vendors?.vendor_name === selectedCategory;

    const isSearchMatch =
      club.title.toLowerCase().includes(searchText.toLowerCase());

    return isCategoryMatch && isSearchMatch;
  });

  const handleClubClick = (id) => {
    navigate(`detail/${id}`);
  };
  

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <TabBar />
    
      <div className="flex-1 w-full max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          
          {/* 왼쪽 사이드바 */}
          <aside className="w-full md:w-1/3 lg:w-1/4 space-y-6">
            <MiniCalendar />
            <div className="p-4 max-w-100 rounded-3xl bg-white shadow-md flex flex-col items-center">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                🔥 마감 임박
              </h3>
              <div className="space-y-1">
                {imminentClubs.map((imminentClub) => (
                  <Imminent
                    id={imminentClub.article_id}
                    title={imminentClub.title}
                    date={imminentClub.due_date} // 마감일 표시 맞겠지..?
                    onClick={() => handleClubClick(imminentClub.article_id)}
                  />
                ))}
              </div>
            </div>
          </aside>

          {/* 오른쪽 메인 컨텐츠 */}
          <main className="flex-1 w-full bg-white rounded-xl shadow-sm border border-gray-200 p-6 min-h-[600px]">
            
            {/* 헤더 & 검색창 */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <h2 className="text-xl font-bold text-gray-800 w-full sm:w-auto">
                동아리 행사 목록
              </h2>
              <div className="w-full sm:w-64">
                <SearchBar 
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="동아리/행사 검색..."
                />
              </div>
            </div>

            {/* 카테고리 탭 */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 
                    ${selectedCategory === cat.id 
                      ? "bg-blue-500 text-white shadow-md transform scale-105" 
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* 동아리 카드 그리드 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredClubs.length > 0 ? (
                filteredClubs.map((club) => (
                  <ClubRow
                    key={club.article_id} 
                    title={club.title}
                    date={club.created_at} 
                    attachment_url={club.attachment_url}
                    onClick={() => handleClubClick(club.article_id)}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-20 text-gray-400">
                  <p>조건에 맞는 동아리 행사가 없습니다.</p>
                </div>
              )}
            </div>

          </main>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CBLPage;