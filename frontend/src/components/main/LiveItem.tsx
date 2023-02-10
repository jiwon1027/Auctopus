import React from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CircleIcon from "@mui/icons-material/Circle";
import { useNavigate } from "react-router-dom";
import { IAuction } from "types/auction";

interface IProps {
  item: IAuction;
}

export default function LiveItem(props: IProps) {
  const navigate = useNavigate();

  const getTime = (time: string) => {
    const masTime = new Date(time).getTime();
    const todayTime = new Date().getTime();

    const diff = todayTime - masTime;

    const diffMin = Math.floor((diff / (1000 * 60)) % 60);

    //
    const remainTime = 60 - diffMin;
    return remainTime;
  };

  const moveToDetail = () => {
    navigate(`/detail/${props.item.auctionSeq}`);
  };
  return (
    <>
      <ItemBox onClick={moveToDetail}>
        <div className="imgBox">
          <img src={props.item.auctionImage?.imageUrl} alt="image" />
          <div className="liveBox">
            <CircleIcon color="error" sx={{ fontSize: 15 }} />
            <div className="liveBoxDesc">{props.item.likeCount}명</div>
          </div>
        </div>
        <div className="infoBox">
          <div className="infoTitle">{props.item.title}</div>
          <div className="infoTimeBox">
            <div className="infoTimeDesc">경매 종료까지</div>
            <div className="infoTime">{getTime(props.item.startTime)}분</div>
            <AccessTimeIcon color="error" sx={{ fontSize: 20 }} />
          </div>

          <div className="infoPriceBox">
            <div className="infoPriceDesc">현재 입찰가</div>
            <div className="infoPrice">
              {/* 자릿수 콤마 */}
              {props.item.startPrice
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

  .imgBox > img {
    width: 100%;
    height: 100%;
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
    text-shadow: -1px 0px 0px black, 1px 0px 0px black, 0px -1px 0px black,
      0px 1px 0px black;
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
    margin-top: 0.5rem;
    justify-content: flex-end;
  }

  .infoTimeDesc {
    padding-top: 0.4rem;
    padding-right: 0.8rem;
    font-size: 12px;
  }

  .infoTime {
    display: flex;
    padding-top: 0.16rem;
    font-weight: 700;
    color: #d32f2f;
    font-size: 14px;
  }

  .infoPriceBox {
    display: flex;
    justify-content: flex-end;
    margin-top: 3.5rem;
    color: ${theme.colors.turtleDark};
  }

  .infoPriceDesc {
    color: ${theme.colors.greyDark};
    padding-top: 0.4rem;
    padding-right: 0.8rem;
    font-size: 14px;
  }

  .infoPrice {
    color: ${theme.colors.turtleDark};
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
