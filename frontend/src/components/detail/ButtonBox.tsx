import React, { useEffect, useState } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import { Button } from "@mui/material";
import Modal from "@/components/detail/Modal";
import { styled as mstyled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { openLive } from "@/api/auction";

interface IProps {
  isBuyer: boolean;
  auctionInfo: IAuctionDetail;
}

export default function ButtonBox({ isBuyer, auctionInfo }: IProps) {
  const navigate = useNavigate();
  const [onTime, setOnTime] = useState(false);
  const [remainingTime, setRemainingTime] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      setOnTime(isOnTime(auctionInfo.startTime));
      setRemainingTime(getRemainTime(auctionInfo.startTime));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // 라이브 시작 : 판매자
  const sendDataRouter = () => {
    openLive(auctionInfo.auctionSeq);
    navigate(`/live/${auctionInfo.auctionSeq}`, {
      state: {
        userState: "seller",
        auctionInfo: auctionInfo,
      },
    });
  };

  // 구매자 => 모달 => 수동입찰, 경매장 입장 눌렀을때 이동, common state랑 자동 입찰 단위 props전달
  return (
    <FooterBox>
      {isBuyer ? (
        <>
          <div className="timeBox">
            <div className="timephrase">
              <AccessTimeIcon color="disabled" sx={{ fontSize: 20 }} />
              <span>입찰 시작가</span>
            </div>
            <div className="timeLeft">
              {auctionInfo.startPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              원
            </div>
          </div>
          <ButtonWrapper>
            {onTime ? (
              <>
                <div className="time-left">{remainingTime}후 입장 가능</div>
                <DisableButton>입장하기</DisableButton>
              </>
            ) : (
              <Modal auctionInfo={auctionInfo} />
            )}
          </ButtonWrapper>
        </>
      ) : (
        <>
          <div className="timeBox">
            <div className="timephrase">
              <AccessTimeIcon color="disabled" sx={{ fontSize: 20 }} />
              <span>경매시작까지</span>
            </div>
            <div className="timeLeft">{remainingTime}</div>
          </div>
          <div className="buttonBox">
            <CustomizedButton
              onClick={() => sendDataRouter()}
              disabled={!onTime}
              color={!onTime ? "primary" : "secondary"}
            >
              라이브 시작
            </CustomizedButton>
          </div>
        </>
      )}
    </FooterBox>
  );
}
const revertKST = (time: string) => {
  const curr = new Date(time);
  const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  return utc + KR_TIME_DIFF;
};
function isOnTime(time: string) {
  console.log(time);
  console.log(revertKST(time));
  return new Date(revertKST(time)).getTime() - Date.now() <= 0;
}

function getRemainTime(time: string) {
  const masTime = new Date(revertKST(time)).getTime();
  const now = Date.now();
  let interval = Math.floor((masTime - now) / 1000);
  if (interval <= 0) {
    return "경매에 참여하세요!";
  } else {
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
    const dateD = date <= 0 ? 0 : remainDate.getDate();
    return dateD + "일" + " " + format;
  }
}
const ButtonWrapper = styled.div`
  /* padding-top: 0; */
  width: 50%;
  /* background-color: yellow; */
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
  width: 85%;
  margin: 0 auto;
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
    display: flex;
    flex-direction: column;
    margin: auto 0;
    margin-left: auto;
    color: ${theme.colors.greyDim};
    .time-left {
      flex-direction: column;
      font-size: 1.3rem;
      color: ${theme.colors.greyDark};
      margin-bottom: 0.5rem;
    }
  }
`;
const CustomizedButton = mstyled(Button)`
  border: solid 2px ${theme.colors.greyDim};
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
