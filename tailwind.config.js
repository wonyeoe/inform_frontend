/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    colors: {
      "main-component": "#4068f7",
    },

    fontFamily: {
      // 여기에 폰트 패밀리 추가 예정
    },
    boxShadow: {
      // 여기에 그림자 스타일 추가 예정
    },
    borderRadius: {
      // 여기에 라운드 크기 추가 예정
    },
  },
  plugins: [],
};
