import React from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface IProps {
  item: {
    img: string /* HTMLImageElement */;
    title: string;
    price: number;
    viewer: number;
    time: string;
  };
}

export default function NonLiveItem(props: IProps) {
  const getTime = (time: string) => {
    const dDate = new Date(time);
    const month = dDate.getMonth() + 1;
    const day = dDate.getDate();
    const hour = dDate.getHours();

    const remainTime = `${month}월 ${day}일 ${hour}시 `;
    return remainTime;
  };
  return (
    <>
      <ItemBox>
        <div className="imgBox">
          <img src={props.item.img} alt="image" />
          <div className="liveBox">
            <FavoriteIcon color="error" sx={{ fontSize: 15 }} />
            <div className="liveBoxDesc">{props.item.viewer}명</div>
          </div>
        </div>
        <div className="infoBox">
          <div className="infoTitle">{props.item.title}</div>
          <div className="infoTimeBox">
            <div className="infoTimeDesc">경매 시작일</div>
            <div className="infoTime">{getTime(props.item.time)}</div>
          </div>

          <div className="infoPriceBox">
            <div className="infoPriceDesc">입찰 시작가</div>
            <div className="infoPrice">
              {/* 자릿수 콤마 */}
              {props.item.price
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              원
            </div>
          </div>
        </div>
      </ItemBox>
      <UnderLine />
    </>
  );
}

const ItemBox = styled.div`
  margin-top: 0.8rem;
  margin-bottom: 0.8rem;
  display: flex;
  height: 10.4rem;
  cursor: pointer;

  img {
    border-radius: 0.8rem;
    max-width: 100%;
    max-height: 100%;
  }

  .imgBox {
    width: 40%;
    border-radius: 0.8rem;
  }

  .liveBox {
    display: flex;
    position: relative;
    height: auto;
    left: 0.4rem;
    bottom: 2.2rem;
    text-align: center;
  }

  .liveBoxDesc {
    font-size: 12px;
    color: white;
    font-weight: 600;
    padding-left: 0.2rem;
  }

  .infoBox {
    width: 60%;
    padding-left: 1.2rem;
  }

  .infoTitle {
    font-weight: 800;
    font-size: 1.92rem;
  }

  .infoTimeBox {
    display: flex;
    flex-direction: column;
    margin-top: 0.5rem;
    align-items: flex-end;
  }

  .infoTimeDesc {
    padding-top: 0.4rem;
    font-size: 1.2rem;
  }

  .infoTime {
    display: flex;
    padding-top: 0.16rem;
    font-weight: 700;
    color: ${theme.colors.turtleDark};
    font-size: 1.8rem;
  }

  .infoPriceBox {
    display: flex;
    justify-content: flex-end;
    margin-top: 1.8rem;
  }

  .infoPriceDesc {
    color: ${theme.colors.greyDark};
    padding-top: 0.4rem;
    padding-right: 0.8rem;
    font-size: 14px;
  }

  .infoPrice {
    color: ${theme.colors.greyDark};
    font-weight: ${theme.fontWeight.bold};
    font-size: 18px;
  }
`;

const UnderLine = styled.div`
  border-radius: 0.8rem;
  width: 100%;
  margin: 0.48rem auto;
  border: solid 0.04rem ${theme.colors.greyLight};
`;
