import React from "react";
import Layout from "@components/common/Layout";
import { Box, Button, Divider, Modal, Typography } from "@mui/material";
import NoticeSection from "@components/bidding/NoticeSection";
import ChatSection from "@components/bidding/ChatSection";
import ActionForm from "@components/bidding/ActionForm";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "@/store/atoms/useAuth";
import useChat from "@/hooks/useChat";

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

const initTop = {
  topEmail: "",
  topPrice: 0,
  topNickname: "",
};

const style = {
  position: "absolute", // as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  height: 200,
  bgcolor: "background.paper",
  border: "1px solid #386641",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  // alignItems: "center",
};

const RightComponent = (props: { isSeller: boolean; onClick: () => void }) => (
  <Button variant="contained" color="primary" onClick={props.onClick}>
    {props.isSeller ? "종료하기" : "나가기"}
  </Button>
);

export default function BidPage() {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const user = useAuth().getUser();

  const { auctionInfo, userState, limit } = (location.state as {
    auctionInfo: IAuctionDetail;
    userState: string;
    limit?: number;
  }) || { auctionInfo: initAuctionInfo, userState: "seller", limit: 1000 };

  const { top, messages, sendMessage } = useChat(
    `${import.meta.env.VITE_WEBSOCKET_DOMAIN}/live/${auctionInfo.auctionSeq}`,
    user,
    initTop,
    closeHandler
  );

  function closeHandler() {
    alert(
      "경매를 종료합니다 " + top.topEmail + ";" + user.email + ";" + userState
    );
    if (userState === "seller" || user.email === top.topEmail) {
      navigate(`/chat/${auctionInfo.auctionSeq}`, {
        state: {
          top,
          auctionInfo,
        },
        replace: true,
      });
      return;
    }
    navigate("/main", { replace: true });
  }

  function closeAuction() {
    if (userState === "seller") {
      sendMessage(
        3,
        `판매자가 경매를 종료하였습니다: 최종 낙찰자 ${top.topNickname} ${top.topPrice} 에 낙찰했습니다`
      );
      return;
    }

    sendMessage(3, `${user.nickname} 님이 나가셨습니다`);
  }

  function toggleModal() {
    setOpen((prev) => !prev);
  }

  return (
    <Layout
      back
      title="경매방"
      right={
        <RightComponent
          isSeller={userState === "seller"}
          onClick={toggleModal}
        />
      }
    >
      <NoticeSection
        auction={auctionInfo}
        limit={limit}
        isAutoBuyer={userState === "auto"}
        top={top}
      />
      <ChatSection email={user.email} messages={messages} />
      <ActionForm
        ableToBid={userState !== "seller"}
        auctionInfo={auctionInfo}
        top={top}
        onSend={sendMessage}
      />
      <Modal
        open={open}
        onClose={toggleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            {userState === "seller"
              ? "판매를 종료하시겠습니까?"
              : "나가시겠습니까?"}
          </Typography>
          <Divider />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            최종 낙찰자{" "}
            <Box component="span" sx={{ fontWeight: "bold", color: "#386641" }}>
              {top.topNickname}
            </Box>
            가{" "}
            <Box component="span" sx={{ fontWeight: "bold", color: "#386641" }}>
              {top.topPrice}
            </Box>
            에 낙찰했습니다
          </Typography>
          <Button variant="outlined" color="primary" onClick={closeAuction}>
            확인
          </Button>
        </Box>
      </Modal>
    </Layout>
  );
}
