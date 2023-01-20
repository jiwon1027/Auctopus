import React from "react";
import Item from "./Item";
import styled from "styled-components";

export default function ItemsList() {
  return (
    <>
      <div className=" h-12"> 필터</div>
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
  overflow-y: scroll;
  overflow-x: hidden;
  height: 88%;
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
