import axios from "axios";
import { useNavigate } from "react-router-dom";
import { atom, useRecoilState } from "recoil";

const userInitState = {
  email: "",
  name: "",
  nickname: "",
};

const userState = atom({
  key: "userState", // unique ID (with respect to other atoms/selectors)
  default: userInitState, // default value (aka initial value)
});

export default function useAuth() {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);

  const kakaoLogin = async (code: string) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_DOMAIN}/api/kakao/login?code=${code}`
      );
      console.log(res);
      const ACCESS_TOKEN = res.data.accessToken;
      localStorage.setItem("token", ACCESS_TOKEN); //예시로 로컬에 저장함

      // newUser: number | null; // 0: 기존유저, 1: 새로운유저
      if (res.data.newUser > 0) {
        navigate("/signup", { state: null });
        return;
      }
      navigate("/", { replace: true }); // 토큰 받았았고 로그인됐으니 화면 전환시켜줌(메인으로)
    } catch (error) {
      console.log("소셜로그인 에러", error);
      window.alert("로그인에 실패하였습니다.");
      navigate("/login", { replace: true }); // 로그인 실패하면 로그인화면으로 돌려보냄
    }
  };

  const signIn = () => {
    const user = {
      email: "example@gmail.com",
      name: "Example Kim",
      nickname: "example",
    };
    setUser(user);
  };

  const signUp = () => {
    console.log("sign up");
  };

  const signOut = () => {
    localStorage.clear();
  };

  return {
    user,
    kakaoLogin,
    signIn,
    signUp,
    signOut,
  };
}

// https://localhost:8080/kakao/login?code=6kg0nLF3b5yoVhDVXUSo1w57FfeEfdk7FRkli-VE51pHwURPkIKZ8V897mT05PvV3nO18wo9dGgAAAGF58X-vg
// https://localhost:5173/login?code=XddlBhc_J-Z64j-0w5b0knGrSDTy75X0bCNQJWnWc0rE9-MgGus2PIOiTKuFtwGwSPFVOgo9dJgAAAGF58vVJQ
