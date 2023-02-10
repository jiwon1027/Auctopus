import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client/dist/sockjs";
import Stomp, { Client } from "stompjs";
import Layout from "@components/common/Layout";
import { Button } from "@mui/material";
import NoticeSection from "@components/bidding/NoticeSection";
import ChatSection from "@components/bidding/ChatSection";
import ActionFooter from "@components/bidding/ActionFooter";
import { IMessage } from "types/auction";
import { useLocation } from "react-router-dom";
import useAuth from "@/store/atoms/useAuth";

export default function BidPage() {
  const location = useLocation();
  const user = useAuth().getUser();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [client, setClient] = useState<Client>();
  const { auctionInfo, userState, limit } = location.state as {
    auctionInfo: IAuctionDetail;
    userState: string;
    limit: number;
  };

  useEffect(() => {
    const socket = new SockJS("http://localhost:8081/api/ws-stomp");
    const newClient = Stomp.over(socket);
    setClient(newClient);
    newClient.debug = (...args: string[]) => {
      console.log(args);
    };
    newClient.connect({}, () => {
      newClient.subscribe(
        "/sub/chat/room/" + auctionInfo.auctionSeq,
        function (message) {
          // FIXME: messagedto
          const messagedto = JSON.parse(message.body);
          console.log(
            auctionInfo.auctionSeq === messagedto.roomId,
            auctionInfo.auctionSeq,
            messagedto.roomId
          );
          if (auctionInfo.auctionSeq === messagedto.roomId) {
            setMessages((prev) => [...prev, messagedto]);
          }
        },
        (err: Error) => {
          console.log(err);
        }
      );
    });
    return () => {
      /**
       * 1. 판매자가 나간 경우, 서버에 말하고 모든 이들에게 메시지 남기고 모든 경매를 중지
       * 2. 구매자가 나간 경우, 서버에 말하고 메시지 남기고 중지
       */
      newClient.disconnect(() => {
        if (userState === "seller") {
          sendMessage("E10");
        } else {
          sendMessage("E20");
        }
      });
    };
  }, [auctionInfo.auctionSeq]);

  // FIXME: type
  const sendMessage = (chat: string) => {
    const msg: IMessage = {
      type: 2,
      date: "",
      liveSeq: auctionInfo.auctionSeq,
      message: chat,
      nickname: user.nickname,
      userEmail: user.email,
    };
    client?.send(`/pub/chat/message`, {}, JSON.stringify(msg));
  };

  return (
    <Layout title="언해피의 경매" right={RightComponent}>
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
