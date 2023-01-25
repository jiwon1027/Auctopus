const KAKAO_HOST = "https://kauth.kakao.com";
const REST_API_KEY = import.meta.env.VITE_REST_API_KEY;
const REDIRECT_URI = `${import.meta.env.VITE_APP_DOMAIN}/oauth/callback/kakao`;

export const kAKAO_AUTH_URL = `${KAKAO_HOST}/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

