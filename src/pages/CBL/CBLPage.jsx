import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import TabBar from "../../components/common/TabBar";
import Footer from "../../components/common/Footer";
import MiniCalendarSet from "../../components/common/MiniCalendarSet";
import SearchBar from "../../components/common/SearchBar";
import ClubCarousel from "../../components/common/ClubCarousel";
import ClubRow from "../../components/CBL/ClubRow";
import Imminent from "../../components/common/Imminent";
import api from "../../api/axios";

const CBLPage = () => {
  const navigate = useNavigate();

  const [clubs, setClubs] = useState([]);
  const [clubsLoading, setClubsLoading] = useState(false);
  const [clubsError, setClubsError] = useState(null);
  const [pageInfo, setPageInfo] = useState({
    current_page: 1,
    total_pages: 1,
    total_articles: 0,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchText, setSearchText] = useState("");

  const [imminentEvents, setImminentEvents] = useState([]);
  const [imminentLoading, setImminentLoading] = useState(false);
  const [imminentError, setImminentError] = useState(null);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        setClubsLoading(true);
        setClubsError(null);

        const res = await api.get("/api/v1/club_articles", {
          params: {
            page: currentPage,
            size: itemsPerPage,
            search: searchText.trim() !== "" ? searchText.trim() : undefined,
          },
        });

        console.log("club list:", res.data);

        setClubs(res.data.club_articles || []);
        if (res.data.page_info) {
          setPageInfo(res.data.page_info);
        } else {
          setPageInfo({
            current_page: currentPage,
            total_pages: 1,
            total_articles: res.data.club_articles
              ? res.data.club_articles.length
              : 0,
          });
        }
      } catch (error) {
        console.error("동아리 목록 불러오기 실패:", error);
        setClubsError("동아리 목록을 불러오지 못했습니다.");
      } finally {
        setClubsLoading(false);
      }
    };

    fetchClubs();
  }, [currentPage, searchText]);

  // 카테고리/검색 바꾸면 1페이지로
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchText]);

  // 동적으로 카테고리 생성
  const categories = useMemo(() => {
    const allVendors = clubs
      .map((club) => club.vendors?.vendor_name)
      .filter(Boolean);
    const uniqueVendors = [...new Set(allVendors)];
    return [
      { id: "ALL", label: "전체" },
      ...uniqueVendors.map((vendor) => ({
        id: vendor,
        label: vendor,
      })),
    ];
  }, [clubs]);

  const filteredClubs = clubs.filter((club) => {
    const isCategoryMatch =
      selectedCategory === "ALL" ||
      club.vendors?.vendor_name === selectedCategory;

    return isCategoryMatch;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchText]);

  useEffect(() => {
    const fetchImminentEvents = async () => {
      try {
        setImminentLoading(true);
        setImminentError(null);

        const res = await api.get("/api/v1/deadline/club_articles");

        setImminentEvents(res.data.club_articles || []);
      } catch (error) {
        console.error("마감 임박 행사 불러오기 실패:", error);
        setImminentError("마감 임박 행사를 불러오지 못했습니다.");
      } finally {
        setImminentLoading(false);
      }
    };

    fetchImminentEvents();
  }, []);

  const currentClubs = filteredClubs;
  const totalPages = pageInfo.total_pages || 1;

  const handleClubClick = (id) => {
    navigate(`/clubs/detail/${id}`);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <TabBar />

      <div className="flex-1 w-full max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* 왼쪽 사이드바 */}
          <aside className="w-full md:w-1/3 lg:w-1/4 space-y-6">
            <MiniCalendarSet />
            <div className="p-4 max-w-100 rounded-3xl bg-white shadow-md flex flex-col items-center">
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                🔥 마감 임박
              </h3>
              <div className="space-y-1 w-full">
                {imminentLoading && (
                  <p className="text-sm text-gray-400 text-center">
                    불러오는 중...
                  </p>
                )}
                {imminentError && (
                  <p className="text-sm text-red-400 text-center">
                    {imminentError}
                  </p>
                )}
                {!imminentLoading &&
                  !imminentError &&
                  imminentEvents.map((imminentEvent) => (
                    <Imminent
                      key={imminentEvent.article_id}
                      title={imminentEvent.title}
                      date={imminentEvent.due_date}
                      onClick={() => handleClubClick(imminentEvent.article_id)}
                    />
                  ))}
                {!imminentLoading &&
                  !imminentError &&
                  imminentEvents.length === 0 && (
                    <p className="text-sm text-gray-400 text-center">
                      표시할 마감 임박 행사가 없습니다.
                    </p>
                  )}
              </div>
            </div>
            <ClubCarousel />
          </aside>

          {/* 오른쪽 메인 컨텐츠 */}
          <main className="flex-1 w-full bg-white rounded-3xl shadow-sm border border-gray-100 p-6 min-h-[500px] flex flex-col justify-between">
            <div>
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
                      ${
                        selectedCategory === cat.id
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
                {currentClubs.length > 0 ? (
                  currentClubs.map((club) => (
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
            </div>

            {/* 페이지네이션 UI */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-10">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-md text-sm ${
                    currentPage === 1
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  &lt;
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (number) => (
                    <button
                      key={number}
                      onClick={() => handlePageChange(number)}
                      className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                        currentPage === number
                          ? "bg-blue-500 text-white shadow-sm"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {number}
                    </button>
                  )
                )}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-md text-sm ${
                    currentPage === totalPages
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  &gt;
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CBLPage;
