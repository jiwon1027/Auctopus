import React from "react";
import LiveItem from "../main/LiveItem";
import NonLiveItem from "../main/NonLiveItem";
import styled from "styled-components";

interface IProps {
  isLive: boolean;
  liveAuction: IAuction[];
}

export default function ItemsList({ isLive, liveAuction }: IProps) {
  return (
    <ItemList>
      {/* 검색결과 없을시, 출력 */}
      {liveAuction.length === 0 ? (
        <NoResult>이런! 검색결과가 없읍니다.</NoResult>
      ) : (
        liveAuction.map((item: IAuction, index: number) =>
          isLive ? (
            <LiveItem key={index} item={item} />
          ) : (
            <NonLiveItem key={index} item={item} />
          )
        )
      )}
    </ItemList>
  );
}

const ItemList = styled.div`
  flex: 1;
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    display: none;
    width: 0.3rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: lightgrey;
    border-radius: 1.6em;
  }
`;

const NoResult = styled.h1`
  flex: 1;
  text-align: center;
  padding-top: 20rem;
`;
