//axios instance를 정의하는 파일
import axios from "axios";

const instance = axios.create({
  //CORS 연동 완료 후
  baseURL: "http://20.249.161.76/",
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

export default instance;
