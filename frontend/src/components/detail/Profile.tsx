import React, { useState } from "react";
import styled from "styled-components";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { theme } from "@/styles/theme";

interface IProps {
  isLiked: boolean;
  detailData: {
    auctionSeq: number;
    // imageList: FileList;
    userSeq: number;
    categorySeq: number;
    title: string;
    content: string;
    startTime: string;
    startPrice: number;
    likeCount: number;
    isReady: number;
  };
  likeHandler: (event: React.MouseEvent<unknown>) => void;
}
export default function Profile({ isLiked, detailData, likeHandler }: IProps) {
  return (
    <ProfileBox>
      <div className="profileIconBox">
        <AccountCircleIcon color="disabled" sx={{ fontSize: 50 }} />
      </div>
      <div className="infoBox">
        <div className="infoTitle">정개미</div>
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
        <div className="likesCount">
          {isLiked ? detailData.likeCount + 1 : detailData.likeCount}
        </div>
      </div>
    </ProfileBox>
  );
}
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
