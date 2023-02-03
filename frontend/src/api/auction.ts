import instance from "./api";

const VITE_SERVER_DOMAIN = import.meta.env.VITE_SERVER_DOMAIN;

export const createAuction = async (data: IAuctionCreate) => {
  return await instance.post(`${VITE_SERVER_DOMAIN}/auction`, data);
};
