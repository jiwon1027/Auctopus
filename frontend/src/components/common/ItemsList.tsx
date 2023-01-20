import React from "react";
import Item from "./Item";
import MainSelect from "@components/main/MainSelect";
import MainToggleButtonGroup from "@components/main/MainToggleButtonGroup";
import styled from "styled-components";

export default function ItemsList() {
  return (
    <>
      {/* <MainSelect /> */}
      <MainToggleButtonGroup />
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
  padding-left: 1.6rem;
  padding-right: 1.6rem;

  &::-webkit-scrollbar {
    width: 0.32em;
  }
  &::-webkit-scrollbar-thumb {
    background-color: lightgrey;
    border-radius: 1.6em;
  }
`;
