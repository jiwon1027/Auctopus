import React, { useEffect, useState } from "react";
import * as SockJS from "sockjs-client";
import Stomp, { Client } from "stompjs";
import Layout from "@components/common/Layout";
import { Button } from "@mui/material";
import NoticeSection from "@components/bidding/NoticeSection";
import ChatSection from "@components/bidding/ChatSection";
import ActionFooter from "@components/bidding/ActionFooter";
import { IMessage } from "types/auction";
import { useParams } from "react-router-dom";
import useAuth from "@/store/atoms/useAuth";

const item = {
  name: "Airpods Max 스페이스",
  price: 10000,
};

const seller = {
  name: "또치",
  startPrice: 3000,
};

const bidder = {
  name: "정개미",
  price: 5000,
};

export default function BidPage() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { roomId } = useParams();
  const [client, setClient] = useState<Client>();
  const user = useAuth().getUser();
  // useEffect(() => {
  //   async function fetchMessages() {
  //     const body = { roomId };
  //     try {
  //       // TODO: const response = await fetchData.post(socketApis.CHAT_HISTORY, body);
  //       setChatList(response.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }

  //   fetchMessages();
  // }, [roomId]);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8081/api/ws-stomp");
    const newClient = Stomp.over(socket);
    setClient(newClient);
    newClient.debug = (...args: string[]) => {
      console.log(args);
    };
    newClient.connect({}, () => {
      newClient.subscribe(
        "/sub/chat/room/" + roomId,
        function (message) {
          const messagedto = JSON.parse(message.body);
          console.log(roomId === messagedto.roomId, roomId, messagedto.roomId);
          if (roomId === messagedto.roomId) {
            setMessages((prev) => [...prev, messagedto]);
          }
        },
        (err: Error) => {
          console.log(err);
        }
      );
    });
    return () => {
      newClient.disconnect(() => {
        /**
         * 1. 판매자가 나간 경우, 서버에 말하고 모든 이들에게 메시지 남기고 모든 경매를 중지
         * 2. 구매자가 나간 경우, 서버에 말하고 메시지 남기고 중지
         */
      });
    };
  }, [roomId]);

  // FIXME: liveSeq from useParams()
  const sendMessage = (chat: string) => {
    const msg: IMessage = {
      type: 2,
      date: "",
      liveSeq: -1,
      message: chat,
      nickname: user.nickname,
      userEmail: user.email,
    };
    client?.send(`/pub/chat/message`, {}, JSON.stringify(msg));
  };

  return (
    <Layout title="언해피의 경매" right={RightComponent}>
      <NoticeSection item={item} bidder={bidder} seller={seller} />
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
