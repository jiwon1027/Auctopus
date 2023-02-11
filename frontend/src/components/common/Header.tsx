import React from 'react';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Hamburger from '../common/Hamburger';
import LogoImg from '@/assets/common/logo.png';
/**
 * @param title
 * @param leftIcon none은 없음, back은 뒤로가기 버튼, turtle은 거북이 아이콘
 */
export interface IProps {
  title?: string;
  back?: boolean;
  right?: JSX.Element;
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
  const navigate = useNavigate();

  return (
    <StyledHeader>
      <div className="backContainer">
        {props.back ? (
          <ChevronLeftOutlinedIcon className="backIcon" onClick={() => navigate(-1)} />
        ) : (
          <Hamburger />
        )}
      </div>
      {props.title ? (
        <h1 className="title">{props.title}</h1>
      ) : (
        <LogoBox onClick={() => navigate('/main')}>
          <Logo src={LogoImg} alt="logo" />
        </LogoBox>
      )}
      <div className="iconContainer">{props.right}</div>
    </StyledHeader>
  );
}

const LogoBox = styled.div`
  flex: 1;
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

  .backContainer {
    flex: 1;
    text-align: start;
    .backIcon {
      color: ${props => props.theme.colors.primary};
      width: 3rem;
      height: 3rem;
    }
  }

  .signatureIcon {
    width: 8.6rem;
    height: 5.4rem;
  }

  .title {
    flex: 1;
    font-weight: bold;
    font-size: 1.8rem;
    color: ${props => props.theme.colors.primary};
    text-align: center;
  }

  .iconContainer {
    flex: 1;
    align-items: center;
    text-align: end;

    .icon {
      color: ${props => props.theme.colors.primary};
      width: 3rem;
      height: 3rem;
    }

    .rightText {
      font-weight: ${props => props.theme.fontWeight.medium};
      font-size: 1.6rem;
      color: ${props => props.theme.colors.turtleDark};
      width: 3rem;
    }
  }

  /* .icon {
    color: ${props => props.theme.colors.primary};
    width: 3rem;
    height: 3rem;
  }
  .rightText {
    font-weight: ${props => props.theme.fontWeight.medium};
    font-size: 1.6rem;
    color: ${props => props.theme.colors.turtleDark};
    width: 3rem;
  } */
`;
