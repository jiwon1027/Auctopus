export type IFilter = "main" | "like" | "category" | "startTime";

export interface IAuction {
  auctionSeq: number;
  email: string;
  title: string;
  startTime: string;
  likeCount: number;
  startPrice: number;
  state: number;
  viewer: number;
  price: number;
  auctionImage: {
    auctionImageSeq: number;
    auctionSeq: number;
    imageUrl: string;
  };
}

export interface IReqSearch {
  word: string | null;
  category: string | null;
  state: number;
}

export interface IMessage {
  type: number; // 0: open, 1: 일반 채팅, 2: bidding, 3: close
  userEmail: string;
  nickname: string;
  message: string; // "안녕"
  date: string;
  topPrice: number;
  topBidder: string; // nickname
}
