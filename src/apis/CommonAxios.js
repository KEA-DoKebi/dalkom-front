import axios from "axios";

// 개발 환경과 프로덕션 환경에 따라 다른 baseURL 설정
const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_SERVER_ADDRESS
    : "";

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
  },
});

TokenAxios.interceptors.request.use(
  (config) => {
    const nextConfig = config;
    const accessToken = localStorage.getItem("accessToken");
    nextConfig.headers.AccessToken = accessToken ? accessToken : "";

    return nextConfig;
  },
  (error) => {
    return Promise.reject(error);
  },
);
