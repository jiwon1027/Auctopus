import React from "react";
import ActionForm from "@components/bidding/ActionForm";
import ChatSection from "@components/bidding/ChatSection";
import Layout from "@components/common/Layout";
import useChat from "@/hooks/useChat";
import useAuth from "@/store/atoms/useAuth";
import { useLocation } from "react-router-dom";

const RightComponent = <div></div>;
export default function Chat1To1Page() {
  const location = useLocation();
  const { top: initTop, auctionInfo } = location.state;
  // console.log(navData);
  const user = useAuth().getUser();
  // FIXME: uri
  const { top, messages, sendMessage } = useChat(
    `${import.meta.env.VITE_WEBSOCKET_DOMAIN}/live/${auctionInfo.auctionSeq}`,
    user,
    initTop
  );

  return (
    <Layout title="약속방" right={RightComponent}>
      <ChatSection email={user.email} messages={messages} />
      <ActionForm
        ableToBid={false}
        auctionInfo={auctionInfo}
        top={top}
        onSend={sendMessage}
      />
    </Layout>
  );
}
