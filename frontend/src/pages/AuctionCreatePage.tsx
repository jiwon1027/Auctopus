import ImageUpload from "@components/auctionCreate/ImageUpload";
import Layout from "@components/common/Layout";
import React, { useState } from "react";
import Content from "@components/auctionCreate/Content";
import { Button } from "@mui/material";
import Calendar from "@components/auctionCreate/Calendar";
import { createAuction } from "@/api/auction";
import dayjs from "dayjs";
const initObj: IAuctionCreate = {
  userEmail: " ",
  categorySeq: "",
  title: "",
  content: "",
  startTime: dayjs().toString(),
  startPrice: 0,
};
export default function AuctionCreate() {
  const [data, setData] = useState<IAuctionCreate>(initObj);

  const handleChange = (name: string, value: string) => {
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!data.title) {
      return alert("제목을 입력해주세요");
    }
    if (!data.categorySeq) {
      return alert("카테고리를 선택해주세요");
    }
    if (isNaN(data.startPrice) || data.startPrice == 0) {
      return alert("숫자를 입력해주세요");
    }
    if (!data.content) {
      return alert("내용을 입력해주세요");
    }
    if (!data.startTime) {
      return alert("경매 시작 날짜를 선택해주세요");
    }
    createAuction(data);
  };

  return (
    <Layout>
      <ImageUpload />
      <Content
        data={data}
        onChange={(name: string, value: string) => handleChange(name, value)}
      />
      <Calendar
        data={data}
        onChange={(name: string, value: string) => handleChange(name, value)}
      />
      <Button onClick={submitHandler}>등록해라 좋은말할때</Button>
    </Layout>
  );
}
