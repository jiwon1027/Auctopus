import React from 'react';
import { ReactComponent as Mooneo } from '@/assets//mooneo.svg';
import styled from 'styled-components';
import Logo from '@/assets/common/logo.png';
export default function Title() {
  return (
    <StyledTitle>
      <div>
        <Mooneo className="signatureIcon" />
      </div>
      <LogoImg src={Logo} alt="logo" />
    </StyledTitle>
  );
}

const StyledTitle = styled.div`
  flex: 1;
  margin-top: 11rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    text-align: center;
    font-size: 5rem;
    color: ${props => props.theme.colors.primary};
  }
  div {
    .signatureIcon {
      box-sizing: border-box;
      display: block;
      width: 100%;
      height: 100%;
    }
  }
`;

const LogoImg = styled.img`
  width: 25rem;
  margin-top: 2rem;
`;
