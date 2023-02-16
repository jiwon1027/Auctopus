import { useEffect, useState } from "react";
import WebSocket from "isomorphic-ws";
import { IMessage, ITop } from "types/auction";
import { IUser } from "types/auth";

export default function useChat(
  uri: string,
  user: IUser,
  initTop: ITop,
  closeHandler: () => void
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

    setWebSocket(newWebSocket);
    return () => newWebSocket.close();
  }, []);

  useEffect(() => {
    console.log("top changed: ", top);
    if (!webSocket) return;
    webSocket.onmessage = (event) => {
      const msg: IMessage = JSON.parse(event.data as string);
      if (top.topPrice < msg.topPrice) {
        setTop({
          topPrice: msg.topPrice,
          topEmail: msg.topEmail,
          topNickname: msg.topNickname,
        });
      }
      setMessages((prev) => [...prev, msg]);
    };

    webSocket.onclose = () => {
      // newWebSocket.send(writeMessage(0, `${user.nickname} 님이 나가셨습니다`));
      console.log("경매 종료했을때 콜백");
      closeHandler();
    };
  }, [top]);

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

function messageCreator(user: IUser, top: ITop) {
  return (type: number, message: string) => {
    const msg: IMessage = {
      type: type, // 0: server says, 1: 일반채팅, 2: 경매 입찰, 3: 종료
      date: "",
      message: message, // "1000"
      nickname: user.nickname,
      userEmail: user.email,
      topPrice: top.topPrice,
      topEmail: top.topEmail,
      topNickname: top.topNickname,
    };
    return JSON.stringify(msg);
  };
}
