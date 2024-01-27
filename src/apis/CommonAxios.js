import axios from "axios";

// 토큰 담지 않고 그냥 axios
export const DefaultAxios = axios.create({
  // baseURL을 쓰지 않아도 되는 이유. setupProxy에서 /api 혹은 /redis 요청을 보낼경우 proxy서버로 서버의 주소를 넣어주기 때문
  // baseURL: `${process.env.REACT_APP_SERVER_ADDRESS}`,
  headers: {
    "Content-Type": "application/json",
  },
});

// header에 accessToken을 담아 요청 보내는 axios
export const TokenAxios = axios.create({
  // baseURL: `${process.env.REACT_APP_SERVER_ADDRESS}`,
  headers: {
    "Content-Type": "application/json",
    "AccessToken": localStorage.getItem("accessToken"),
  },
});
