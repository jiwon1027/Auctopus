import React, { useState } from "react";
import Item from "./Item";
import LiveFilter from "@components/main/LiveFilter";
import styled from "styled-components";
import MainToggleButtonGroup from "@components/main/MainToggleButtonGroup";

export default function ItemsList() {
  const [isLive, setIsLive] = useState(true);
  return (
    <>
      <MainToggleButtonGroup />
      <LiveFilter live={isLive} />
      <ItemList>
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </ItemList>
    </>
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
