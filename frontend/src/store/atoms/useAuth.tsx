import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { atom, useRecoilState } from "recoil";
import { IUser, IInterest, IValidated, IForm } from "types/auth";

const InitUser: IUser = {
  seq: -1,
  email: "",
  password: "",
  passwordConfirm: "",
  name: "",
  nickname: "",
  interests: [] as IInterest[],
};

const InitValidated: IValidated = {
  email: false,
  password: false,
  passwordConfirm: false,
  name: false,
  nickname: false,
  address: false,
  bankAccount: false,
  interests: false,
};

const InitForm: IForm = {
  user: { ...InitUser },
  validated: { ...InitValidated },
};

const formDefaultState = atom({
  key: "formDefaultStatebjkla;sdlfj",
  default: InitForm,
});

// TODO: store User profile info into **LocalStorage**
export default function useAuth() {
  const navigate = useNavigate();
  const [formState, setFormState] = useRecoilState(formDefaultState); // used for signup
  const getToken = () => localStorage.getItem("token");

  useEffect(() => {
    console.log("formState: ", formState);
  }, [formState]);

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

  function confirmUser() {
    let confirmed = true;
    for (const key in formState.validated) {
      if (key === "address" || key === "bankAccount" || key === "interests") {
        continue;
      }
      confirmed = confirmed && formState.validated[key as keyof IValidated];
    }
    return confirmed;
  }

  function updateUser(name: keyof IUser, value: string | IInterest[]) {
    setFormState((prev) => {
      console.log("name and value: ", name, value);
      let isValidated = true;
      switch (name) {
        case "email": {
          // eslint-disable-next-line no-useless-escape
          const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if (!mailFormat.test(value as string)) {
            isValidated = false;
          }
          break;
        }
        case "password": {
          if (!getToken()) {
            if ((value as string).trim() === "") {
              isValidated = false;
            }
            return {
              ...prev,
              user: {
                ...prev.user,
                [name]: value as string,
              },
              validated: {
                ...prev.validated,
                [name]: isValidated,
                passwordConfirm: prev.user.passwordConfirm === value,
              },
            };
          }
          break;
        }
        case "passwordConfirm": {
          if (!getToken() && prev.user.password !== value) {
            isValidated = false;
          }
          break;
        }
        case "name":
        case "nickname": {
          if ((value as string).trim() === "") isValidated = false;
          break;
        }
        case "address":
        case "bankAccount":
        case "interests":
        default:
          break;
      }

      return {
        ...prev,
        user: {
          ...prev.user,
          [name]: value,
        },
        validated: {
          ...prev.validated,
          [name]: isValidated,
        },
      };
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
    getToken,
    kakaoLogin,
    confirmUser,
    updateUser,
    signUp,
    signOut,
  };
}
