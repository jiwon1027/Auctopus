import React from "react";
import Item from "./Item";
import styled from "styled-components";

const ItemList = styled.div`
  overflow-y: scroll;
  height: 88%;
  display: flex;
  flex-direction: column;
  padding-left: 1rem;
  padding-right: 1rem;

  &::-webkit-scrollbar {
    width: 0.2em;
  }
  &::-webkit-scrollbar-thumb {
    background-color: lightgrey;
    border-radius: 1em;
  }
`;

export default function ItemsList() {
  return (
    <>
      <div className=" h-12"> 필터</div>
      <ItemList>
        <Item />
      </ItemList>
    </>
  );
}
