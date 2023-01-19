import React from "react";
import styles from "./Detail.module.css";
import { ReactComponent as DummyImg } from "@/assets/detail/dummy.svg";
import { ReactComponent as Profile } from "@/assets/detail/profile.svg";
import { HeartIcon } from "@heroicons/react/24/outline";
export default function Detail() {
  return (
    <>
      <div className={styles.root}>
        <div className={styles.imgbox}>
          <DummyImg />
        </div>
        <div className={styles.profileBox}>
          <Profile className={styles.profileImg} />
          <div className={styles.infoBox}>
            <div className={styles.infoTitle}>초록무너</div>
            <div className={styles.infoBadge}>거북이 수호자</div>
          </div>
          <div className={styles.likeBox}>
            {" "}
            <HeartIcon className={styles.icon} />
          </div>
        </div>
        <div className={styles.contentBox}>
          <div className={styles.contentTitle}>
            프라다 가방 팝니다. 한정판이에요
          </div>
          <div className={styles.contentCataegory}>패션 잡화</div>
          <div className={styles.contentDescription}>
            정품맞고 이탈리아 현지 구매했습니다. 가로37 세로25cm 정도 (손잡이
            미포함) 개런티카드,더스트백, 행텍 풀구성 외관 기스 없이 깨끗한편
          </div>
        </div>
        <div className={styles.footerBox}></div>
      </div>
    </>
  );
}
