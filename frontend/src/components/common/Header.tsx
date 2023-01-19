import React from "react";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import { ReactComponent as Turtle } from "../../assets/badges/turtle.svg";

export default function Header() {
  return (
    <StyledHeader>
      {/* <ChevronLeftIcon className="h-6 w-6 " onClick={() => navigate(-1)} /> */}
      <Turtle width="5rem" height="4rem" />
      <div className="iconContainer">
        <NotificationsNoneOutlinedIcon className="icon" />
        <SearchOutlinedIcon className="icon" />
      </div>
    </StyledHeader>
  );
}

const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0.5rem;
  background-color: transparent;

  .iconContainer {
    display: flex;
    align-items: center;
    /* margin: 0 1rem; */
  }

  .icon {
    color: ${theme.colors.primary};
    margin: 0 0.5rem;
    width: 2rem;
  }
`;
