import React, { useCallback, useEffect, useState } from "react";
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

export default function BidPage() {
  const location = useLocation();
  const user = useAuth().getUser();

  const { auctionInfo, userState, limit } = (location.state as {
    auctionInfo: IAuctionDetail;
    userState: string;
    limit?: number;
  }) || { auctionInfo: initAuctionInfo, userState: "seller", limit: 1000 };
  const [webSocket, setWebSocket] = useState<WebSocket>();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [top, setTop] = useState({
    topPrice: 0,
    topBidder: "",
  });

  useEffect(() => {
    const newWebSocket = new WebSocket(
      `${import.meta.env.VITE_WEBSOCKET_DOMAIN}/live/${auctionInfo.auctionSeq}`
    );

    const writeMessage = messageCreator(user, top);
    newWebSocket.onopen = () => {
      newWebSocket.send(
        writeMessage(0, `${user.nickname} 님이 입장하셨습니다`)
      );
    };

    newWebSocket.onmessage = (event) => {
      const msg: IMessage = JSON.parse(event.data as string);
      if (top.topPrice < msg.topPrice) {
        setTop({ topPrice: msg.topPrice, topBidder: msg.topBidder });
      }
      setMessages((prev) => [...prev, msg]);
    };

    newWebSocket.onclose = () => {
      newWebSocket.send(writeMessage(0, `${user.nickname} 님이 나가셨습니다`));
    };

    setWebSocket(newWebSocket);
    return () => newWebSocket.close();
  }, []);

  const sendMessage = useCallback(
    (type: number, chat: string) => {
      const writeMessage = messageCreator(user, top);
      webSocket?.send(writeMessage(type, chat));
    },
    [user, top]
  );

  return (
    <Layout title="경매방" right={RightComponent}>
      <NoticeSection
        auction={auctionInfo}
        limit={limit}
        isAutoBuyer={userState === "auto"}
        top={top}
      />
      <ChatSection email={user.email} messages={messages} />
      <ActionForm auctionInfo={auctionInfo} top={top} onSend={sendMessage} />
    </Layout>
  );
}

const RightComponent = (
  <Button variant="contained" color="primary">
    LIVE
  </Button>
);

function messageCreator(
  user: IUser,
  top: { topPrice: number; topBidder: string }
) {
  return (type: number, message: string) => {
    const msg: IMessage = {
      type: type, // 0: server says, 1: 일반채팅, 2: 경매 입찰
      date: "",
      message: message, // "1000"
      nickname: user.nickname,
      userEmail: user.email,
      topPrice: top.topPrice,
      topBidder: top.topBidder,
    };
    return JSON.stringify(msg);
  };
}
