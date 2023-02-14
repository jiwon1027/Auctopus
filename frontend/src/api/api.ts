import axios from "axios";

const KAKAO_HOST = "https://kauth.kakao.com";
const REST_API_KEY = import.meta.env.VITE_REST_API_KEY;
const REDIRECT_URI = `${
  import.meta.env.VITE_LOCAL_DOMAIN
}/oauth/callback/kakao`;

export const KAKAO_AUTH_URL = `${KAKAO_HOST}/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const token = localStorage.getItem("token");

const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_DOMAIN,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default instance;
