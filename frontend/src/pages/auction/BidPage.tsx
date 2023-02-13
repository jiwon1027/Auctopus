import React, { useEffect, useState } from "react";
import Layout from "@components/common/Layout";
import { Button } from "@mui/material";
import NoticeSection from "@components/bidding/NoticeSection";
import ChatSection from "@components/bidding/ChatSection";
import ActionForm from "@components/bidding/ActionForm";
import { IMessage } from "types/auction";
import { useLocation } from "react-router-dom";
import useAuth from "@/store/atoms/useAuth";
import WebSocket from "isomorphic-ws";
import { IUser } from "types/auth";

const initAuctionInfo: IAuctionDetail = {
  auctionSeq: 1,
  bidUnit: 10,
  categorySeq: 1,
  content: "",
  isLiked: false,
  likeCount: 1,
  nickname: "멋지",
  profileUrl: "",
  startPrice: 100,
  startTime: "",
  state: 1,
  title: "멋지의 에어팟 프로 경매~",
  userEmail: "yegi@gmail.com",
  auctionImageList: [],
};

const initMessages: IMessage[] = [
  {
    type: 1,
    date: "2023-02-13T07:49:21.527Z",
    message: "yop",
    nickname: "멋지",
    userEmail: "taw4654@gmail.com",
    topPrice: 0,
    topBidder: "",
  },
  {
    type: 2,
    date: "2023-02-13T07:49:22.527Z",
    message: "100",
    nickname: "멋지",
    userEmail: "ssafy@ssafy.com",
    topPrice: 100,
    topBidder: "ssafy@ssafy.com",
  },
  {
    type: 1,
    date: "2023-02-13T07:49:23.527Z",
    message: "hello",
    nickname: "멋지",
    userEmail: "ssafy@ssafy.com",
    topPrice: 100,
    topBidder: "ssafy@ssafy.com",
  },
  {
    type: 2,
    date: "2023-02-13T07:49:24.527Z",
    message: "200",
    nickname: "멋지",
    userEmail: "ssafy@ssafy.com",
    topPrice: 200,
    topBidder: "멋지",
  },
  {
    type: 2,
    date: "2023-02-13T07:49:25.527Z",
    message: "140",
    nickname: "멋지",
    userEmail: "ssafy@ssafy.com",
    topPrice: 200,
    topBidder: "ssafy@ssafy.com",
  },
];

export default function BidPage() {
  const location = useLocation();
  const user = useAuth().getUser();
  const [webSocket, setWebSocket] = useState<WebSocket>();
  const [messages, setMessages] = useState<IMessage[]>(initMessages);
  const [top, setTop] = useState({ topPrice: 0, topBidder: "" });

  const { auctionInfo, userState, limit } = (location.state as {
    auctionInfo: IAuctionDetail;
    userState: string;
    limit?: number;
  }) || { auctionInfo: initAuctionInfo, userState: "seller", limit: 1000 };

  useEffect(() => {
    const newWebSocket = new WebSocket(
      `${import.meta.env.VITE_WEBSOCKET_DOMAIN}/live/${auctionInfo.auctionSeq}`
    );

    newWebSocket.onopen = () => {
      newWebSocket.send(
        writeMessage(
          auctionInfo.auctionSeq,
          0,
          `${user.nickname} 님이 입장하셨습니다`,
          user,
          top
        )
      );
    };

    newWebSocket.onmessage = (event) => {
      // console.log("event: ", event.data);
      const msg: IMessage = JSON.parse(event.data as string);
      if (top.topPrice !== msg.topPrice) {
        setTop({ topPrice: msg.topPrice, topBidder: msg.topBidder });
      }
      setMessages((prev) => [...prev, msg]);
    };

    newWebSocket.onclose = () => {
      newWebSocket.send(
        writeMessage(
          auctionInfo.auctionSeq,
          3,
          `${user.nickname} 님이 나가셨습니다`,
          user,
          top
        )
      );
    };

    setWebSocket(newWebSocket);
    return () => newWebSocket.close();
  }, []);

  const sendMessage = (type: number, chat: string) => {
    webSocket?.send(
      writeMessage(auctionInfo.auctionSeq, type, chat, user, top)
    );
  };

  return (
    <Layout title="경매방" right={RightComponent}>
      <NoticeSection
        auction={auctionInfo}
        limit={limit}
        isSeller={userState === "seller"}
        top={top}
      />
      <ChatSection email={user.email} messages={messages} />
      <ActionForm onSend={sendMessage} />
    </Layout>
  );
}

const RightComponent = (
  <Button variant="contained" color="primary">
    LIVE
  </Button>
);

function writeMessage(
  auctionSeq: number,
  type: number,
  message: string,
  user: IUser,
  top: { topPrice: number; topBidder: string }
) {
  return JSON.stringify({
    type: type, // 0: open, 1: 일반채팅, 2: 경매 입찰, 3: close
    date: "",
    liveSeq: auctionSeq,
    message: message,
    nickname: user.nickname,
    userEmail: user.email,
    topPrice: top.topPrice,
    topBidder: top.topBidder,
  } as IMessage);
}
