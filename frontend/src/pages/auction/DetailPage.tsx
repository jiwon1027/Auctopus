import React, { useState, useEffect } from "react";
import DummyImg from "@/assets/main/airpodsImg.jpg";
import styled from "styled-components";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { styled as mstyled } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";
import Profile from "@/components/detail/Profile";
import Content from "@/components/detail/Content";
import ButtonBox from "@/components/detail/ButtonBox";
import Container from "@mui/material/Container";
import dayjs from "dayjs";
import { deleteAuctionLike, getAuction, postAuctionLike } from "@/api/auction";
import useAuth from "@/store/atoms/useAuth";

const initData: IAuctionDetail = {
  auctionSeq: 0,
  userEmail: "",
  category: 0,
  title: "",
  content: "",
  startTime: dayjs().toString(),
  startPrice: 0,
  likeCount: 0,
  isLiked: false,
  profileUrl: "",
  state: 0,
  nickname: "",
  bidUnit: 0,
  auctionImageList: [],
};

export default function DetailPage() {
  const [isLiked, setIsLiked] = useState(false);
  const [isBuyer, setIsBuyer] = useState(false);
  const [data, setData] = useState<IAuctionDetail>(initData);

  const { auctionSeq } = useParams();
  const { getUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuction = async () => {
      if (!auctionSeq) {
        navigate("/error");
        return;
      }

      const res = await getAuction(auctionSeq);
      if (res.status !== 200)
        return new Error("경매 정보를 가져오지 못했습니다");
      setData(res.data);
      const user = getUser();
      user.email === res.data.userEmail ? setIsBuyer(false) : setIsBuyer(true);
    };

    try {
      fetchAuction();
    } catch (error) {
      navigate("/error");
    }
  }, []);

  const movePrev = () => {
    navigate(-1);
  };
  const likeHandler = () => {
    if (!isLiked) {
      postAuctionLike(auctionSeq as string);
    } else {
      deleteAuctionLike(auctionSeq as string);
    }

    setIsLiked((prev) => !prev);
  };

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
