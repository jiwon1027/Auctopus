import React from "react";
import styles from "@/components/main/MainSelect.module.css";

export default function MainSelect() {
  return (
    <>
      <div className={styles.selectBox}>
        <div className={styles.selectBoxL}>진행중</div>
        <div className={styles.selectBoxR}>진행예정</div>
      </div>
    </>
  );
}
