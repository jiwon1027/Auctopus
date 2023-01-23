const kakaoHost = "https://kauth.kakao.com";

const REST_API_KEY = "";
const REDIRECT_URI = "";
export const kakaoApi = {
  getAuthCode: () => {
    const url = `${kakaoHost}/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  },
};
