import axios from "axios";

const KAKAO_HOST = "https://kauth.kakao.com";
const REST_API_KEY = import.meta.env.VITE_REST_API_KEY;
const REDIRECT_URI = `${
  import.meta.env.VITE_REDIRECT_URL
}/oauth/callback/kakao`;

export const KAKAO_AUTH_URL = `${KAKAO_HOST}/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_DOMAIN,
});

instance.interceptors.request.use(
  function (config) {
    // 요청 바로 직전
    config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
