import instance from "./axios";
//[5] 캘린더 아티클 전체 조회
export async function getMonthlyAll({ calendarMonth }) {
  console.log("🔵 [API] getMonthlyAll 호출 시작");
  /** request param
   * date : string (YYYY-MM)
   * page : 리스트 페이지 개수 integer
   * size : 한 페이지에서 보여줄 게시글
   */
  try {
    const res = await instance.get("api/v1/monthly", {
      params: {
        date: `${calendarMonth}`,
        page: 1,
        size: 100,
      },
    });
    console.log("✅ [API] 응답 성공:", res.status);
    console.log("📦 [API] 응답 데이터:", res.data);
    console.log("📊 [API] 응답 데이터 타입:", typeof res.data);
    console.log(
      "📋 [API] articles 존재?:",
      res.data?.articles ? "✅ 있음" : "❌ 없음"
    );

    const data = res.data;
    return data;
  } catch (error) {
    console.error("❌ [API] 에러 발생:");
    console.error("  - 에러 메시지:", error.message);
    console.error("  - 에러 코드:", error.code);
    console.error("  - 응답 상태:", error.response?.status);
    throw error;
  }
}
