import instance from "./api";
import { IAuction, IReqSearch } from "types/auction";

const VITE_SERVER_DOMAIN = import.meta.env.VITE_SERVER_DOMAIN;

export const createAuction = async (data: FormData, token: string) => {
  return await instance.post(`${VITE_SERVER_DOMAIN}/api/auction`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};

interface IReqAuction {
  sort: string;
  state: number;
}

export async function getAuctions(data: IReqAuction) {
  return await instance.get<IAuction[]>(
    `${VITE_SERVER_DOMAIN}/api/auction/list?sort=${data.sort}&state=${data.state}`
  );
}

export async function getAuctionsByQuery(data: IReqSearch) {
  return await instance.get(`${VITE_SERVER_DOMAIN}/api/search`, {
    params: {
      word: data.word,
      category: data.category,
      state: data.state,
    },
  });
}

export async function getAuction(auctionSeq: string) {
  return await instance.get<IAuctionDetail>(
    `${VITE_SERVER_DOMAIN}/api/auction/${auctionSeq}`
  );
}

export async function getAuctionLikes() {
  return await instance.get<IAuction[]>(`${VITE_SERVER_DOMAIN}/api/liked`);
}

export async function postAuctionLike(auctionSeq: string) {
  return await instance.post(`${VITE_SERVER_DOMAIN}/api/liked`, { auctionSeq });
}

export async function deleteAuctionLike(auctionSeq: string) {
  return await instance.delete<IAuction>(
    `${VITE_SERVER_DOMAIN}/api/liked/${auctionSeq}`
  );
}
