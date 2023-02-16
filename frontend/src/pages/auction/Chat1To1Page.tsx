import React from "react";
import ActionForm from "@components/bidding/ActionForm";
import ChatSection from "@components/bidding/ChatSection";
import Layout from "@components/common/Layout";
import useChat from "@/hooks/useChat";
import useAuth from "@/store/atoms/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const RightComponent = (props: { onClick: () => void }) => (
  <Button variant="contained" color="primary" onClick={props.onClick}>
    종료하기
  </Button>
);
export default function Chat1To1Page() {
  const location = useLocation();
  const navigate = useNavigate();
  const { top: initTop, auctionInfo } = location.state;
  const user = useAuth().getUser();
  const { top, messages, sendMessage } = useChat(
    `${import.meta.env.VITE_WEBSOCKET_DOMAIN}/chat/${auctionInfo.auctionSeq}`,
    user,
    closeHandler,
    initTop
  );

  function closeHandler() {
    navigate("/auctionComplete", { replace: true });
  }

  /** 판매자만이 경매를 종료할 수 있다 */
  function requestToCloseAuction() {
    if (user.email === top.topEmail) {
      alert("판매자가 종료하기 전까진 나갈 수 없습니다");
      return;
    }
    sendMessage(3, `판매자가 종료하였습니다`);
  }

  return (
    <Layout
      back
      title="약속방"
      right={<RightComponent onClick={requestToCloseAuction} />}
    >
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
