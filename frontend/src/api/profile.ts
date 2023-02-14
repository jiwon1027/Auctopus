import instance from "./api";

const VITE_SERVER_DOMAIN = import.meta.env.VITE_SERVER_DOMAIN;

export async function updateUserInfo() {
  return await instance.patch(`${VITE_SERVER_DOMAIN}/user`);
}

export async function getUserInfo() {
  return await instance.get(`${VITE_SERVER_DOMAIN}/user`);
}
