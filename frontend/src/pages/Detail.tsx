import React from "react";
import DummyImg from "@/assets/detail/dummy.svg";
// import { HeartIcon } from "@heroicons/react/24/outline";
import styled from "styled-components";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { theme } from "@/styles/theme";

export default function Detail() {
  return (
    <>
      <Container>
        <ImgBox>
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
            <FavoriteBorderIcon color="disabled" sx={{ fontSize: 30 }} />
            <div className="likesCount">146</div>
            {/* <HeartIcon className={styles.icon} /> */}
          </div>
        </ProfileBox>
        <ContentBox>
          <div className="contentTitle">프라다 가방 팝니다. 한정판이에요</div>
          <div className="contentCataegory">패션 잡화</div>
          <div className="contentDescription">
            정품맞고 이탈리아 현지 구매했습니다. 가로37 세로25cm 정도 (손잡이
            미포함) 개런티카드,더스트백, 행텍 풀구성 외관 기스 없이 깨끗한편
          </div>
        </ContentBox>
        <FooterBox></FooterBox>
      </Container>
    </>
  );
}

//imgBox 35 profileBox 10 ContentBox
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
    padding: 1.6em;
  }
  .infoTitle {
    font-size: 1.92rem;
    height: 40%;
    font-weight: ${theme.fontWeight.bold};
  }
  .infoBadge {
    height: 20%;
    margin-top: 1.16rem;
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
  border: solid 2px green;
  flex-direction: column;
  .contentTitle {
    font-size: 1.92rem;
    height: 20%;
    border: solid 2px red;
  }
  .contentCataegory {
    height: 15%;
    font-size: 0.8rem;
    color: gray;
    border: solid 2px red;
  }
  .contentDescription {
    height: 70%;
    border: solid 2px red;
  }
`;

const FooterBox = styled.div`
  height: 15%;
`;
