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
    date: "",
    liveSeq: 1,
    message: "yop",
    nickname: "멋지",
    userEmail: "taw4654@gmail.com",
  },
  {
    type: 1,
    date: "",
    liveSeq: 1,
    message: "hello",
    nickname: "멋지",
    userEmail: "ssafy@ssafy.com",
  },
  {
    type: 1,
    date: "",
    liveSeq: 1,
    message: "hello",
    nickname: "멋지",
    userEmail: "ssafy@ssafy.com",
  },
  {
    type: 1,
    date: "",
    liveSeq: 1,
    message: "hello",
    nickname: "멋지",
    userEmail: "ssafy@ssafy.com",
  },
  {
    type: 1,
    date: "",
    liveSeq: 1,
    message: "hello",
    nickname: "멋지",
    userEmail: "ssafy@ssafy.com",
  },
];

export default function BidPage() {
  const location = useLocation();
  const user = useAuth().getUser();
  const [webSocket, setWebSocket] = useState<WebSocket>();
  const [messages, setMessages] = useState<IMessage[]>(initMessages);
  const { auctionInfo, userState, limit } = (location.state as {
    auctionInfo: IAuctionDetail;
    userState: string;
    limit?: number;
  }) || { auctionInfo: initAuctionInfo, userState: "seller", limit: 1000 };
  console.log("auctioninfo", auctionInfo);

  useEffect(() => {
    const newWebSocket = new WebSocket(
      `${import.meta.env.VITE_WEBSOCKET_DOMAIN}/live/${auctionInfo.auctionSeq}`
    );

    newWebSocket.onopen = () => {
      newWebSocket.send(
        writeMessage(
          auctionInfo.auctionSeq,
          1,
          "Here's some text that the server is urgently awaiting!",
          user
        )
      );
    };

    newWebSocket.onmessage = (event) => {
      // console.log("event: ", event.data);
      setMessages((prev) => [...prev, JSON.parse(event.data as string)]);
    };

    setWebSocket(newWebSocket);
    return () => newWebSocket.close();
  }, []);

  const sendMessage = (type: number, chat: string) => {
    webSocket?.send(writeMessage(auctionInfo.auctionSeq, type, chat, user));
  };

  return (
    <Layout title="경매방" right={RightComponent}>
      <NoticeSection
        auction={auctionInfo}
        limit={limit}
        isSeller={userState === "seller"}
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
  user: IUser
) {
  return JSON.stringify({
    type: type, // 1: 일반채팅, 2: 경매 입찰
    date: "",
    liveSeq: auctionSeq,
    message: message,
    nickname: user.nickname,
    userEmail: user.email,
  } as IMessage);
}
