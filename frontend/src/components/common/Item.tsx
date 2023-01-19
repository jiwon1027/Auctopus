import React from "react";
import styles from "./Item.module.css";
import { ClockIcon, PlayCircleIcon } from "@heroicons/react/24/outline";
import Image from "@/assets/airpodsImg.jpg";

export default function Item() {
  return (
    <>
      <div className={styles.itemBox}>
        <div className={styles.imgBox}>
          <img src={Image} alt="image" />
          <div className={styles.liveBox}>
            <PlayCircleIcon className={styles.liveBoxIcon} />
            <p className={styles.liveBoxDesc}>25명</p>
          </div>
        </div>
        <div className={styles.infoBox}>
          <div className={styles.infoTitle}>Airpods Max 다크</div>
          <div className={styles.infoTimeBox}>
            <div className={styles.infoTimeDesc}>라이브 종료까지</div>
            <div className={styles.infoTime}>
              57분
              <ClockIcon className={styles.infoTimeIcon} />
            </div>
          </div>

          <div className={styles.infoPriceBox}>
            <div className={styles.infoPriceDesc}>입찰 시작가</div>
            <div className={styles.infoPrice}>300,000원</div>
          </div>
        </div>
      </div>
      <div className={styles.underLine}></div>
    </>
  );
}
