export type IReqType =
  | "main"
  | "like"
  | "startByCategory"
  | "onGoingByCategory"
  | "startByStartTime"
  | "onGoingByStartTime";

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
