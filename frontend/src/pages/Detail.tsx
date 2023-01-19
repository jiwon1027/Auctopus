import React from "react";
import DummyImg from "@/assets/detail/dummy.svg";
import Profile from "@/assets/detail/profile.svg";
// import { HeartIcon } from "@heroicons/react/24/outline";
import styled from "styled-components";

export default function Detail() {
  return (
    <>
      <Container>
        <img src={DummyImg} alt="dummy-img" />
        <div className="imgBox"></div>
        <ProfileBox>
          <ProfileImg src={Profile} alt="profile-icon" />
          <div className="infoBox">
            <div className="infoTitle">초록무너</div>
            <div className="infoBadge">거북이 수호자</div>
          </div>
          <div className="likes">
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

const ProfileImg = styled.img`
  width: 2.5rem;
  height: 2.5rem;
`;
const ImgBox = styled.div`
  height: 30.4rem;
`;

const ProfileBox = styled.div`
  height: 5rem;
  display: flex;
  background-color: lightcoral;
  .infoBox {
    display: flex;
    width: 78%;
    flex-direction: column;
    padding: 2rem;
  }
  .infoTitle {
    font-size: 1.2rem;
    height: 40%;
  }
  .infoBadge {
    height: 20%;
    margin-top: 1rem;
  }
  .likes {
    width: 7%;
    display: flex;
    justify-content: center;
  }
`;

const ContentBox = styled.div`
  padding: 1.5rem;
  height: 25.4rem;
  display: flex;
  flex-direction: column;
  .contentTitle {
    font-size: 1.2rem;
    height: 20%;
    border: solid 2px red;
  }
  .contentCataegory {
    height: 15%;
    font-size: 0.5rem;
    color: gray;
    border: solid 2px red;
  }
  .contentDescription {
    height: 70%;
    border: solid 2px red;
  }
`;

const FooterBox = styled.div`
  height: 3rem;
  background-color: lightblue;
`;
