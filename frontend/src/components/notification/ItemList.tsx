import React from "react";
import Item from "./Item";

interface IProps {
  notiList: {
    img: string;
    context: string;
  }[];
}
export default function ItemList({ notiList }: IProps) {
  return (
    <>
      {notiList.map((item, idx) => (
        <Item key={idx} notiItem={item} />
      ))}
    </>
  );
}
