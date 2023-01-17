import React from "react";
import styles from "./Item.module.css";

export default function Item() {
  return (
    <div className={styles.itemBox}>
      <div className={styles.imgBox}></div>
      <div className={styles.infoBox}>
        <div className={styles.infoTitle}>집에가고싶어요</div>
        <div className={styles.infoTimeDesc}>라이브 종료까지</div>
        <div className={styles.infoTime}>
          57분
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-5 place-self-center"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className={styles.infoPriceBox}>
          <div className={styles.infoPriceDesc}>입찰 시작가</div>
          <div className={styles.infoPrice}>300,000원</div>
        </div>
      </div>
    </div>
  );
}
