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
  auctionImage?: {
    auctionImageSeq: number;
    auctionSeq: number;
    imageUrl: string;
  };
}
