import ImageUpload from "@components/auctionCreate/ImageUpload";
import Layout from "@components/common/Layout";
import React, { useState } from "react";
import Content from "@components/auctionCreate/Content";
import { Button } from "@mui/material";
import Calendar from "@components/auctionCreate/Calendar";
import { createAuction } from "@/api/auction";
import dayjs from "dayjs";

const initObj: IAuctionCreate = {
  categorySeq: "",
  title: "",
  content: "",
  startTime: dayjs().toString(),
  startPrice: 0,
  bidUnit: 0,
};

interface IFile {
  dataURL: string;
  file: File;
}

export default function AuctionCreate() {
  const [data, setData] = useState<IAuctionCreate>(initObj);
  const [imgFileList, setImgFileList] = useState<IFile[]>([]);
  const token = localStorage.getItem("token") || " ";
  // data.userEmail = userL.email;
  const handleChange = (name: string, value: string | []) => {
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImgChange = (name: string, value: []) => {
    setImgFileList(value);
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

    const form = new FormData();
    form.append(
      "req",
      new Blob([JSON.stringify(data)], {
        type: "application/json",
      })
    );

    imgFileList?.map((item) => {
      form.append("images", item.file);
    });

    createAuction(form, token);
  };

  console.log(imgFileList);

  return (
    <Layout title="경매방 생성" back>
      <ImageUpload
        data={data}
        onChange={(name: string, value: []) => handleImgChange(name, value)}
      />
      <Content
        data={data}
        onChange={(name: string, value: string) => handleChange(name, value)}
      />
      <Calendar
        data={data}
        onChange={(name: string, value: string) => handleChange(name, value)}
      />
      <Button variant="contained" onClick={submitHandler} sx={{ marginTop: 3 }}>
        경매 등록하기
      </Button>
    </Layout>
  );
}
