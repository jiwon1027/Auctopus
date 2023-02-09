interface IAuctionInfo {
  auctionSeq: number;
  userEmail: string;
  profileUrl: string;
  nickname: string;
  categorySeq: number;
  title: string;
  content: string;
  startTime: string;
  startPrice: number;
  link: string;
  likeCount: number;
  state: number;
  bidUnit: number;
}

interface IAuctionCreate {
  userEmail: string;
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
