import React from "react";
import Layout from "@components/common/Layout";
import { Button } from "@mui/material";
import NoticeSection from "@components/bidding/NoticeSection";
import ChatSection from "@components/bidding/ChatSection";
import ActionFooter from "@components/bidding/ActionFooter";

const RightComponent = (
  <Button variant="contained" color="primary">
    LIVE
  </Button>
);

export default function BiddingPage() {
  return (
    <Layout right={RightComponent}>
      <NoticeSection />
      <ChatSection />
      <ActionFooter />
    </Layout>
  );
}
