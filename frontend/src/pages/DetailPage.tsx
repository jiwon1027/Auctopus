import React, { useState } from "react";
import DummyImg from "@/assets/detail/dummy.svg";
import styled from "styled-components";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { styled as mstyled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import Profile from "@/components/detail/Profile";
import Content from "@/components/detail/Content";
import ButtonBox from "@/components/detail/ButtonBox";

export default function DetailPage() {
  const [isLiked, setIsLiked] = useState(false);
  const likeHandler = (event: React.MouseEvent<unknown>) => {
    setIsLiked((prev) => !prev);
  };
  const dummy = {
    isBuyer: true,
    isLiked: false,
    detailData: {
      auctionSeq: 1,
      // imageList: [],
      userSeq: 1,
      categorySeq: 1,
      title: "프라다 팔아여",
      content: "블라블라 와구와구",
      startTime: "2023-02-14 16:44:22",
      startPrice: 10000,
      likeCount: 147,
      isReady: 0,
    },
  };

  return (
    <Container>
      <ImgBox>
        <Link to={"/"}>
          <CustomizeIcon />
        </Link>
        <img src={DummyImg} alt="dummy-img" />
      </ImgBox>
      <Profile
        isLiked={isLiked}
        detailData={dummy.detailData}
        likeHandler={likeHandler}
      />
      <Content detailData={dummy.detailData} />
      <ButtonBox isBuyer={dummy.isBuyer} detailData={dummy.detailData} />
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
