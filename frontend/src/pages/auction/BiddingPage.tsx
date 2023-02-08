import React from "react";
import Layout from "@components/common/Layout";
import { Button } from "@mui/material";
import NoticeSection from "@components/bidding/NoticeSection";
import ChatSection from "@components/bidding/ChatSection";
import ActionFooter from "@components/bidding/ActionFooter";

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

const RightComponent = (
  <Button variant="contained" color="primary">
    LIVE
  </Button>
);

export default function BiddingPage() {
  return (
    <Layout title="언해피의 경매" right={RightComponent}>
      <NoticeSection item={item} bidder={bidder} seller={seller} />
      <ChatSection />
      <ActionFooter />
    </Layout>
  );
}
