interface IAuctionDetail {
  auctionSeq: number;
  userEmail: string;
  profileUrl: string;
  nickname: string;
  categorySeq: number;
  title: string;
  content: string;
  startTime: string;
  startPrice: number;
  likeCount: number;
  state: number;
  bidUnit: number;
  auctionImageList: {
    auctionImageSeq: number;
    auctionSeq: number;
    imageUrl: string;
  }[];
  isLiked: boolean;
}

interface IAuctionCreate {
  images?: [];
  categorySeq: string;
  title: string;
  content: string;
  startTime: string;
  startPrice: number;
  bidUnit: number;
}

interface IUserData {
  nickname: string;
  email: string;
  profileUrl: string;
}
