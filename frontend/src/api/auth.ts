import instance from "./api";
import { IReqSocialSignup, IResSocialLogin, IUser } from "types/auth";

const URL = import.meta.env.VITE_SERVER_DOMAIN;

export const sendAuthCode = async (code: string) => {
  return await instance.get<IResSocialLogin>(
    `${URL}/api/kakao/login?code=${code}`
  );
};

export const requestForSignup = async (user: IUser) => {
  const reqData: IReqSocialSignup = {
    account: user.bankAccount,
    address: user.address,
    bankCode: -1,
    profileUrl: "",
    userName: user.name,
  };
  return await instance.post(`${URL}/api/kakao/login`, reqData);
};
