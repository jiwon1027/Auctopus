import React from "react";
import styled from "styled-components";
import airpods from "@/assets/autobid/airpodsMax.png";

interface IProps {
  auction: IAuctionDetail;
  isAutoBuyer: boolean;
  limit?: number;
  top: { topPrice: number; topBidder: string };
}

export default function NoticeSection(props: IProps) {
  return (
    <StyledNotice>
      <img src={airpods} width={95} height={95} />
      <div className="notice">
        <div className="notice__title">{props.auction.title}</div>
        <div className="notice__state">
          <div>시작가 {props.auction.startPrice}원</div>
          <div>입찰 단위 {props.auction.bidUnit}원</div>
          {props.isAutoBuyer && <div>나의 최대가 {props.limit}원</div>}
          {props.top.topPrice > 0 && (
            <div>
              현재 {props.top.topBidder} 님의 입찰 가격 {props.top.topPrice}
            </div>
          )}
        </div>
      </div>
    </StyledNotice>
  );
}

const StyledNotice = styled.section`
  background-color: #f5f5f5;
  border-radius: 15px;
  padding: 1rem;
  display: flex;

  img {
    border-radius: 15px;
  }

  .notice {
    width: 100%;
    margin-left: 1rem;
  }

  .notice__title {
    font-weight: bold;
    font-size: 2rem;
  }
  .notice__state {
    margin-top: 1rem;
    div {
      font-size: 1.4rem;
    }
  }
`;
