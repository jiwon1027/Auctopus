import { useEffect, useState } from "react";
import WebSocket from "isomorphic-ws";
import { IMessage } from "types/auction";
import { IUser } from "types/auth";

// `${import.meta.env.VITE_WEBSOCKET_DOMAIN}/live/${auctionInfo.auctionSeq}`
export default function useChat(
  uri: string,
  user: IUser,
  initTop: { topPrice: number; topBidder: string }
) {
  const [webSocket, setWebSocket] = useState<WebSocket>();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [top, setTop] = useState(initTop);

  useEffect(() => {
    const newWebSocket = new WebSocket(uri);

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

  const sendMessage = (type: number, chat: string) => {
    const writeMessage = messageCreator(user, top);
    webSocket?.send(writeMessage(type, chat));
  };

  return {
    top,
    messages,
    sendMessage,
  };
}

function messageCreator(
  user: IUser,
  top: { topPrice: number; topBidder: string }
) {
  return (type: number, message: string) => {
    const msg: IMessage = {
      type: type, // 0: server says, 1: 일반채팅, 2: 경매 입찰, 3: 종료
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
