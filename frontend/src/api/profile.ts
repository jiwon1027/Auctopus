import instance from "./api";
import { IUserInfoData } from "types/profile";

const VITE_SERVER_DOMAIN = import.meta.env.VITE_SERVER_DOMAIN;

export async function updateUserInfo(userInfo: IUserInfoData) {
  return await instance.put(`${VITE_SERVER_DOMAIN}/api/user`, userInfo);
}

export async function getUserInfo() {
  return await instance.get(`${VITE_SERVER_DOMAIN}/api/user`);
}
