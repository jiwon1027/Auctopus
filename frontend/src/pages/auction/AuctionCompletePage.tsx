import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import backgroundImg from "@/assets/auction/background.png";
import bg from "@/assets/common/water2.jpg";
import Turtle from "@/assets/auction/turtle-removebg.png";
import Mooneo from "@/assets/auction/mooneo-removebg.png";
import Mulbeom from "@/assets/auction/mulbeom-removebg.png";
import Sudal from "@/assets/auction/sudal-removebg.png";
import { theme } from "@/styles/theme";
import { useNavigate } from "react-router-dom";
// import { keyframes } from "@emotion/react";

const animalList = [
  {
    img: Turtle,
    name: "바다 거북이를",
  },
  {
    img: Mooneo,
    name: "무너를",
  },
  {
    img: Mulbeom,
    name: "물범을",
  },
  {
    img: Sudal,
    name: "수달을",
  },
];
const idx = Math.floor(Math.random() * animalList.length);
export default function AuctionCompeletePage() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/main", { replace: true });
    }, 3000);
  }, []);

  return (
    <Container>
      <CuteAnimals src={animalList[idx].img} alt="cuties" />
      <Content>
        <Text> 당신 덕분에</Text>
        <Text className="center">
          <span className="number">두</span> 마리의
        </Text>
        <Text> {animalList[idx].name} </Text>
        <Text className="right">구했어요!</Text>
      </Content>
    </Container>
  );
}

const rotate = keyframes` /* 2. css코드를 씀. */
  0%{
    transform: rotate(-20deg);
    border-radius: 0px;
  }
  50%{ 
    border-radius: 100px;
  }
  100%{
    transform: rotate(30deg);
    border-radius: 0px;
  }
`;
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
const Container = styled.div`
  background-image: url(${backgroundImg});
  width: 100%;
  height: 120%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  animation: ${floating} 2s 1s infinite linear alternate;
`;

const CuteAnimals = styled.img`
  width: 25rem;
  animation: ${rotate} 2s 1s infinite linear alternate;
`;
const Content = styled.div`
  font-family: "twayair";
  font-size: 3.6rem;
  /* font-weight: ${theme.fontWeight.bold}; */
  color: ${theme.colors.primary};
  /* color: purple; */
  .number {
    font-size: 5rem;
    color: ${theme.colors.turtleStandard};
    /* color: ${theme.colors.turtleLight}; */
  }
  br {
    margin-top: 2rem;
  }
  animation: ${floating} 2s 1s infinite linear alternate;
  .right {
    text-align: right;
  }
  .center {
    text-align: center;
  }
`;

const Text = styled.div`
  margin-top: 1rem;
  width: 100%;
`;
