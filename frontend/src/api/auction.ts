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
  word: string | null;
  category: string | null;
  state: number;
}
// FIXME: UTF-8 and &nullstate
export const getAuctionsByQuery = async (data: IReqSearch) => {
  let query = "?";
  if (data.word || data.category) {
    query += data.word && `word=${data.word}&`;
    query += data.category && `category=${data.category}&`;
    query += `state=${data.state}`;
  }
  return await instance.get(`${VITE_SERVER_DOMAIN}/api/search${query}`);
};
