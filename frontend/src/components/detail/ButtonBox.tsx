import React, { useState } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import { Button } from "@mui/material";
import Modal from "@/components/detail/Modal";
import { styled as mstyled } from "@mui/material/styles";

interface IProps {
  isBuyer: boolean;
  detailData: {
    auctionSeq: number;
    // imageList: FileList;
    userSeq: number;
    categorySeq: number;
    title: string;
    content: string;
    startTime: string;
    startPrice: number;
    likeCount: number;
    isReady: number;
  };
}
export default function ButtonBox({ isBuyer, detailData }: IProps) {
  const [isTime, setIsTime] = useState(true);

  // setOpen에 대한 로직 - 실시간 구현시 마저 구현

  function getRemainTime(time: string) {
    const masTime = new Date(time).getTime();
    const now = Date.now();
    let interval = Math.floor((masTime - now) / 1000);

    const date = Math.floor(interval / (24 * 60 * 60));
    interval -= date * 24 * 60 * 60;
    const hour = Math.floor(interval / (60 * 60));
    interval -= hour * 60 * 60;
    const min = Math.floor(interval / 60);
    const sec = Math.floor(interval - min * 60);

    const remainDate = new Date();
    remainDate.setDate(date);
    remainDate.setHours(hour);
    remainDate.setMinutes(min);
    remainDate.setSeconds(sec);
    const format = remainDate.toTimeString().split(" ")[0];
    return remainDate.getDate() + "일" + " " + format;
  }
  return isBuyer ? (
    <FooterBox>
      <div className="timeBox">
        <div className="timephrase">
          <AccessTimeIcon color="disabled" sx={{ fontSize: 20 }} />
          <span>입찰 시작가</span>
        </div>
        <div className="timeLeft">
          {detailData.startPrice
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          원
        </div>
      </div>
      <ButtonWrapper>
        {!isTime ? (
          <>
            <div className="time-left">
              {getRemainTime(detailData.startTime)}후 입장 가능
            </div>
            <DisableButton>입장하기</DisableButton>
          </>
        ) : (
          <Modal />
        )}
      </ButtonWrapper>
    </FooterBox>
  ) : (
    <FooterBox>
      <div className="timeBox">
        <div className="timephrase">
          <AccessTimeIcon color="disabled" sx={{ fontSize: 20 }} />
          <span>경매시작까지</span>
        </div>
        <div className="timeLeft">{getRemainTime(detailData.startTime)}</div>
      </div>
      <div className="buttonBox">
        <CustomizedButton>입장하기</CustomizedButton>
      </div>
    </FooterBox>
  );
}

const ButtonWrapper = styled.div`
  padding-top: 0;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .time-left {
    font-size: 1.3rem;
    color: ${theme.colors.greyDark};
    margin-bottom: 0.5rem;
  }
`;
const FooterBox = styled.div`
  height: 15%;
  border-top: 1px solid ${theme.colors.greyLight};
  padding: 2.5rem 2.7rem;
  display: flex;
  .timeBox {
    width: 55%;
    span {
      font-size: 1.2rem;
      margin-left: 0.6rem;
      margin-top: 0.2rem;
      color: ${theme.colors.greyStandard};
    }
    .timephrase {
      display: flex;
      align-items: center;
    }
    font-size: 2.5rem;
    font-weight: ${theme.fontWeight.bold};
    .timeLeft {
      margin-top: 1rem;
    }
  }
  .buttonBox {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .time-left {
      flex-direction: column;
      font-size: 1.3rem;
      color: ${theme.colors.greyDark};
      margin-bottom: 0.5rem;
    }
  }
`;
const CustomizedButton = mstyled(Button)`
  border: solid 2px ${theme.colors.turtleDark};
  font-size: 1.8rem;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.turtleDark};
  width: 12.1rem;
  height: 4.8rem;
  border-radius: 10;
`;

const DisableButton = mstyled(Button)`
border: solid 2px ${theme.colors.greyDim};
font-size: 1.8rem;
font-weight: ${theme.fontWeight.bold};
color: ${theme.colors.greyDim};
width: 12.1rem;
height: 4.8rem;
border-radius: 10;
`;
