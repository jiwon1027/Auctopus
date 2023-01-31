import React from "react";
import Layout from "@components/common/Layout";
import MainToggleButtonGroup from "@components/main/MainToggleButtonGroup";
import ItemsList from "@components/common/ItemsList";
import Image1 from "@/assets/detail/dummy.svg";
import Image2 from "@/assets/main/airpodsImg.jpg";
import styled from "styled-components";
import ProfileImg from "@/assets/common/profile.png";


const liveAuction: IAuction[] = [
  {
    img: Image1,
    title: "구찌를 굳이?",
    price: 450000,
    viewer: 55,
    time: "2023-01-27 12:00",
  },
  {
    img: Image2,
    title: "에어팟 맥스",
    price: 410000,
    viewer: 15,
    time: "2023-01-27 12:05",
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
