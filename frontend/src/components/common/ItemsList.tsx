import React from "react";
import styles from "./ItemsList.module.css";
import Item from "./Item";

export default function ItemsList() {
  return (
    <>
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
