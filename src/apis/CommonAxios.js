import axios from "axios";

// 개발 환경과 프로덕션 환경에 따라 다른 baseURL 설정
const baseURL = process.env.NODE_ENV === "production" ? process.env.REACT_APP_SERVER_ADDRESS : "";

export const DefaultAxios = axios.create({
  baseURL, // 조건에 따라 설정된 baseURL 사용
  headers: {
    "Content-Type": "application/json",
  },
});

export const TokenAxios = axios.create({
  baseURL, // 조건에 따라 설정된 baseURL 사용
  headers: {
    "Content-Type": "application/json",
    // 로컬 스토리지에서 토큰을 가져오는 로직은 호출 시점에 실행되도록 변경
    // 이렇게 해야 토큰이 갱신되었을 때 최신 토큰을 사용할 수 있음
    get AccessToken() {
      return localStorage.getItem("accessToken");
    },
  },
});
