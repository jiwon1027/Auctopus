import React, { useState, useEffect } from "react";
import DummyImg from "@/assets/detail/dummy.svg";
import styled from "styled-components";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { styled as mstyled } from "@mui/material/styles";
import { Link, useParams } from "react-router-dom";
import Profile from "@/components/detail/Profile";
import Content from "@/components/detail/Content";
import ButtonBox from "@/components/detail/ButtonBox";
import axios from "axios";

// type auctionParams = {
//   auctionSeq: number;
// };

const dummyObject = {
  auctionSeq: 1,
  userEmail: "bbbnndd",
  categorySeq: 1,
  title: "더미",
  content: "팔아요",
  startTime: "2023-02-02 12:12:12",
  startPrice: 200000,
  link: "dfdfdfdf",
  likeCount: 20000,
  state: 0,
};

export default function DetailPage() {
  const VITE_SERVER_DOMAIN = import.meta.env.VITE_SERVER_DOMAIN;
  const [isLiked, setIsLiked] = useState(false);
  const [data, setData] = useState<IAuctionInfo>(dummyObject);
  const likeHandler = (event: React.MouseEvent<unknown>) => {
    setIsLiked((prev) => !prev);
  };

  useEffect(() => {
    axios.get(`${VITE_SERVER_DOMAIN}/api/auction/1`).then((res) => {
      const resData = res.data;
      setData(resData);
    });
  }, []);
  const dummy = {
    isBuyer: true,
    isLiked: false,
  };

  return (
    <Container>
      <ImgBox>
        <Link to={"/"}>
          <CustomizeIcon />
        </Link>
        <img src={DummyImg} alt="dummy-img" />
      </ImgBox>
      <Profile isLiked={isLiked} auctionInfo={data} likeHandler={likeHandler} />
      <Content auctionInfo={data} />
      <ButtonBox isBuyer={dummy.isBuyer} auctionInfo={data} />
    </Container>
  );
}

const CustomizeIcon = mstyled(ArrowBackIosIcon)`
  width: 3rem;
  height: 3rem;
  color: white;
  position: absolute;
  margin-top: 1.5rem;
  margin-left: 1.9rem;
`;

const Container = styled.div`
  background-color: white;
  margin-left: auto;
  margin-right: auto;
  width: 390px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
`;

const ImgBox = styled.div`
  height: 45%;
  overflow: hidden;
`;
