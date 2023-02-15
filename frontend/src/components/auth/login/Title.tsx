import React from "react";
import styled, { keyframes } from "styled-components";
import Logo from "@/assets/common/logo.png";
import Mooneo1 from "@/assets/mooneo/1.png";
import Mooneo2 from "@/assets/mooneo/2.png";
import Mooneo3 from "@/assets/mooneo/3.png";
import Mooneo4 from "@/assets/mooneo/4.png";
import Mooneo5 from "@/assets/mooneo/5.png";
import Mooneo6 from "@/assets/mooneo/6.png";
import Mooneo7 from "@/assets/mooneo/7.png";
import Mooneo8 from "@/assets/mooneo/8.png";
import Mooneo9 from "@/assets/mooneo/9.png";
import Mooneo10 from "@/assets/mooneo/10.png";

export default function Title() {
  const mooneoList = [
    Mooneo1,
    Mooneo2,
    Mooneo3,
    Mooneo4,
    Mooneo5,
    Mooneo6,
    Mooneo7,
    Mooneo8,
    Mooneo9,
    Mooneo10,
  ];

  const idx = Math.floor(Math.random() * mooneoList.length);
  return (
    <StyledTitle>
      <Mooneo
        src={mooneoList[idx]}
        alt="mooneo img"
        className="signatureIcon"
      />
      <LogoImg src={Logo} alt="logo" />
    </StyledTitle>
  );
}

const floating = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
  100% {
    transform: translateY(0);
  }
`;
const Mooneo = styled.img`
  width: 30rem;
  animation: ${floating} 2s 1s infinite linear alternate;
`;
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
    color: ${(props) => props.theme.colors.primary};
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
