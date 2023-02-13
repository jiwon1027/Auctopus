import { requestForSignup, sendAuthCode } from "@/api/auth";
import { redirect, useNavigate } from "react-router-dom";
import { atom, useRecoilState, useResetRecoilState } from "recoil";
import {
  IUser,
  IInterest,
  IValidated,
  IForm,
  IResSocialLogin,
} from "types/auth";

const initUser: IUser = {
  seq: -1,
  email: "",
  password: "",
  passwordConfirm: "",
  name: "",
  nickname: "",
  address: "",
  bankAccount: "",
  interests: [] as IInterest[],
  profileUrl: "",
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
  profileUrl: false,
};

const InitForm: IForm = {
  user: { ...initUser },
  validated: { ...InitValidated },
};

const formDefaultState = atom({
  key: "formDefaultStatebjkla;sdlfj",
  default: InitForm,
});

export default function useAuth() {
  const navigate = useNavigate();
  const resetRecoilState = useResetRecoilState(formDefaultState);
  const [formState, setFormState] = useRecoilState(formDefaultState); // used for signup

  function getToken() {
    const tokenStr = localStorage.getItem("token");
    if (!tokenStr) return;
    return tokenStr;
  }

  function getUser() {
    const userStr = localStorage.getItem("user");
    if (!userStr) return initUser;
    return JSON.parse(userStr);
  }

  // debug formState
  // useEffect(() => {
  //   console.log("formState: ", formState);
  // }, [formState]);

  async function kakaoLogin(code: string) {
    try {
      const res = await sendAuthCode(code);
      console.log(res);
      const resData: IResSocialLogin = res.data;
      signIn(resData);

      // newUser: number | null; // 0: 기존유저, 1: 새로운유저
      if (resData.newUser > 0) {
        setFormState((prev) => {
          return {
            ...prev,
            user: {
              ...prev.user,
              email: resData.userEmail,
              nickname: resData.nickname,
              proifleUrl: resData.profile_image,
            },
            validated: {
              ...prev.validated,
              password: true,
              passwordConfirm: true,
              nickname: true,
              email: true,
              profileUrl: false,
            },
          };
        });
        navigate("/signup");
        return;
      }

      navigate("/main", { replace: true });
    } catch (error) {
      console.log("소셜로그인 에러", error);
      window.alert("로그인에 실패하였습니다.");
      navigate("/", { replace: true });
    }
  }

  /**
   * 회원가입하는 유저가 필수 정보를 모두 입력했는지 확인한다
   * @remarks 주소, 계좌번호, 그리고 관심 카테고리는 선택항목이다
   * @returns confirmed
   */
  function confirmUser() {
    let confirmed = true;
    for (const key in formState.validated) {
      if (
        key === "address" ||
        key === "bankAccount" ||
        key === "interests" ||
        key === "profileUrl"
      ) {
        continue;
      }
      confirmed = confirmed && formState.validated[key as keyof IValidated];
    }
    return confirmed;
  }

  /**
   * 회원가입하는 유저의 정보를 업데이트한다
   * @remarks 주소, 계좌번호, 그리고 관심 카테고리는 선택항목이다
   * @param name input 태그의 name attribute
   * @param value 값
   *
   * @example
   * ```
   * updateUser("nickname", "개구쟁이 싸피");
   * updateUser("interests", [{ id: "123", label: "신발"}]);
   * ```
   */
  function updateUser(name: keyof IUser, value: string | IInterest[]) {
    setFormState((prev) => {
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

  function resetFormState() {
    resetRecoilState();
  }

  /**
   * 로그인하면 토큰, 유저정보를 로컬 저장소에 저장하고, axios 헤더에 토큰 세팅한다
   * @param resData 카카오 로그인하고나서 넘어온 response 데이터
   */
  function signIn(resData: IResSocialLogin) {
    localStorage.setItem("token", resData.token);
    localStorage.setItem(
      "user",
      JSON.stringify({
        email: resData.userEmail,
        nickname: resData.nickname,
        profileUrl: resData.profile_image,
      })
    );
  }

  async function signUp() {
    try {
      const res = await requestForSignup(formState.user);
      if (res.status === 200) {
        alert("회원가입을 완료했습니다");
        resetFormState();
        localStorage.clear();
        navigate("/", { replace: true });
      } else {
        throw new Error("회원가입 에러");
      }
    } catch (error) {
      redirect("/error");
    }
  }

  function signOut() {
    localStorage.clear();
  }

  return {
    formState,
    getToken,
    getUser,
    kakaoLogin,
    confirmUser,
    updateUser,
    resetFormState,
    signUp,
    signOut,
  };
}
