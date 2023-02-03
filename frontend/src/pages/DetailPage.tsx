import React, { useState, useEffect } from "react";
import DummyImg from "@/assets/main/airpodsImg.jpg";
import styled from "styled-components";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { styled as mstyled } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";
import Profile from "@/components/detail/Profile";
import Content from "@/components/detail/Content";
import ButtonBox from "@/components/detail/ButtonBox";
import axios from "axios";
import Container from "@mui/material/Container";
import dayjs from "dayjs";

const initData = {
  auctionSeq: 0,
  userEmail: "",
  categorySeq: 0,
  title: "",
  content: "",
  startTime: dayjs().toString(),
  startPrice: 0,
  link: "",
  likeCount: 0,
  state: 0,
  profileUrl: "",
  nickname: "",
};

const initUserData = {
  nickname: "",
  email: "",
  profileUrl: "",
};

export default function DetailPage() {
  const VITE_SERVER_DOMAIN = import.meta.env.VITE_SERVER_DOMAIN;
  const [isLiked, setIsLiked] = useState(false);
  const [isBuyer, setIsBuyer] = useState(false);
  const [data, setData] = useState<IAuctionInfo>(initData);
  const [userData, setUserData] = useState<IUserData>(initUserData);

  const likeHandler = () => {
    setIsLiked((prev) => !prev);
  };
  const { auctionSeq } = useParams();
  const navigate = useNavigate();
  const movePrev = () => {
    navigate(-1);
  };

  useEffect(() => {
    axios.get(`${VITE_SERVER_DOMAIN}/api/auction/${auctionSeq}`).then((res) => {
      const resData = res.data;
      setData(resData);
      console.log(resData);
      const user = JSON.parse(localStorage.getItem("user") || "");
      setUserData(user);
      console.log(user);
      user.email === resData.userEmail ? setIsBuyer(true) : setIsBuyer(false);
    });

    console.log(auctionSeq);
  }, []);

  return (
    <CustomContainer disableGutters={true}>
      <ImgBox>
        <CustomizeIcon onClick={movePrev} />
        <img src={DummyImg} alt="dummy-img" />
      </ImgBox>
      <Profile isLiked={isLiked} auctionInfo={data} likeHandler={likeHandler} />
      <Content auctionInfo={data} />
      <ButtonBox isBuyer={isBuyer} auctionInfo={data} />
    </CustomContainer>
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

const CustomContainer = mstyled(Container)`
  background-color: white;
  margin-left: auto;
  margin-right: auto;
  height: 100vh;
  display: flex;
  flex:1;
  flex-direction: column;
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const ImgBox = styled.div`
  height: 45%;
  overflow: hidden;
`;
