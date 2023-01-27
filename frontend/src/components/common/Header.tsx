import React from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import styled from "styled-components";
import { ReactComponent as Turtle } from "../../assets/badges/turtle.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Hamburger from "../common/Hamburger";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import LogoImg from "@/assets/common/logo.png";
/**
 * @param title
 * @param leftIcon none은 없음, back은 뒤로가기 버튼, turtle은 거북이 아이콘
 */
export interface IProps {
  title?: string;
  leftIcon: "none" | "back" | "turtle";
}
interface ILeftProps {
  pathname: string;
  onClick: () => void;
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
  const navigate = useNavigate();

  return (
    <StyledHeader>
      <LeftComponent
        pathname={location.pathname}
        onClick={() => navigate(-1)}
      />
      <TitleComponent pathname={location.pathname} />
      <RightComponent />
    </StyledHeader>
  );
}
const LeftComponent = (props: ILeftProps): JSX.Element => {
  switch (props.pathname) {
    case "/":
    case "/profile":
      return <Hamburger />;
    case "/signup":
    case "/detail":
      return (
        <ChevronLeftOutlinedIcon className="backIcon" onClick={props.onClick} />
      );
    default:
      return <></>;
  }
};
const RightComponent = (): JSX.Element => {
  switch (location.pathname) {
    case "/":
      return (
        <Link to={"/search"}>
          <SearchOutlinedIcon className="icon" />
        </Link>
      );

    case "/detail":
      return <ShareOutlinedIcon className="icon" />;
    default:
      return <></>;
  }
};
const TitleComponent = (props: { pathname: string }): JSX.Element => {
  switch (props.pathname) {
    case "/":
      return (
        <LogoBox>
          <Logo src={LogoImg} alt="logo" />
        </LogoBox>
      );
    case "/detail":
      return <h1 className="title">경매방 생성</h1>;

    default:
      return <></>;
  }
};
const LogoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Logo = styled.img`
  width: 10rem;
  height: 2rem;
`;

const StyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0.5rem;
  background-color: transparent;

  .backIcon {
    position: relative;
    left: -2rem;
    color: ${(props) => props.theme.colors.primary};
    width: 5rem;
    height: 5rem;
  }

  .signatureIcon {
    width: 8.6rem;
    height: 5.4rem;
  }

  .title {
    font-weight: bold;
    font-size: 1.125rem;
    color: ${(props) => props.theme.colors.primary};
  }

  .icon {
    color: ${(props) => props.theme.colors.primary};
    width: 3rem;
    height: 3rem;
  }
`;
