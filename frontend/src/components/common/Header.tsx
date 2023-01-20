import React from "react";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import styled from "styled-components";
import { ReactComponent as Turtle } from "../../assets/badges/turtle.svg";
import { Link, useLocation } from "react-router-dom";

interface IProps {
  title?: string;
  hasBack?: boolean;
}

/**
 * 헤더
 *
 * @param props.title 제목
 * @param props.rightComponent 오른쪽 코너 컴포넌트
 * @returns Header component
 *
 * @example
 * ```
 * <Header title="Autopus" hasBack />
 * ```
 */
export default function Header(props: IProps): JSX.Element {
  const location = useLocation();

  const RightComponent = (): JSX.Element => {
    switch (location.pathname) {
      case "/":
        return (
          <>
            <NotificationsNoneOutlinedIcon className="icon" />
            <SearchOutlinedIcon className="icon" />
          </>
        );
      case "/detail":
        return <ShareOutlinedIcon className="icon" />;
      default:
        return <></>;
    }
  };
  return (
    <StyledHeader>
      {props.hasBack ? (
        <Link to="..">
          <ChevronLeftOutlinedIcon className="h-6 w-6 " />
        </Link>
      ) : (
        <Turtle width="5rem" height="4rem" />
      )}
      <h1 className="title">{props.title}</h1>
      <div className="iconContainer">
        <RightComponent />
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

  .title {
    font-weight: bold;
    font-size: 1.125rem;
    color: ${(props) => props.theme.colors.primary};
  }

  .iconContainer {
    display: flex;
    align-items: center;
    /* color:  */
    /* margin: 0 1rem; */

    .icon {
      color: ${(props) => props.theme.colors.primary};
      margin: 0 0.5rem;
      width: 2rem;
    }
  }
`;
