import axios from "axios";

export const DefaultAxios = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_ADDRESS}`,
});

export const TokenAxios = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_ADDRESS}`,
  headers: {
    accessToken: localStorage.getItem("accessToken"),
  },
});
