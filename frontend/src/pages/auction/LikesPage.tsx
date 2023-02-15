import React, { useEffect, useState } from "react";
import Layout from "@components/common/Layout";
import MainToggleButtonGroup from "@components/main/MainToggleButtonGroup";
import ItemsList from "@components/common/ItemsList";
import styled from "styled-components";
import { IAuction } from "types/auction";
import { getAuctionLikes, getMyAuctionList } from "@/api/auction";
import { useNavigate } from "react-router-dom";
import useAuth from "@/store/atoms/useAuth";
import { theme } from "@/styles/theme";

const initLiveAuction: IAuction[] = [
  {
    auctionImage: {
      auctionImageSeq: 0,
      auctionSeq: 0,
      imageUrl: "",
    },
    auctionSeq: 1,
    email: "",
    title: "",
    startTime: "",
    likeCount: 0,
    startPrice: 0,
    state: 0,
    viewer: 0,
    price: 0,
  },
];

export default function LikesPage() {
  const { getUser } = useAuth();
  const navigate = useNavigate();
  const [live, setLive] = useState<"live" | "nonLive">("live");
  const [liveAuction, setLiveAuction] = useState<IAuction[]>(initLiveAuction);

  useEffect(() => {
    try {
      fetchMyAuction();
    } catch (error) {
      navigate("/error");
    }
  }, []);

  const changeLive = () => {
    setLive((prev) => (prev === "live" ? "nonLive" : "live"));
    live === "live" ? fetchAuctionLikes() : fetchMyAuction();
  };

  const fetchAuctionLikes = async () => {
    const res = await getAuctionLikes();
    if (res.status !== 200)
      throw new Error("Internal Server Error error (❁´◡`❁)");

    setLiveAuction(res.data);
  };

  const fetchMyAuction = async () => {
    const res = await getMyAuctionList();
    if (res.status !== 200)
      throw new Error("Internal Server Error error (❁´◡`❁)");

    setLiveAuction(res.data);
  };

  const userData = getUser();

  return (
    <Layout title=" ">
      <ProfileBox>
        <Profile onClick={() => navigate("/profile")}>
          <img className="image" src={userData.profileUrl} alt="profile" />
        </Profile>
        <span className="profileTitle">{userData.nickname}님의 프로필</span>
        <span className="userEmail">{userData.email}</span>
        <ProfileUpdate onClick={() => navigate(`/profileUpdate`)}>
          프로필 편집
        </ProfileUpdate>
      </ProfileBox>
      <MainToggleButtonGroup isMe live={live} onClick={changeLive} />
      <MarginBox />
      <ItemsList liveAuction={liveAuction} isLive={live === "live"} />
    </Layout>
  );
}

const Profile = styled.div`
  width: 6rem;
  height: 6rem;
  border-radius: 70%;
  overflow: hidden;
  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const ProfileBox = styled.div`
  height: 20%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .profileTitle {
    font-size: 1.8rem;
    margin-top: 1.2rem;
    font-family: Pretendard;
    text-align: center;
    font-weight: ${(props) => props.theme.fontWeight.semibold};
  }
  .userEmail {
    font-size: 1.5rem;
    margin: 0.7rem 0;
    color: ${theme.colors.turtleStandard};
  }
`;

const MarginBox = styled.div`
  height: 1.5rem;
`;

const ProfileUpdate = styled.div`
  width: 50%;
  height: 2.6rem;
  background-color: ${theme.colors.primary};
  color: white;
  border-radius: 5px;
  font-size: 1.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: ${theme.fontWeight.semibold};
  font-family: Pretendad;
  cursor: pointer;
`;
