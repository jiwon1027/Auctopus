import React from "react";
import Image from "@/assets/airpodsImg.jpg";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CircleIcon from "@mui/icons-material/Circle";

export default function Item() {
  return (
    <>
      <ItemBox>
        <div className="imgBox">
          <img src={Image} alt="image" />
          <div className="liveBox">
            <CircleIcon color="error" sx={{ fontSize: 20 }} />
            <div className="liveBoxDesc">25명</div>
          </div>
        </div>
        <div className="infoBox">
          <div className="infoTitle">Airpods Max 다크</div>
          <div className="infoTimeBox">
            <div className="infoTimeDesc">라이브 종료까지</div>
            <div className="infoTime">57분</div>
            <AccessTimeIcon color="error" sx={{ fontSize: 20 }} />
          </div>

          <div className="infoPriceBox">
            <div className="infoPriceDesc">입찰 시작가</div>
            <div className="infoPrice">300,000원</div>
          </div>
        </div>
      </ItemBox>
      <UnderLine />
    </>
  );
}

const ItemBox = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
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
    height: auto;
    left: 0.25rem;
    bottom: 1.5rem;
  }

  .liveBoxDesc {
    font-size: 12px;
    color: white;
    font-weight: 600;
    padding-top: 0.15rem;
    padding-left: 0.125rem;
  }

  .infoBox {
    width: 60%;
    padding-left: 0.75rem;
  }

  .infoTitle {
    font-weight: 800;
    font-size: 1.2rem;
  }

  .infoTimeBox {
    display: flex;
    margin-top: 0.5rem;
    justify-content: flex-end;
  }

  .infoTimeDesc {
    padding-top: 0.25rem;
    padding-right: 0.5rem;
    font-size: 12px;
  }

  .infoTime {
    display: flex;
    padding-top: 0.1rem;
    font-weight: 700;
    color: #d32f2f;
    font-size: 14px;
  }

  .infoPriceBox {
    display: flex;
    justify-content: flex-end;
    margin-top: 1.75rem;
    color: ${theme.colors.turtleDark};
  }

  .infoPriceDesc {
    color: ${theme.colors.greyDark};
    padding-top: 0.25rem;
    padding-right: 0.5rem;
    font-size: 14px;
  }

  .infoPrice {
    color: ${theme.colors.turtleDark};
    font-weight: ${theme.fontWeight.bold};
    font-size: 18px;
  }
`;

const UnderLine = styled.div`
  border-radius: 0.5rem;
  width: 100%;
  margin: 0.3rem auto;
  border: solid 0.025rem ${theme.colors.greyLight}; // 야매로 해봄.. div라서 안되는듯
`;
