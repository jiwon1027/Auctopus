import instance from "./api";
import { IAuction, IReqSearch } from "types/auction";

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

export const getAuctionsByQuery = async (data: IReqSearch) => {
  return await instance.get(`${VITE_SERVER_DOMAIN}/api/search`, {
    params: {
      word: data.word,
      category: data.category,
      state: data.state,
    },
  });
};
