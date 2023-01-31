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
      {liveAuction.map((item: IAuction, index: number) =>
        isLive ? (
          <LiveItem key={index} item={item} />
        ) : (
          <NonLiveItem key={index} item={item} />
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
    width: 0.32em;
  }
  &::-webkit-scrollbar-thumb {
    background-color: lightgrey;
    border-radius: 1.6em;
  }
`;
