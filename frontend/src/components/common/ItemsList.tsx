import React from "react";
import styles from "./ItemsList.module.css";
import Item from "./Item";
import MainSelect from "@components/main/MainSelect";

export default function ItemsList() {
  return (
    <>
      <MainSelect />
      <div className=" h-12"> 필터</div>
      <div className={styles.ItemsList}>
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </div>
    </>
  );
}
