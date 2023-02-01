import ImageUpload from "@components/auctionCreate/ImageUpload";
import Layout from "@components/common/Layout";
import React from "react";
import Content from "@components/auctionCreate/Content";
import styled from "styled-components";
import Calendar from "@components/auctionCreate/Calendar";
export default function AuctionCreate() {
  return (
    <Layout leftIcon="none">
      <ImageUpload />
      <Content />
      <Calendar />
    </Layout>
  );
}
