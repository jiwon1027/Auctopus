import React from "react";
import DummyImg from "@/assets/detail/dummy.svg";
import styled from "styled-components";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { styled as mstyled } from "@mui/material/styles";
import { theme } from "@/styles/theme";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import Modal from "../components/common/Modal";
export default function DetailPage() {
  const [isBuyer, setIsBuyer] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const likeHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsLiked(!isLiked);
    console.log(event);
  };
  return (
    <>
      <Container>
        <ImgBox>
          <Link to={"/"}>
            <CustomizeIcon />
          </Link>

          <img src={DummyImg} alt="dummy-img" />
        </ImgBox>

        <div className="imgBox"></div>
        <ProfileBox>
          <div className="profileIconBox">
            <AccountCircleIcon color="disabled" sx={{ fontSize: 50 }} />
          </div>
          <div className="infoBox">
            <div className="infoTitle">초록무너</div>
            <div className="infoBadge">거북이 수호자</div>
          </div>
          <div className="likes">
            {isLiked ? (
              <FavoriteIcon
                onClick={likeHandler}
                color="warning"
                sx={{ fontSize: 30 }}
              />
            ) : (
              <FavoriteBorderIcon
                onClick={likeHandler}
                color="disabled"
                sx={{ fontSize: 30 }}
              />
            )}

            <div className="likesCount">146</div>
            {/* <HeartIcon className={styles.icon} /> */}
          </div>
        </ProfileBox>
        <ContentBox>
          <div className="contentTitle">프라다 가방 팝니다. 한정판이에요</div>
          <div className="contentCataegory">패션 잡화</div>
          <div className="contentDescription">
            정품맞고 이탈리아 현지 구매했습니다. 가로37 세로25cm 정도 (손잡이
            미포함)
            <br />
            <br />
            개런티카드,더스트백, 행텍 풀구성 외관 기스 없이 깨끗한편
          </div>
        </ContentBox>
        <FooterBox>
          <div className="timeBox">
            <div className="timephrase">
              <AccessTimeIcon color="disabled" sx={{ fontSize: 20 }} />
              <span>경매시작까지</span>
            </div>
            <div className="timeLeft">1일 01: 14: 50</div>
          </div>
          <div className="buttonBox">
            {isBuyer ? (
              <CustomizedButton>경매 시작</CustomizedButton>
            ) : (
              <Modal />
            )}
          </div>
        </FooterBox>
      </Container>
    </>
  );
}

const CustomizeIcon = mstyled(ArrowBackIosIcon)`
  width: 3rem;
  height: 3rem;
  color: white;
  position: absolute;
  margin-top: 1.5rem;
  margin-left: 1.9rem;
`;
const CustomizedButton = mstyled(Button)`
  border: solid 2px ${theme.colors.turtleDark};
  font-size: 1.8rem;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.turtleDark};
  width: 12.1rem;
  height: 4.8rem;
  border-radius: 10;
`;

const Container = styled.div`
  background-color: white;
  margin-left: auto;
  margin-right: auto;
  width: 390px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  .imgBox {
  }
`;

const ImgBox = styled.div`
  height: 45%;
  overflow: hidden;
`;

const ProfileBox = styled.div`
  height: 10%;
  padding: 0.5rem;
  display: flex;
  border-bottom: 1px solid ${theme.colors.greyLight};
  .profileIconBox {
    width: 20%;
    display: flex;
    justify-content: center;
    margin: auto 0;
  }
  .infoBox {
    display: flex;
    width: 60%;
    flex-direction: column;
    padding: 1.4rem;
  }
  .infoTitle {
    font-size: 1.6rem;
    height: 40%;
    font-weight: ${theme.fontWeight.bold};
  }
  .infoBadge {
    height: 20%;
    margin-top: 1rem;
    font-size: 1.2rem;
    color: ${theme.colors.turtleStandard};
  }
  .likes {
    width: 10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const ContentBox = styled.div`
  padding: 2.4rem;
  display: flex;
  height: 35%;
  flex-direction: column;
  .contentTitle {
    font-size: 2.2rem;
    font-weight: ${theme.fontWeight.bold};
  }
  .contentCataegory {
    margin-top: 1rem;
    font-size: 1.2rem;
    color: ${theme.colors.greyStandard};
  }
  .contentDescription {
    margin-top: 1.7rem;
    font-size: 1.5rem;
  }
`;

const FooterBox = styled.div`
  height: 15%;
  border-top: 1px solid ${theme.colors.greyLight};
  padding: 2.5rem 2.7rem;
  display: flex;
  .timeBox {
    width: 60%;
    span {
      font-size: 1.2rem;
      margin-left: 0.6rem;
      margin-top: 0.2rem;
      color: ${theme.colors.greyStandard};
    }
    .timephrase {
      display: flex;
      align-items: center;
    }
    font-size: 2.5rem;
    font-weight: ${theme.fontWeight.bold};
    .timeLeft {
      margin-top: 1rem;
    }
  }
  .buttonBox {
    width: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
