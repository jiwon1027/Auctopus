import ImageUpload from "@components/auctionCreate/ImageUpload";
import Layout from "@components/common/Layout";
import React, { useState, useEffect } from "react";
import Content from "@components/auctionCreate/Content";
import { Button } from "@mui/material";
import Calendar from "@components/auctionCreate/Calendar";
import { createAuction } from "@/api/auction";
const initObj: IAuctionCreate = {
  userEmail: " ",
  categorySeq: "",
  title: "",
  content: "",
  startTime: "",
  startPrice: 0,
};
export default function AuctionCreate() {
  const [data, setData] = useState<IAuctionCreate>(initObj);
  // const ref = React.createRef();

  useEffect(() => {
    console.log("data: ", data);
  }, [data]);

  const handleChange = (name: string, value: string) => {
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(data);
    createAuction(data);
  };

  return (
    <Layout leftIcon="none">
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
