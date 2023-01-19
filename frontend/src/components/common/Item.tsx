import React from "react";
import styles from "./Item.module.css";
import Image from "@/assets/airpodsImg.jpg";
import styled from "styled-components";

const ItemBox = styled.div`
  display: flex;
  height: 6.5rem;

  img {
    border-radius: 0.5rem;
    max-width: 100%;
    max-height: 100%;
  }

  .imgBox {
    width: 40%;
    border-radius: 0.5rem;
  }

  .liveBox {
    display: flex;
    position: relative;
    left: 0.15rem;
    bottom: 1.2rem;
  }

  .liveBoxIcon {
    width: 1rem;
    color: red;
    stroke-width: 2;
    fill: red;
  }

  .liveBoxDesc {
    font-size: 12px;
    color: white;
    font-weight: 600;
    padding-left: 0.125rem;
  }

  .infoBox {
    width: 60%;
    padding-left: 0.75rem;
  }

  .infoTitle {
    font-weight: 800;
    font-size: 18px;
  }

  .infoTimeBox {
    color: #5c5b5b;
    display: flex;
    justify-content: flex-end;
  }

  .infoTimeDesc {
    padding-top: 0.375rem;
    padding-right: 0.5rem;
    font-size: 12px;
  }

  .infoTime {
    display: flex;
    font-weight: 700;
    color: red;
    font-size: 14px;
  }

  .infoTimeIcon {
    @apply w-5 place-self-center stroke-2;
  }

  .infoPriceBox {
    display: flex;
    justify-content: flex-end;
    padding-top: 1.5rem;
    /* color: turtle */
  }

  .infoPriceDesc {
    @apply text-grey-dark pt-1 pr-2;
    /* color:  greydark*/
    padding-top: 0.25rem;
    padding-right: 0.5rem;
    font-size: 14px;
  }
`;

export default function Item() {
  return (
    <>
      <ItemBox>
        <div className="imgBox">
          <img src={Image} alt="image" />
          <div className="liveBox">
            {/* <PlayCircleIcon className="liveBoxIcon" /> */}
            <p className="liveBoxDesc">25명</p>
          </div>
        </div>
        <div className="infoBox">
          <div className="infoTitle">Airpods Max 다크</div>
          <div className="infoTimeBox">
            <div className="infoTimeDesc">라이브 종료까지</div>
            <div className="infoTime">
              57분
              {/* <ClockIcon className={styles.infoTimeIcon} /> */}
            </div>
          </div>

          <div className="infoPriceBox">
            <div className="infoPriceDesc">입찰 시작가</div>
            <div className="infoPrice">300,000원</div>
          </div>
        </div>
      </ItemBox>
      <div className="underLine"></div>
    </>
  );
}
