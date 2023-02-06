import instance from "./api";
import { IAuction } from "types/auction";

const VITE_SERVER_DOMAIN = import.meta.env.VITE_SERVER_DOMAIN;

export const createAuction = async (data: IAuctionCreate) => {
  return await instance.post(`${VITE_SERVER_DOMAIN}/auction`, data);
};

interface IReqAuction {
  sort: string;
  state: number;
}

export const getAuctions = async (data: IReqAuction) => {
  return await instance.get<IAuction[]>(
    `${VITE_SERVER_DOMAIN}/api/auction/list?sort=${data.sort}&state=${data.state}`
  );
};

interface IReqSearch {
  word: string;
  state: number;
}
export const getAuctionByWord = async (data: IReqSearch) => {
  return await instance.get(
    `${VITE_SERVER_DOMAIN}/api/search?word=${data.word}&state=${data.state}`
  );
};
