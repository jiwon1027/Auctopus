import React from "react";
import styled from "styled-components";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { theme } from "@/styles/theme";

interface IProps {
  isLiked: boolean;
  auctionInfo: IAuctionDetail;
  likeHandler: (event: React.MouseEvent<unknown>) => void;
}
export default function Profile({ isLiked, auctionInfo, likeHandler }: IProps) {
  return (
    <ProfileBox>
      <div className="profileIconBox">
        <ProfileImg>
          <img
            className="image"
            src={auctionInfo.profileUrl}
            alt="profile-image"
          />
        </ProfileImg>
      </div>
      <div className="infoBox">
        <div className="infoTitle">{auctionInfo.nickname}</div>
        <div className="infoBadge">{auctionInfo.userEmail}</div>
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
        {/* FIXME: count is changeable when click LIKE button */}
        <div className="likesCount">{auctionInfo.likeCount}</div>
      </div>
    </ProfileBox>
  );
}

const ProfileImg = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 70%;
  overflow: hidden;
  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
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
