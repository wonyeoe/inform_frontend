import axios from "axios";
import instance from "./axios";

export async function getMonthlyAll() {
  console.log("🔵 [API] getMonthlyAll 호출 시작");

  try {
    // CORS 설정 완료 후 직접 연결
    console.log("🔗 [API] 요청 URL:", "https://ultraistic-vicky-caustically.ngrok-free.dev/api/v1/monthly");

    const res = await axios.get(
      "https://ultraistic-vicky-caustically.ngrok-free.dev/api/v1/monthly",
      {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      }
    );

    console.log("✅ [API] 응답 성공:", res.status);
    console.log("📦 [API] 응답 데이터:", res.data);
    console.log("📊 [API] 응답 데이터 타입:", typeof res.data);
    console.log("📋 [API] articles 존재?:", res.data?.articles ? "✅ 있음" : "❌ 없음");

    const data = res.data;
    return data;
  } catch (error) {
    console.error("❌ [API] 에러 발생:");
    console.error("  - 에러 메시지:", error.message);
    console.error("  - 에러 코드:", error.code);
    console.error("  - 응답 상태:", error.response?.status);
    console.error("  - 응답 데이터:", error.response?.data);
    console.error("  - 전체 에러:", error);
    throw error;
  }
}
