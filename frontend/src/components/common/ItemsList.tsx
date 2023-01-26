import React, { useState } from "react";
import LiveItem from "../main/LiveItem";
import NonLiveItem from "../main/NonLiveItem";
import LiveFilter from "@components/main/LiveFilter";
import styled from "styled-components";
import MainToggleButtonGroup from "@components/main/MainToggleButtonGroup";
import Image1 from "@/assets/detail/dummy.svg";
import Image2 from "@/assets/main/airpodsImg.jpg";

export default function ItemsList() {
  const [isLive, setIsLive] = useState("live");

  const liveAuction = [
    {
      img: Image1,
      title: "구찌를 굳이?",
      price: 450000,
      viewer: 55,
      time: "2023-01-26 12:00",
    },
    {
      img: Image2,
      title: "에어팟 맥스",
      price: 410000,
      viewer: 15,
      time: "2023-01-26 12:05",
    },
  ];

  const changeisLive = (value: string) => {
    setIsLive(value);
  };
  return (
    <>
      <MainToggleButtonGroup func={changeisLive} />
      <LiveFilter live={isLive} />
      {isLive === "live" ? (
        <ItemList>
          {liveAuction.map((item, index) => (
            <LiveItem key={index} item={item} />
          ))}
        </ItemList>
      ) : (
        <ItemList>
          {liveAuction.map((item, index) => (
            <NonLiveItem key={index} item={item} />
          ))}
        </ItemList>
      )}
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
