import React from "react";
import Layout from "@components/common/Layout";
import MainToggleButtonGroup from "@components/main/MainToggleButtonGroup";
import ItemsList from "@components/common/ItemsList";
import styled from "styled-components";
import ProfileImg from "@/assets/common/profile.png";

const liveAuction: IAuction[] = [
  {
    auctionSeq: 1,
    email: "BIBI@naver.com",
    title: "내 찜이야",
    startTime: "2023-01-27 12:05",
    likeCount: 200,
    startPrice: 500000,
    state: 0,
  },
  {
    auctionSeq: 2,
    email: "ㅓㅑㅓㅑ@naver.com",
    title: "내 찜이야",
    startTime: "2023-01-28 16:10",
    likeCount: 100,
    startPrice: 300000,
    state: 0,
  },
];

export default function LikesPage() {
  const [live, setLive] = React.useState<"live" | "nonLive">("live");

  const changeLive = () => {
    setLive((prev) => (prev === "live" ? "nonLive" : "live"));
  };
  return (
    <Layout leftIcon="none">
      <ProfileBox>
        <Profile src={ProfileImg} alt="profile" />
        <span className="profileTitle">정개미님의 관심목록</span>
      </ProfileBox>
      <MainToggleButtonGroup
        text={{ left: "내 진행 예정", right: "내 입장 예정" }}
        live={live}
        onClick={changeLive}
      />
      <MarginBox />
      <ItemsList liveAuction={liveAuction} isLive={live === "live"} />
    </Layout>
  );
}

const ProfileBox = styled.div`
  flex: 0.2;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .profileTitle {
    font-size: 1.8rem;
    margin: 1.2rem 0;
    font-family: Pretendard;
    text-align: center;
    font-weight: ${(props) => props.theme.fontWeight.semibold};
  }
`;

const Profile = styled.img`
  width: 6rem;
`;

const MarginBox = styled.div`
  height: 1.5rem;
`;
