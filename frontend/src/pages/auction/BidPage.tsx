import React, { useEffect, useState } from "react";
// import SockJs from "sockjs-client/dist/sockjs";
import { Client } from "@stomp/stompjs";
import Layout from "@components/common/Layout";
import { Button } from "@mui/material";
import NoticeSection from "@components/bidding/NoticeSection";
import ChatSection from "@components/bidding/ChatSection";
import ActionFooter from "@components/bidding/ActionFooter";
import { IMessage } from "types/auction";
import { useLocation } from "react-router-dom";
import useAuth from "@/store/atoms/useAuth";
import WebSocket from "isomorphic-ws";
const global = globalThis;
Object.assign(global, { WebSocket });

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
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [client, setClient] = useState<Client>();
  const { auctionInfo, userState, limit } = (location.state as {
    auctionInfo: IAuctionDetail;
    userState: string;
    limit?: number;
  }) || { auctionInfo: initAuctionInfo, userState: "seller", limit: 1000 };
  console.log("auctioninfo", auctionInfo);

  useEffect(() => {
    const newClient = new Client({
      brokerURL: "ws://localhost:8081/api/ws-stomp",
      onConnect: () => {
        newClient.subscribe(
          "/bid/room/" + auctionInfo.auctionSeq,
          (message) => {
            console.log(`Received: ${message.body}`);
            // const msg = JSON.parse(message.body);
            // setMessages((prev) => [...prev, message]);
          }
        );
        newClient.publish({
          destination: "/bid/room/" + auctionInfo.auctionSeq,
          body: "First Message",
        });
      },
    });
    newClient.activate();
    setClient(newClient);

    return () => {
      newClient.deactivate();
    };
  }, []);

  // useEffect(() => {
  //   const socket = new SockJS("http://localhost:8081/api/ws-stomp");
  //   const newClient = Stomp.over(socket);
  //   setClient(newClient);
  //   newClient.debug = (...args: string[]) => {
  //     console.log(args);
  //   };
  //   newClient.connect({}, () => {
  //     newClient.subscribe(
  //       "/sub/chat/room/" + auctionInfo.auctionSeq,
  //       function (message: Stomp.Message) {
  //         // FIXME: messagedto
  //         const messagedto = JSON.parse(message.body);
  //         console.log(
  //           auctionInfo.auctionSeq === messagedto.roomId,
  //           auctionInfo.auctionSeq,
  //           messagedto.roomId
  //         );
  //         if (auctionInfo.auctionSeq === messagedto.roomId) {
  //           setMessages((prev) => [...prev, messagedto]);
  //         }
  //       },
  //       (err: Error) => {
  //         console.log(err);
  //       }
  //     );
  //   });
  //   return () => {
  //     /**
  //      * 1. 판매자가 나간 경우, 서버에 말하고 모든 이들에게 메시지 남기고 모든 경매를 중지
  //      * 2. 구매자가 나간 경우, 서버에 말하고 메시지 남기고 중지
  //      */
  //     newClient.disconnect(() => {
  //       if (userState === "seller") {
  //         sendMessage("E10");
  //       } else {
  //         sendMessage("E20");
  //       }
  //     });
  //   };
  // }, [auctionInfo.auctionSeq]);

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
    // client?.send(`/pub/chat/message`, {}, JSON.stringify(msg));
    // client?.publish({ destination: "/pub/chat/message" });
    client?.publish({
      destination: "/bid/room/" + auctionInfo.auctionSeq,
      body: JSON.stringify(msg),
    });
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
