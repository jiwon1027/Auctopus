import axios from "axios";
import { useNavigate } from "react-router-dom";
import { atom, useRecoilState } from "recoil";

interface IInterest {
  id: string;
  label: string;
}
export interface IUser {
  seq: number;
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  nickname: string;
  address?: string;
  bankAccount?: string;
  interests: IInterest[];
}

const InitUser: IUser = {
  seq: -1,
  email: "",
  password: "",
  passwordConfirm: "",
  name: "",
  nickname: "",
  interests: [] as IInterest[],
};

export interface IForm {
  confirmed: boolean;
  user: IUser;
}

const InitForm = {
  confirmed: false,
  user: InitUser,
};

const formDefaultState = atom({
  key: "formDefaultState",
  default: InitForm,
});

export default function useAuth() {
  const navigate = useNavigate();
  const [formState, setFormState] = useRecoilState(formDefaultState);

  const kakaoLogin = async (code: string) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_DOMAIN}/api/kakao/login?code=${code}`
      );
      console.log(res);
      localStorage.setItem("token", res.data.id_token); //예시로 로컬에 저장함

      // newUser: number | null; // 0: 기존유저, 1: 새로운유저
      if (res.data.newUser > 0) {
        setFormState((prev) => {
          prev.user.email = res.data.userEmail;
          prev.user.name = res.data.userName;
          return prev;
        });
        navigate("/signup");
        return;
      }
      navigate("/", { replace: true }); // 토큰 받았았고 로그인됐으니 화면 전환시켜줌(메인으로)
    } catch (error) {
      console.log("소셜로그인 에러", error);
      window.alert("로그인에 실패하였습니다.");
      navigate("/login", { replace: true }); // 로그인 실패하면 로그인화면으로 돌려보냄
    }
  };

  function updateUser(
    name: keyof IUser,
    value: string | { id: string; label: string }[]
  ) {
    let isConfirmed = true;
    for (const key in formState.user) {
      if (key === "interests") continue;
      const val = formState.user[key as keyof IUser] as string;
      isConfirmed = isConfirmed && val.trim() !== "";
    }

    if (name === "interests") {
      return setFormState((prev) => {
        prev.user["interests"] = value as IInterest[];
        prev.confirmed = isConfirmed;
        return prev;
      });
    }

    setFormState((prev) => {
      if (name === "seq") return prev;
      prev.user[name] = value as string;
      return prev;
    });
  }

  function signUp() {
    console.log("sign up");
  }

  function signOut() {
    localStorage.clear();
  }

  return {
    formState,
    kakaoLogin,
    updateUser,
    signUp,
    signOut,
  };
}
