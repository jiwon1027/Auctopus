import React from "react";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import Hamburger from "../common/Hamburger";
import LogoImg from "@/assets/common/logo.png";
/**
 * @param title
 * @param leftIcon none은 없음, back은 뒤로가기 버튼, turtle은 거북이 아이콘
 */
export interface IProps {
  right?: JSX.Element;
}
interface ILeftProps {
  pathname: string;
}
/**
 * 헤더
 *
 * @param [props.right] 오른쪽 코너 컴포넌트
 * @returns Header component
 *
 * @example
 * ```
 * <Header right={right} />
 * ```
 */
export default function Header(props: IProps): JSX.Element {
  const location = useLocation();

  return (
    <StyledHeader>
      <LeftComponent pathname={location.pathname} />
      <TitleComponent pathname={location.pathname} />
      <div className="iconContainer">{props.right}</div>
    </StyledHeader>
  );
}
const LeftComponent = (props: ILeftProps): JSX.Element => {
  const navigate = useNavigate();
  const gotoPrevPage = () => navigate(-1);

  switch (props.pathname) {
    case "/":
    case "/profile":
      return <Hamburger />;
    case "/signup":
    case "/signup/additional":
    case "/signup/category":
    case "/detail":
    case "/autobid":
    case "/createAuction":
    case "/noti":
      return (
        <ChevronLeftOutlinedIcon className="backIcon" onClick={gotoPrevPage} />
      );
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
    case "/autobid":
      return <h1 className="title">자동입찰 설정</h1>;
    case "/createAuction":
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
  background-color: white;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 1rem;

  .backIcon {
    color: ${(props) => props.theme.colors.primary};
    width: 3rem;
    height: 3rem;
  }

  .signatureIcon {
    width: 8.6rem;
    height: 5.4rem;
  }

  .title {
    font-weight: bold;
    font-size: 1.8rem;
    color: ${(props) => props.theme.colors.primary};
  }

  .iconContainer {
    display: flex;
    align-items: center;

    .icon {
      color: ${(props) => props.theme.colors.primary};
      margin: 0 0.5rem;
      width: 3rem;
      height: 3rem;
    }

    .rightText {
      font-weight: ${(props) => props.theme.fontWeight.medium};
      font-size: 1.6rem;
      color: ${(props) => props.theme.colors.turtleDark};
      width: 3rem;
    }
  }

  /* .icon {
    color: ${(props) => props.theme.colors.primary};
    width: 3rem;
    height: 3rem;
  }
  .rightText {
    font-weight: ${(props) => props.theme.fontWeight.medium};
    font-size: 1.6rem;
    color: ${(props) => props.theme.colors.turtleDark};
    width: 3rem;
  } */
`;
