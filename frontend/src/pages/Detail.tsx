import React from "react";
import styles from "./Detail.module.css";
import { ReactComponent as DummyImg } from "@/assets/detail/dummy.svg";
export default function Detail() {
  return (
    <>
      <div className={styles.root}>
        <div className={styles.imgBox}>
          <DummyImg />
        </div>
        <div className={styles.profileBox}></div>
        <div className={styles.contentBox}></div>
        <div className={styles.footerBox}></div>
      </div>
    </>
  );
}
