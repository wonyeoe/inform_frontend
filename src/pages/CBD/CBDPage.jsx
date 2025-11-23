import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/common/Header";
import TabBar from "../../components/common/TabBar";
import Footer from "../../components/common/Footer";
import ClubDetail from "../../components/CBD/ClubDetail";
import CBLMockData from "../../mocks/CBL/ClubRowMock.json"
import CBDMockData from "../../mocks/CBD/ClubDetailMock.json";

const CBDPage = () => {
  const navigate = useNavigate();

  // URL 파라미터에서 id값 가져오기
  const { id } = useParams(); 
  const [club, setClub] = useState(null);

  useEffect(() => {
    // 일치하는 id 없으면 1번 ID를 강제로 사용 (테스트용!!!! 나중에 바꾸기)
    const targetId = id ? parseInt(id) : 1;

    // 전체 리스트에서 ID 일치하는 행사 찾기
    const foundClub = CBLMockData.club_articles.find(
      (item) => item.article_id === targetId
    );

    if (foundClub) {
      // 찾았으면 리스트 정보 +  상세 내용을 합치기
      setClub({
        ...CBDMockData, // 기본 틀(content 등)
        ...foundClub,        // 실제 정보(title, date 등)
        vendors: foundClub.vendors || CBDMockData.vendors 
      });
    } else {
      setClub(CBDMockData);
    }
  }, [id]);

  if (!club) return <div className="min-h-screen bg-gray-50 pt-20 text-center">로딩중...</div>;

  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <TabBar/>
      <div className="flex-1 w-full max-w-6xl mx-auto px-4 py-6">
        <ClubDetail 
          title={club.title}
          vendor={club.vendors.vendor_name}
          startDate={club.start_date}
          dueDate={club.due_date}
          created_at={club.created_at}
          content={club.content}
          linkUrl={club.original_url}
          attachmentUrls={club.attachment_urls}
        />
      </div>
      <Footer />
    </div>
  );
};

export default CBDPage;
