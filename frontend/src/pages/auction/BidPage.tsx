import React, { useEffect, useState } from "react";
import Layout from "@components/common/Layout";
import { Button } from "@mui/material";
import NoticeSection from "@components/bidding/NoticeSection";
import ChatSection from "@components/bidding/ChatSection";
import ActionFooter from "@components/bidding/ActionFooter";
import { IMessage } from "types/auction";
import { useLocation } from "react-router-dom";
import useAuth from "@/store/atoms/useAuth";
import WebSocket from "ws";

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

export default function BidPage() {
  const location = useLocation();
  const user = useAuth().getUser();
  const [webSocket, setWebSocket] = useState<WebSocket>();
  const [messages, setMessages] = useState<IMessage[]>([]);
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

    newWebSocket.onopen = (event) => {
      newWebSocket.send(
        "Here's some text that the server is urgently awaiting!"
      );
    };

    newWebSocket.onmessage = (event) => {
      setMessages((prev) => [...prev, JSON.parse(event.data as string)]);
    };

    setWebSocket(newWebSocket);
    return () => newWebSocket.close();
  }, []);

  // FIXME: type
  const sendMessage = (chat: string) => {
    webSocket?.send(
      JSON.stringify({
        type: 2,
        date: "",
        liveSeq: auctionInfo.auctionSeq,
        message: chat,
        nickname: user.nickname,
        userEmail: user.email,
      } as IMessage)
    );
  };

  return (
    <Layout title="경매방" right={RightComponent}>
      <NoticeSection
        auction={auctionInfo}
        limit={limit}
        isSeller={userState === "seller"}
      />
      <ChatSection email={user.email} messages={messages} />
      <ActionFooter onSend={sendMessage} />
    </Layout>
  );
}

const RightComponent = (
  <Button variant="contained" color="primary">
    LIVE
  </Button>
);
