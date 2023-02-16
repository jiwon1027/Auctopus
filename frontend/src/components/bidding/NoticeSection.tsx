import React from "react";
import styled from "styled-components";
import { ITop } from "types/auction";

interface IProps {
  auction: IAuctionDetail;
  isAutoBuyer: boolean;
  limit?: number;
  top: ITop;
}

export default function NoticeSection(props: IProps) {
  return (
    <StyledNotice>
      <img
        src={props.auction.auctionImageList[0].imageUrl}
        width={95}
        height={95}
      />
      <div className="notice">
        <div className="notice__title">{props.auction.title}</div>
        <div className="notice__state">
          <div>
            시작가{" "}
            <b>
              {props.auction.startPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </b>
            원
          </div>
          <div>
            입찰 단위{" "}
            <b>
              {props.auction.bidUnit
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </b>
            원
          </div>
          {props.isAutoBuyer && (
            <div>
              나의 최대가{" "}
              <b>
                {props.limit &&
                  props.limit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </b>
              원
            </div>
          )}
          {props.top.topPrice > 0 && (
            <div>
              현재 {props.top.topNickname} 님의 입찰 가격{" "}
              <b>
                {props.top.topPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </b>
              원
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
