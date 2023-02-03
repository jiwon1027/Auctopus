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

interface IUserData {
  name: string;
  email: string;
  profileUrl?: string;
}

const initUserData = {
  name: "",
  email: "",
  profileUrl: "",
};

export default function DetailPage() {
  const VITE_SERVER_DOMAIN = import.meta.env.VITE_SERVER_DOMAIN;
  const [isLiked, setIsLiked] = useState(false);
  const [isBuyer, setIsBuyer] = useState(false);
  const [data, setData] = useState<IAuctionInfo>(dummyObject);
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
      const user = JSON.parse(localStorage.getItem("user") || "");
      setUserData(user);
      user.email === resData.userEmail ? setIsBuyer(true) : setIsBuyer(false);
    });

    console.log(auctionSeq);
  }, []);

  return (
    <Container>
      <ImgBox>
        <CustomizeIcon onClick={movePrev} />
        <img src={DummyImg} alt="dummy-img" />
      </ImgBox>
      <Profile
        isLiked={isLiked}
        auctionInfo={data}
        userInfo={userData}
        likeHandler={likeHandler}
      />
      <Content auctionInfo={data} />
      <ButtonBox isBuyer={isBuyer} auctionInfo={data} />
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
