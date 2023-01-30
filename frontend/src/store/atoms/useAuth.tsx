import axios from "axios";
import { useNavigate } from "react-router-dom";
import { atom, useRecoilState, useResetRecoilState } from "recoil";
import { IUser, IInterest, IValidated, IForm } from "types/auth";

const InitUser: IUser = {
  seq: -1,
  email: "",
  password: "",
  passwordConfirm: "",
  name: "",
  nickname: "",
  address: "",
  bankAccount: "",
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

export default function useAuth() {
  const navigate = useNavigate();
  const [formState, setFormState] = useRecoilState(formDefaultState); // used for signup
  const getToken = () => localStorage.getItem("token");

  // debug formState
  // useEffect(() => {
  //   console.log("formState: ", formState);
  // }, [formState]);

  async function kakaoLogin(code: string) {
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

      localStorage.setItem(
        "user",
        JSON.stringify({
          email: res.data.userEmail,
          name: res.data.userName,
        })
      );
      navigate("/", { replace: true }); // 토큰 받았았고 로그인됐으니 화면 전환시켜줌(메인으로)
    } catch (error) {
      console.log("소셜로그인 에러", error);
      window.alert("로그인에 실패하였습니다.");
      navigate("/login", { replace: true }); // 로그인 실패하면 로그인화면으로 돌려보냄
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
      if (key === "address" || key === "bankAccount" || key === "interests") {
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

  // FIXME: not tested at all
  function resetFormState() {
    useResetRecoilState(formDefaultState);
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
    resetFormState,
    signUp,
    signOut,
  };
}
